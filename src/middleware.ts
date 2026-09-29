import { defineMiddleware } from 'astro:middleware';

const fusionPath = /^\/(?:en\/|zh-hant\/)?lyricify-fusion(?:\/|$)/;

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
	const { pathname } = url;
	if (fusionPath.test(pathname) && !pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)) {
		return redirect(`${pathname}/`, 302);
	}

	return next();
});
