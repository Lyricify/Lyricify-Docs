import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, 'src', 'content', 'docs');
const generatedLocale = 'en';
const generatedRoot = path.join(docsRoot, generatedLocale);
const cacheRoot = path.join(repoRoot, '.cache', 'ci-translations');
const cacheFilesRoot = path.join(cacheRoot, 'files');
const manifestPath = path.join(cacheRoot, 'manifest.json');

const markdownExtensions = new Set(['.md', '.mdx']);
const promptVersion = '2026-03-17-v1';
const model = process.env.TRANSLATION_MODEL;
const apiBaseUrl = (process.env.TRANSLATION_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const apiKey = process.env.TRANSLATION_API_KEY;

const translationInstructions = [
	'You translate Simplified Chinese Astro/Starlight documentation into English for CI builds.',
	'Output must be a complete translated file body in the same format as the source file.',
	'Preserve markdown structure, frontmatter keys, admonition syntax, code fences, tables, HTML tags, JSX, imports, exports, identifiers, URLs, anchors, and relative paths.',
	'Translate human-readable Chinese text into concise natural English.',
	'Do not add commentary, notes, or code fences outside the required output markers.',
	'Do not translate file paths, import paths, image paths, URLs, slug-like strings, or code identifiers.',
	'Keep formatting stable so repeated runs produce minimal diffs.',
].join(' ');

async function pathExists(targetPath) {
	try {
		await fs.access(targetPath);
		return true;
	} catch {
		return false;
	}
}

async function ensureDir(targetPath) {
	await fs.mkdir(targetPath, { recursive: true });
}

async function readJson(targetPath, fallbackValue) {
	try {
		const content = await fs.readFile(targetPath, 'utf8');
		return JSON.parse(content);
	} catch {
		return fallbackValue;
	}
}

function toPosixPath(relativePath) {
	return relativePath.split(path.sep).join(path.posix.sep);
}

function sha256(value) {
	return createHash('sha256').update(value).digest('hex');
}

function buildSourceHash(content) {
	return sha256(`${promptVersion}\n${model}\n${content}`);
}

async function* walkSourceFiles(currentDir = docsRoot) {
	const entries = await fs.readdir(currentDir, { withFileTypes: true });
	for (const entry of entries) {
		if (currentDir === docsRoot && entry.name === generatedLocale) continue;
		const fullPath = path.join(currentDir, entry.name);
		if (entry.isDirectory()) {
			yield* walkSourceFiles(fullPath);
			continue;
		}
		if (!entry.isFile()) continue;
		yield fullPath;
	}
}

function extractTextPayload(responseJson) {
	const content = responseJson?.choices?.[0]?.message?.content;
	if (typeof content === 'string') return content.trim();
	if (Array.isArray(content)) {
		return content
			.filter((item) => item?.type === 'text' && typeof item.text === 'string')
			.map((item) => item.text)
			.join('\n')
			.trim();
	}
	return '';
}

function normalizeTranslatedContent(content, sourceContent) {
	let normalized = content.trim();
	if (normalized.startsWith('```') && normalized.endsWith('```')) {
		normalized = normalized.replace(/^```[a-zA-Z0-9_-]*\n?/, '').replace(/\n?```$/, '');
	}
	if (sourceContent.endsWith('\n') && !normalized.endsWith('\n')) {
		normalized += '\n';
	}
	return normalized;
}

function stripCodeFence(content) {
	const trimmed = content.trim();
	if (!trimmed.startsWith('```') || !trimmed.endsWith('```')) return trimmed;
	return trimmed.replace(/^```[a-zA-Z0-9_-]*\n?/, '').replace(/\n?```$/, '').trim();
}

function extractMarkedContent(content) {
	const startMarker = '<<<TRANSLATED_CONTENT';
	const endMarker = '>>>END_TRANSLATED_CONTENT';
	const startIndex = content.indexOf(startMarker);
	if (startIndex === -1) return '';
	const afterStart = content.indexOf('\n', startIndex);
	if (afterStart === -1) return '';
	const endIndex = content.indexOf(endMarker, afterStart + 1);
	if (endIndex === -1) return '';
	return content.slice(afterStart + 1, endIndex).trim();
}

function parseTranslatedJson(textPayload) {
	const cleanedPayload = stripCodeFence(textPayload);
	const candidates = [cleanedPayload];
	const objectStart = cleanedPayload.indexOf('{');
	const objectEnd = cleanedPayload.lastIndexOf('}');
	if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
		candidates.push(cleanedPayload.slice(objectStart, objectEnd + 1));
	}

	for (const candidate of candidates) {
		try {
			const parsed = JSON.parse(candidate);
			if (typeof parsed?.translated_content === 'string' && parsed.translated_content.trim()) {
				return parsed.translated_content;
			}
		} catch {}
	}

	return '';
}

function extractTranslatedContent(textPayload) {
	const markedContent = extractMarkedContent(textPayload);
	if (markedContent) return markedContent;

	const jsonContent = parseTranslatedJson(textPayload);
	if (jsonContent) return jsonContent;

	throw new Error(
		[
			'Invalid translation payload. Expected marked content or JSON object with "translated_content".',
			'Received payload preview:',
			textPayload.slice(0, 1000),
		].join('\n')
	);
}

