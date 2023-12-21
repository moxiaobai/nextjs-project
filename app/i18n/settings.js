export const fallbackLng = 'en'
export const languages = [fallbackLng, 'zh']
export const locales = {
    'en': 'English',
    'zh': '简体中文',
}
export const defaultNS = 'common'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        // preload: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    }
}