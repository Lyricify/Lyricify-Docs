// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.lyricify.app',
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
			tableOfContents: true,
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
					label: 'Lyricify Lite',
					items: [
						{
							label: '总览',
							translations: {
								'zh-hant': '總覽',
								en: 'Overview',
							},
							slug: 'lyricify-lite',
						},
						'lyricify-lite/getting-started',
						'lyricify-lite/supported-apps',
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-lite/faq/version-info',
								'lyricify-lite/faq/cannot-detect-player',
								'lyricify-lite/faq/store-shortcut',
								'lyricify-lite/faq/desktop-lyrics-disappear',
								'lyricify-lite/faq/desktop-lyrics-font-size',
								'lyricify-lite/faq/obs-capture',
								'lyricify-lite/faq/custom-fonts',
								'lyricify-lite/faq/auto-update',
								'lyricify-lite/faq/config-migration',
							],
						},
						{
							label: '常见问题（逐应用）',
							translations: {
								'zh-hant': '常見問題（逐應用）',
								en: 'FAQ (by App)',
							},
							items: [
								'lyricify-lite/app-faq/spotify',
								'lyricify-lite/app-faq/apple-music',
								'lyricify-lite/app-faq/qq-music',
								'lyricify-lite/app-faq/netease-cloud-music',
								'lyricify-lite/app-faq/kugou-music',
								'lyricify-lite/app-faq/potplayer',
							],
						},
						'lyricify-lite/terms',
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