function markAsAutoTranslated(content) {
	const normalized = content.replace(/^\uFEFF/, '');
	const frontmatterMatch = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
	if (frontmatterMatch) {
		const [, frontmatter, separator] = frontmatterMatch;
		const body = normalized.slice(frontmatterMatch[0].length);
		const newline = separator.includes('\r\n') || normalized.includes('\r\n') ? '\r\n' : '\n';
		const nextFrontmatter = /^autoTranslated:/m.test(frontmatter)
			? frontmatter.replace(/^autoTranslated:.*$/m, 'autoTranslated: true')
			: `${frontmatter}${newline}autoTranslated: true`;
		return `---${newline}${nextFrontmatter}${newline}---${newline}${body}`;
	}
	return `---\nautoTranslated: true\n---\n\n${normalized}`;
}

async function translateFile(relativePath, sourceContent) {
	const requestBody = {
		model,
		messages: [
			{
				role: 'system',
				content: translationInstructions,
			},
			{
				role: 'user',
				content: [
					'Translate this source file from Simplified Chinese to English.',
					`Source file: ${relativePath}`,
					'Return the translated file content between these exact markers:',
					'<<<TRANSLATED_CONTENT',
					'... translated file content here ...',
					'>>>END_TRANSLATED_CONTENT',
					'Do not output JSON unless you cannot follow the marker format.',
					'Do not wrap the response in Markdown code fences.',
					'Source content starts after the marker below.',
					'<<<SOURCE_FILE',
					sourceContent,
				].join('\n'),
			},
		],
		temperature: 0.2,
	};

	let lastError;
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		try {
			const response = await fetch(`${apiBaseUrl}/chat/completions`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error(`Translation API returned ${response.status}: ${await response.text()}`);
			}

			const responseJson = await response.json();
			const textPayload = extractTextPayload(responseJson);
			if (!textPayload) {
				throw new Error(`Empty translation response for ${relativePath}`);
			}

			return normalizeTranslatedContent(
				extractTranslatedContent(textPayload),
				sourceContent
			);
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError;
}

async function writeFileEnsured(targetPath, content) {
	await ensureDir(path.dirname(targetPath));
	await fs.writeFile(targetPath, content, 'utf8');
}

async function copyFileEnsured(sourcePath, targetPath) {
	await ensureDir(path.dirname(targetPath));
	await fs.copyFile(sourcePath, targetPath);
}

async function main() {
	await ensureDir(cacheFilesRoot);

	const cachedManifest = await readJson(manifestPath, {
		version: 1,
		promptVersion,
		model,
		entries: {},
	});

	await fs.rm(generatedRoot, { recursive: true, force: true });
	await ensureDir(generatedRoot);

	const markdownFiles = [];
	const assetFiles = [];

	for await (const sourcePath of walkSourceFiles()) {
		const relativePath = toPosixPath(path.relative(docsRoot, sourcePath));
		const extension = path.extname(sourcePath).toLowerCase();
		if (markdownExtensions.has(extension)) {
			markdownFiles.push(relativePath);
		} else {
			assetFiles.push(relativePath);
		}
	}

	for (const relativePath of assetFiles) {
		const sourcePath = path.join(docsRoot, relativePath);
		const targetPath = path.join(generatedRoot, relativePath);
		await copyFileEnsured(sourcePath, targetPath);
	}

	const nextManifest = {
		version: 1,
		promptVersion,
		model,
		updatedAt: new Date().toISOString(),
		entries: {},
	};

	const pendingTranslations = [];
	let restoredCount = 0;

	for (const relativePath of markdownFiles.sort()) {
		const sourcePath = path.join(docsRoot, relativePath);
		const targetPath = path.join(generatedRoot, relativePath);
		const cachePath = path.join(cacheFilesRoot, relativePath);
		const sourceContent = await fs.readFile(sourcePath, 'utf8');
		const sourceHash = buildSourceHash(sourceContent);
		const cachedEntry = cachedManifest.entries?.[relativePath];

		nextManifest.entries[relativePath] = {
			sourceHash,
			targetPath: toPosixPath(path.relative(repoRoot, targetPath)),
			cachePath: toPosixPath(path.relative(repoRoot, cachePath)),
			updatedAt: cachedEntry?.updatedAt || nextManifest.updatedAt,
		};

		if (cachedEntry?.sourceHash === sourceHash && (await pathExists(cachePath))) {
			await copyFileEnsured(cachePath, targetPath);
			restoredCount += 1;
			continue;
		}

		pendingTranslations.push({
			relativePath,
			sourceContent,
			targetPath,
			cachePath,
		});
	}

	if (pendingTranslations.length > 0 && !apiKey) {
		throw new Error(
			[
				`Missing TRANSLATION_API_KEY. ${pendingTranslations.length} file(s) need translation:`,
				...pendingTranslations.map((item) => `- ${item.relativePath}`),
			].join('\n')
		);
	}

	if (!model) {
		throw new Error('Missing TRANSLATION_MODEL.');
	}

	let translatedCount = 0;
	for (const item of pendingTranslations) {
		const translatedContent = markAsAutoTranslated(
			await translateFile(item.relativePath, item.sourceContent)
		);
		await writeFileEnsured(item.cachePath, translatedContent);
		await writeFileEnsured(item.targetPath, translatedContent);
		nextManifest.entries[item.relativePath].updatedAt = new Date().toISOString();
		translatedCount += 1;
		console.log(`Translated ${item.relativePath}`);
	}

	await writeFileEnsured(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);

	const summary = {
		source_docs: markdownFiles.length,
		mirrored_assets: assetFiles.length,
		restored_from_cache: restoredCount,
		translated: translatedCount,
		cache_dir: toPosixPath(path.relative(repoRoot, cacheRoot)),
		model,
		prompt_version: promptVersion,
	};

	console.log('Translation summary:', JSON.stringify(summary));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
