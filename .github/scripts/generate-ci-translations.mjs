import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, 'src', 'content', 'docs');
const cacheRoot = path.join(repoRoot, '.cache', 'ci-translations');
const cacheFilesRoot = path.join(cacheRoot, 'files');
const manifestPath = path.join(cacheRoot, 'manifest.json');

const markdownExtensions = new Set(['.md', '.mdx']);
const promptVersion = '2026-03-18-v7';
const model = process.env.TRANSLATION_MODEL;
const apiBaseUrl = (process.env.TRANSLATION_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const apiKey = process.env.TRANSLATION_API_KEY;

const commonTranslationInstructions = [
	'Output must be a complete translated file body in the same format as the source file.',
	'Preserve markdown structure, frontmatter keys, admonition syntax, code fences, tables, HTML tags, JSX, imports, exports, identifiers, URLs, anchors, and relative paths.',
	'Do not add commentary, notes, or code fences outside the required output markers.',
	'Do not translate file paths, import paths, image paths, URLs, slug-like strings, or code identifiers.',
	'Keep formatting stable so repeated runs produce minimal diffs.',
];

const localeConfigs = [
	createLocaleConfig({
		key: 'en',
		languageName: 'English',
		additionalInstructions: [
			'You translate Simplified Chinese Astro/Starlight documentation into concise natural English for CI builds.',
			'When translating the common noun “歌词”, prefer “lyrics” instead of singular “lyric” in UI labels, headings, and feature names unless the source clearly refers to one lyric line or one lyric file.',
		],
		terminologyGlossary: [
			'Use the following canonical translations and casing for Lyricify-specific terms whenever they appear in the Simplified Chinese source:',
			'Lyricify => Lyricify',
			'Lyricify 4 => Lyricify 4',
			'Lyricify Lite => Lyricify Lite',
			'Lyricify Mobile => Lyricify Mobile',
			'桌面歌词 => Desktop Lyrics',
			'灵动词岛 => Dynamic Lyrics Island',
			'任务栏歌词 => Taskbar Lyrics',
			'Apple Music 歌词 => Apple Music Lyrics',
			'妙控条 => Magic Strip',
			'对唱视图 => Duet View',
			'背景人声 => Background Vocals',
			'多行高亮 => Multi-line Highlight',
			'呼吸点 => Breathing Dots',
			'拖动效果 => Pulling effect',
			'单词发光效果 => Word shining effect',
			'Lyricify 全屏 => Lyricify Fullscreen',
			'曲目管理 => Track Management',
			'歌词标记 => Lyrics Marking',
			'Apple Music 时间轴稳定器 => Apple Music Timeline Stabilizer',
			'汽水音乐 => Soda Music',
			'中国大陆 => Chinese Mainland',
		],
	}),
	createLocaleConfig({
		key: 'zh-hant',
		languageName: 'Traditional Chinese',
		additionalInstructions: [
			'You convert Simplified Chinese Astro/Starlight documentation into natural Traditional Chinese for CI builds.',
			'Use Traditional Chinese characters throughout the translated text.',
			'Prefer official Lyricify Traditional Chinese UI terminology when the source contains product-specific terms.',
		],
		terminologyGlossary: [
			'Use the following canonical Traditional Chinese terms and casing for Lyricify-specific terms whenever they appear in the Simplified Chinese source:',
			'Lyricify => Lyricify',
			'Lyricify Docs => Lyricify Docs',
			'Lyricify 4 => Lyricify 4',
			'Lyricify Lite => Lyricify Lite',
			'Lyricify Mobile => Lyricify Mobile',
			'桌面歌词 => 桌面歌詞',
			'灵动词岛 => 靈動詞島',
			'任务栏歌词 => 工作列歌詞',
			'Apple Music 歌词 => Apple Music 歌詞',
			'妙控条 => 妙控條',
			'对唱视图 => 同框對唱',
			'背景人声 => 背景人聲',
			'呼吸点 => 呼吸點',
			'拖动效果 => 拖動效果',
			'单词发光效果 => 單字發光效果',
			'Lyricify 全屏 => Lyricify 全螢幕',
		],
	}),
];

const generatedLocaleKeys = new Set(localeConfigs.map(({ key }) => key));

function createLocaleConfig({ key, languageName, additionalInstructions, terminologyGlossary }) {
	return {
		key,
		languageName,
		root: path.join(docsRoot, key),
		translationInstructions: [...commonTranslationInstructions, ...additionalInstructions, terminologyGlossary.join(' ')].join(' '),
	};
}

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

function buildSourceHash(localeConfig, content) {
	return sha256(`${promptVersion}\n${localeConfig.key}\n${model}\n${localeConfig.translationInstructions}\n${content}`);
}

function replaceExtension(relativePath, nextExtension) {
	return relativePath.replace(/\.[^./]+$/, nextExtension);
}

function escapeRegex(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function findExistingLocalizedDocPath(localeConfig, relativePath) {
	const preferredPath = path.join(localeConfig.root, relativePath);
	if (await pathExists(preferredPath)) return preferredPath;

	for (const extension of markdownExtensions) {
		const candidatePath = path.join(localeConfig.root, replaceExtension(relativePath, extension));
		if (candidatePath === preferredPath) continue;
		if (await pathExists(candidatePath)) return candidatePath;
	}

	return null;
}

async function* walkSourceFiles(currentDir = docsRoot) {
	const entries = await fs.readdir(currentDir, { withFileTypes: true });
	for (const entry of entries) {
		if (currentDir === docsRoot && generatedLocaleKeys.has(entry.name)) continue;
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

function splitFrontmatter(content) {
	const normalized = content.replace(/^\uFEFF/, '');
	const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
	if (!match) {
		return {
			frontmatter: null,
			body: normalized,
			newline: normalized.includes('\r\n') ? '\r\n' : '\n',
		};
	}

	return {
		frontmatter: match[1],
		body: normalized.slice(match[0].length),
		newline: match[2].includes('\r\n') || normalized.includes('\r\n') ? '\r\n' : '\n',
	};
}

function parseFrontmatterObject(frontmatter) {
	if (!frontmatter) return {};
	const parsed = yaml.load(frontmatter);
	if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
		return parsed;
	}
	return {};
}

function parseLooseFrontmatterValue(rawValue) {
	const value = rawValue.trim();
	if (!value) return '';

	try {
		return yaml.load(value);
	} catch {
		return value;
	}
}

function parseLooseFrontmatterObject(frontmatter) {
	const result = {};

	for (const line of frontmatter.split(/\r?\n/)) {
		if (!line || /^\s/.test(line) || line.trimStart().startsWith('#')) continue;
		const match = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
		if (!match) continue;
		const [, key, rawValue] = match;
		if (!rawValue.trim()) continue;
		result[key] = parseLooseFrontmatterValue(rawValue);
	}

	return result;
}

function dumpFrontmatter(frontmatterObject, newline) {
	const dumped = yaml
		.dump(frontmatterObject, {
			lineWidth: -1,
			noRefs: true,
			quotingType: '"',
		})
		.trimEnd();
	return `---${newline}${dumped}${newline}---${newline}`;
}

function mergeTranslatedFrontmatter(sourceContent, translatedContent) {
	const sourceParts = splitFrontmatter(sourceContent);
	const translatedParts = splitFrontmatter(translatedContent);

	const sourceFrontmatter = parseFrontmatterObject(sourceParts.frontmatter);
	let mergedFrontmatter = { ...sourceFrontmatter };

	if (translatedParts.frontmatter) {
		try {
			mergedFrontmatter = {
				...sourceFrontmatter,
				...parseFrontmatterObject(translatedParts.frontmatter),
			};
		} catch {
			const salvagedFrontmatter = parseLooseFrontmatterObject(translatedParts.frontmatter);
			if (Object.keys(salvagedFrontmatter).length > 0) {
				mergedFrontmatter = {
					...sourceFrontmatter,
					...salvagedFrontmatter,
				};
			} else {
				console.warn(`Using source frontmatter for invalid translated frontmatter in ${sourceFrontmatter.title ?? 'unknown page'}.`);
			}
		}
	}

	mergedFrontmatter.autoTranslated = true;

	return `${dumpFrontmatter(mergedFrontmatter, sourceParts.newline)}${translatedParts.body}`;
}

function extractLeadingModuleStatements(content) {
	const { body } = splitFrontmatter(content);
	const match = body.match(/^((?:\s*(?:import|export)\s+.*(?:\r?\n|$))+)/);
	return {
		block: match?.[1] ?? '',
		statements: match?.[1].match(/^\s*(?:import|export)\s+.*$/gm) ?? [],
		bodyWithoutBlock: match ? body.slice(match[1].length) : body,
	};
}

function extractImportBindings(statement) {
	const match = statement.trim().match(/^import\s+(.+?)\s+from\s+['"][^'"]+['"]\s*;?$/);
	if (!match) return [];

	const bindings = [];
	let clause = match[1].trim();

	if (!clause.startsWith('{') && !clause.startsWith('*')) {
		const defaultImportMatch = clause.match(/^([A-Za-z_$][\w$]*)(?:\s*,\s*([\s\S]+))?$/);
		if (defaultImportMatch) {
			bindings.push(defaultImportMatch[1]);
			clause = defaultImportMatch[2]?.trim() ?? '';
		}
	}

	if (!clause) return bindings;

	if (clause.startsWith('{') && clause.endsWith('}')) {
		for (const part of clause.slice(1, -1).split(',')) {
			const trimmedPart = part.trim();
			if (!trimmedPart) continue;
			const aliasMatch = trimmedPart.match(/\bas\s+([A-Za-z_$][\w$]*)$/);
			bindings.push(aliasMatch ? aliasMatch[1] : trimmedPart);
		}
		return bindings;
	}

	const namespaceMatch = clause.match(/^\*\s+as\s+([A-Za-z_$][\w$]*)$/);
	if (namespaceMatch) {
		bindings.push(namespaceMatch[1]);
	}

	return bindings;
}

function restoreMdxModuleStatements(relativePath, sourceContent, translatedContent) {
	if (path.extname(relativePath).toLowerCase() !== '.mdx') return translatedContent;

	const translatedParts = splitFrontmatter(translatedContent);
	const sourceModuleBlock = extractLeadingModuleStatements(sourceContent);
	const translatedModuleBlock = extractLeadingModuleStatements(translatedContent);

	if (!sourceModuleBlock.block) return translatedContent;

	let nextBodyWithoutBlock = translatedModuleBlock.bodyWithoutBlock;
	const statementCount = Math.min(sourceModuleBlock.statements.length, translatedModuleBlock.statements.length);

	for (let index = 0; index < statementCount; index += 1) {
		const sourceBindings = extractImportBindings(sourceModuleBlock.statements[index]);
		const translatedBindings = extractImportBindings(translatedModuleBlock.statements[index]);
		if (sourceBindings.length === 0 || sourceBindings.length !== translatedBindings.length) continue;

		for (let bindingIndex = 0; bindingIndex < sourceBindings.length; bindingIndex += 1) {
			const sourceBinding = sourceBindings[bindingIndex];
			const translatedBinding = translatedBindings[bindingIndex];
			if (sourceBinding === translatedBinding) continue;

			nextBodyWithoutBlock = nextBodyWithoutBlock.replace(
				new RegExp(`(?<![\\w$])${escapeRegex(translatedBinding)}(?![\\w$])`, 'g'),
				sourceBinding
			);
		}
	}

	const restoredBody = `${sourceModuleBlock.block}${nextBodyWithoutBlock}`;
	return `${dumpFrontmatter(parseFrontmatterObject(translatedParts.frontmatter), translatedParts.newline)}${restoredBody}`;
}

function rewriteRelativeModuleSpecifiers(relativePath, content) {
	if (path.extname(relativePath).toLowerCase() !== '.mdx') return content;

	return content.replace(
		/^(\s*(?:import|export)\s+(?:.+?\s+from\s+)?['"])(\.\.\/[^'"]+)(['"];?\s*)$/gm,
		(_, before, specifier, after) => `${before}../${specifier}${after}`
	);
}

async function translateFile(localeConfig, relativePath, sourceContent) {
	const requestBody = {
		model,
		messages: [
			{
				role: 'system',
				content: localeConfig.translationInstructions,
			},
			{
				role: 'user',
				content: [
					`Translate this source file from Simplified Chinese to ${localeConfig.languageName}.`,
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
				throw new Error(`Empty translation response for ${localeConfig.key}/${relativePath}`);
			}

			return normalizeTranslatedContent(extractTranslatedContent(textPayload), sourceContent);
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

	for (const localeConfig of localeConfigs) {
		await ensureDir(localeConfig.root);
		await ensureDir(path.join(cacheFilesRoot, localeConfig.key));
	}

	const markdownFiles = [];
	const assetFiles = [];
	const sourceContents = new Map();

	for await (const sourcePath of walkSourceFiles()) {
		const relativePath = toPosixPath(path.relative(docsRoot, sourcePath));
		const extension = path.extname(sourcePath).toLowerCase();
		if (markdownExtensions.has(extension)) {
			markdownFiles.push(relativePath);
			sourceContents.set(relativePath, await fs.readFile(sourcePath, 'utf8'));
		} else {
			assetFiles.push(relativePath);
		}
	}

	const nextManifest = {
		version: 1,
		promptVersion,
		model,
		updatedAt: new Date().toISOString(),
		entries: {},
	};

	const summary = {
		source_docs: markdownFiles.length,
		mirrored_assets: assetFiles.length,
		cache_dir: toPosixPath(path.relative(repoRoot, cacheRoot)),
		model,
		prompt_version: promptVersion,
		locales: {},
	};

	const pendingTranslations = [];

	for (const localeConfig of localeConfigs) {
		const localeSummary = {
			preserved_assets: 0,
			preserved_existing_docs: 0,
			restored_from_cache: 0,
			translated: 0,
		};

		for (const relativePath of assetFiles) {
			const sourcePath = path.join(docsRoot, relativePath);
			const targetPath = path.join(localeConfig.root, relativePath);
			if (await pathExists(targetPath)) {
				localeSummary.preserved_assets += 1;
				continue;
			}
			await copyFileEnsured(sourcePath, targetPath);
		}

		for (const relativePath of markdownFiles.sort()) {
			const existingLocalizedDocPath = await findExistingLocalizedDocPath(localeConfig, relativePath);
			if (existingLocalizedDocPath) {
				localeSummary.preserved_existing_docs += 1;
				continue;
			}

			const sourceContent = sourceContents.get(relativePath);
			const sourceHash = buildSourceHash(localeConfig, sourceContent);
			const targetPath = path.join(localeConfig.root, relativePath);
			const cachePath = path.join(cacheFilesRoot, localeConfig.key, relativePath);
			const manifestKey = toPosixPath(path.posix.join(localeConfig.key, relativePath));
			const cachedEntry = cachedManifest.entries?.[manifestKey];

			nextManifest.entries[manifestKey] = {
				sourceHash,
				targetPath: toPosixPath(path.relative(repoRoot, targetPath)),
				cachePath: toPosixPath(path.relative(repoRoot, cachePath)),
				updatedAt: cachedEntry?.updatedAt || nextManifest.updatedAt,
			};

			if (cachedEntry?.sourceHash === sourceHash && (await pathExists(cachePath))) {
				await copyFileEnsured(cachePath, targetPath);
				localeSummary.restored_from_cache += 1;
				continue;
			}

			pendingTranslations.push({
				localeConfig,
				relativePath,
				sourceContent,
				targetPath,
				cachePath,
				manifestKey,
			});
		}

		summary.locales[localeConfig.key] = localeSummary;
	}

	if (pendingTranslations.length > 0 && !apiKey) {
		throw new Error(
			[
				`Missing TRANSLATION_API_KEY. ${pendingTranslations.length} file(s) need translation:`,
				...pendingTranslations.map((item) => `- ${item.localeConfig.key}/${item.relativePath}`),
			].join('\n')
		);
	}

	if (!model) {
		throw new Error('Missing TRANSLATION_MODEL.');
	}

	for (const item of pendingTranslations) {
		const translatedContent = rewriteRelativeModuleSpecifiers(
			item.relativePath,
			restoreMdxModuleStatements(
				item.relativePath,
				item.sourceContent,
				mergeTranslatedFrontmatter(
					item.sourceContent,
					await translateFile(item.localeConfig, item.relativePath, item.sourceContent)
				)
			)
		);
		await writeFileEnsured(item.cachePath, translatedContent);
		await writeFileEnsured(item.targetPath, translatedContent);
		nextManifest.entries[item.manifestKey].updatedAt = new Date().toISOString();
		summary.locales[item.localeConfig.key].translated += 1;
		console.log(`Translated ${item.localeConfig.key}/${item.relativePath}`);
	}

	await writeFileEnsured(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);

	console.log('Translation summary:', JSON.stringify(summary));
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
