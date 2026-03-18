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
					label: '下载',
					translations: {
						'zh-hant': '下載',
						en: 'Download',
					},
					slug: 'download',
				},
				{
					label: '选择合适的版本',
					translations: {
						'zh-hant': '選擇合適的版本',
						en: 'Choose the Right Version',
					},
					slug: 'choose-the-right-version',
				},
				{
					label: 'Lyricify 4',
					translations: {
						'zh-hant': 'Lyricify 4',
						en: 'Lyricify 4',
					},
					items: [
						'lyricify-4/guide',
						'lyricify-4/basic',
						'lyricify-4/advanced',
						'lyricify-4/custom-api-client',
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-4/faq',
								'lyricify-4/faq/store-vs-github',
								'lyricify-4/faq/self-contained',
								'lyricify-4/faq/play-button-no-response',
								'lyricify-4/faq/no-lyrics-from-server',
								'lyricify-4/faq/auth-no-response',
								'lyricify-4/faq/startup-error',
								'lyricify-4/faq/startup-message-box',
								'lyricify-4/faq/cannot-upload-lyrics',
								'lyricify-4/faq/account-restricted',
								'lyricify-4/faq/open-spotify-missing',
								'lyricify-4/faq/floating-lyrics-disappear',
								'lyricify-4/faq/desktop-font-size',
								'lyricify-4/faq/obs-capture',
								'lyricify-4/faq/buggy-apple',
								'lyricify-4/faq/song-switch-lag',
								'lyricify-4/faq/error-429',
								'lyricify-4/faq/long-429',
								'lyricify-4/faq/no-current-track',
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
								'lyricify-4/known-issues',
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
								'lyricify-4/special-issues',
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
					translations: {
						'zh-hant': 'Lyricify Lite',
						en: 'Lyricify Lite',
					},
					items: [
						'lyricify-lite/guide',
						'lyricify-lite/basic',
						{
							label: '常见问题',
							translations: {
								'zh-hant': '常見問題',
								en: 'FAQ',
							},
							items: [
								'lyricify-lite/faq',
								'lyricify-lite/faq/store-vs-github',
								'lyricify-lite/faq/self-contained',
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
					translations: {
						'zh-hant': 'Lyricify Mobile',
						en: 'Lyricify Mobile',
					},
					items: [
						'lyricify-mobile/guide',
						'lyricify-mobile/ios-ipa-guide',
						'lyricify-mobile/custom-api-client',
						'lyricify-mobile/troubleshooting',
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
