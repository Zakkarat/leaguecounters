export const CHANGE_LANG = "CHANGE_LANG"

export const changeLang = (language) => ({
    type: CHANGE_LANG,
    payload: { language }
})
