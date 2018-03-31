const initialState = {
    users_first_name_search: [],
    ravel_tag_search: [],
    ravel_title_search: [],
    ravel_category_search: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_USER_FIRST_NAME':
        console.log('Inside search reducer')
            return {
                ...state,
                users_first_name_search: action.payload
            };
        case 'SEARCH_RAVEL_BY_TAG':
            return {
                ...state,
                ravel_tag_search: action.payload
            }
        case 'SEARCH_RAVEL_BY_TITLE':
            return {
                ...state,
                ravel_title_search: action.payload
            }
        case 'SEARCH_RAVEL_BY_CATEGORY':
            return {
                ...state,
                ravel_category_search: action.payload
            }
        case 'RESET_STATE_SEARCH':
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}
