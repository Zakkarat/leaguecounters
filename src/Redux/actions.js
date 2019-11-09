export const CHANGE_LANG = "CHANGE_LANG"
export const ROLES_FILTERING = "ROLES_FILTERING"
export const SORTING = "SORTING"
export const SEARCH = "SEARCH"

export const changeLang = (language) => ({
    type: CHANGE_LANG,
    payload: { language }
})

export const rolesFiltering = (roles) => ({
    type: ROLES_FILTERING,
    payload: [...roles]
})

export const sorting = (sortType) => ({
    type: SORTING,
    payload: sortType
})

export const search = (searchWord) => ({
    type: SEARCH,
    payload: searchWord
})
