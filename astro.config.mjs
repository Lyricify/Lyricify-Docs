// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const legacyGuidePages = [
	'',
	'getting-started',
	'supported-apps',
	'terms',
	'faq/version-info',
	'faq/cannot-detect-player',
	'faq/smtc-unavailable',
	'faq/apple-music-performance',
	'faq/store-shortcut',
	'faq/desktop-lyrics-disappear',
	'faq/desktop-lyrics-font-size',
	'faq/obs-capture',
	'faq/custom-fonts',
	'faq/auto-update',
	'faq/config-migration',
	'app-faq/spotify',
	'app-faq/apple-music',
	'app-faq/qq-music',
	'app-faq/netease-cloud-music',
	'app-faq/kugou-music',
	'app-faq/potplayer',
];
const legacyGuideRedirects = Object.fromEntries(
	['', '/en', '/zh-hant'].flatMap((locale) =>
		legacyGuidePages.map((page) => {
			const suffix = page ? `/${page}` : '';
			return [
				`${locale}/lyricify-lite${suffix}`,
				`${locale}/lyricify-fusion${suffix}/`,
			];
		}),
	),
);

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.lyricify.app',
	redirects: legacyGuideRedirects,
	integrations: [
		starlight({
			title: {
				'zh-CN': 'Lyricify Docs',
				'zh-Hant': 'Lyricify Docs',
				en: 'Lyricify Docs',
			},
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
				'zh-hant': {
					label: '繁體中文',
					lang: 'zh-Hant',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			defaultLocale: 'root',
			logo: {
				src: './src/assets/Lyricify-icon.png',
				alt: 'Lyricify Icon',
			},
			favicon: '/favicon.ico',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/WXRIW/Lyricify-App' }],
			editLink: {
				baseUrl: 'https://github.com/Lyricify/Lyricify-Docs/edit/main/',
			},
			tableOfContents: false,
			customCss: ['./src/styles/starlight.css'],
			components: {
				Header: './src/components/LyricifyHeader.astro',
				Sidebar: './src/components/LyricifySidebar.astro',
				Footer: './src/components/LyricifyDocsFooter.astro',
				PageTitle: './src/components/LyricifyPageTitle.astro',
				FallbackContentNotice: './src/components/EmptyFallbackContentNotice.astro',
			},
			sidebar: [
				{
					label: 'Lyricify 4',
					items: [
						{
							label: '总览',
							translations: {
								'zh-hant': '總覽',
								en: 'Overview',
							},
							slug: 'lyricify-4',
						},
						'lyricify-4/getting-started',
						'lyricify-4/lyrics-and-track-management',
						'lyricify-4/custom-api-client',
						{
							label: '设置与个性化',
							translations: {
								'zh-hant': '設定與個人化',
								en: 'Settings & Personalization',
							},
							items: [
								'lyricify-4/settings/global-shortcuts',
								'lyricify-4/settings/fonts',
								'lyricify-4/settings/custom-themes',
								'lyricify-4/settings/i18n',
								'lyricify-4/settings/custom-configs',
							],
						},
						{
							label: '工具与功能',
							translations: {
								'zh-hant': '工具與功能',
								en: 'Tools & Features',
							},
							items: [
								'lyricify-4/tools/availability-check',
								'lyricify-4/tools/local-files',
								'lyricify-4/tools/built-in-playback',
								'lyricify-4/tools/backup-and-automation-center',
								'lyricify-4/tools/settings-file',
								'lyricify-4/tools/auto-start',
								'lyricify-4/tools/store-shortcut',
							],
						},
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-4/faq/version-info',
								'lyricify-4/faq/play-button-no-response',
								'lyricify-4/faq/no-lyrics-from-server',
								'lyricify-4/faq/auth-no-response',
								'lyricify-4/faq/startup-error',
								'lyricify-4/faq/non-premium-custom-client',
								'lyricify-4/faq/startup-message-box',
								'lyricify-4/faq/cannot-upload-lyrics',
								'lyricify-4/faq/account-restricted',
								'lyricify-4/faq/open-spotify-missing',
								'lyricify-4/faq/desktop-lyrics-disappear',
								'lyricify-4/faq/desktop-font-size',
								'lyricify-4/faq/obs-capture',
								'lyricify-4/faq/buggy-apple',
								'lyricify-4/faq/song-switch-lag',
								'lyricify-4/faq/error-429',
								'lyricify-4/faq/no-playback-info',
								'lyricify-4/faq/media-session-not-connected',
								'lyricify-4/faq/no-album-art',
								'lyricify-4/faq/stutter-on-track-change',
								'lyricify-4/faq/no-lyrics-on-other-views',
								'lyricify-4/faq/auto-update',
								'lyricify-4/faq/config-migration',
								'lyricify-4/faq/inaccurate-timeline',
								'lyricify-4/faq/apple-music-performance',
							],
						},
						{
							label: '已知问题',
							translations: {
								'zh-hant': '已知問題',
								en: 'Known Issues',
							},
							items: [
								'lyricify-4/known-issues/apple-music-performance',
								'lyricify-4/known-issues/render-thread-crash',
							],
						},
						{
							label: '特殊问题',
							translations: {
								'zh-hant': '特殊問題',
								en: 'Special Cases',
							},
							items: [
								'lyricify-4/special-issues/mobile-auth',
								'lyricify-4/special-issues/support-other-apps',
								'lyricify-4/special-issues/server-blocked',
							],
						},
						'lyricify-4/terms',
						'lyricify-4/account',
					],
				},
				{
					label: 'Lyricify Fusion',
					items: [
						{
							label: '总览',
							translations: {
								'zh-hant': '總覽',
								en: 'Overview',
							},
							slug: 'lyricify-fusion',
						},
						'lyricify-fusion/rename',
						'lyricify-fusion/getting-started',
						'lyricify-fusion/supported-apps',
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-fusion/faq/version-info',
								'lyricify-fusion/faq/cannot-detect-player',
								'lyricify-fusion/faq/smtc-unavailable',
								'lyricify-fusion/faq/apple-music-performance',
								'lyricify-fusion/faq/store-shortcut',
								'lyricify-fusion/faq/desktop-lyrics-disappear',
								'lyricify-fusion/faq/desktop-lyrics-font-size',
								'lyricify-fusion/faq/obs-capture',
								'lyricify-fusion/faq/custom-fonts',
								'lyricify-fusion/faq/auto-update',
								'lyricify-fusion/faq/config-migration',
							],
						},
						{
							label: '常见问题（逐应用）',
							translations: {
								'zh-hant': '常見問題（逐應用）',
								en: 'FAQ (by App)',
							},
							items: [
								'lyricify-fusion/app-faq/spotify',
								'lyricify-fusion/app-faq/apple-music',
								'lyricify-fusion/app-faq/qq-music',
								'lyricify-fusion/app-faq/netease-cloud-music',
								'lyricify-fusion/app-faq/kugou-music',
								'lyricify-fusion/app-faq/potplayer',
							],
						},
						'lyricify-fusion/terms',
					],
				},
				{
					label: 'Lyricify Mobile',
					items: [
						{
							label: '总览',
							translations: {
								'zh-hant': '總覽',
								en: 'Overview',
							},
							slug: 'lyricify-mobile',
						},
						'lyricify-mobile/installation',
						'lyricify-mobile/ios-ipa-guide',
						'lyricify-mobile/custom-api-client',
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-mobile/faq/slow-track-switch',
								'lyricify-mobile/faq/error-429',
								'lyricify-mobile/faq/no-playback-info',
								'lyricify-mobile/faq/import-lyrics',
								'lyricify-mobile/faq/no-lyrics-found',
								'lyricify-mobile/faq/lyrics-mismatch-between-devices',
								'lyricify-mobile/faq/no-translation',
								'lyricify-mobile/faq/inaccurate-timeline',
								'lyricify-mobile/faq/ios-app-store',
								'lyricify-mobile/faq/other-issues',
							],
						},
					],
				},
				{
					label: '歌词格式与制作',
					translations: {
						'zh-hant': '歌詞格式與製作',
						en: 'Lyrics Formats & Authoring',
					},
					items: ['lyrics/guide'],
				},
			],
		}),
	],
});
