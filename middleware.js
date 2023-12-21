import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware (req) {
    if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1 || req.nextUrl.pathname.indexOf('img') > -1) return NextResponse.next()
    languages.map((lng) => {
        if (req.nextUrl.pathname.startsWith(lng)) {
            return NextResponse.next();
        }
    });

    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng

    // Redirect if lng in path is not supported
    if (
        !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        const targetUrl = new URL(`/${lng}${req.nextUrl.pathname}`, req.url);
        // 获取当前请求的 URL 对象
        const url = req.nextUrl;
        console.log("url", url)
        const queryParams = url.searchParams;
        queryParams.forEach((value, key) => {
            targetUrl.searchParams.append(key, value);
        });
        return NextResponse.redirect(targetUrl)
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer'))
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
        return response
    }

    return NextResponse.next()
}