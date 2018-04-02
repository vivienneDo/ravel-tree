const initialState = {
    users_first_name_search: [],
    ravel_tag_search: [],
    ravel_title_search: [],
    ravel_category_search: [],
    user_email_name: [],
    passage_explore_search: [],
    on_search_success: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_USER_FIRST_NAME':
            return {
                ...state,
                users_first_name_search: action.payload
            };
        case 'SEARCH_USER_EMAIL':
            return {
                ...state,
                user_email_search: action.payload
            }
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
        case 'EXPLORE_PASSAGE_SCREEN':
            return {
                ...state,
                passage_explore_search : action.payload
            }
        case 'ON_SEARCH_SUCCESS':
            return {
                ...state,
                on_search_success : action.payload
            }
        default:
            return state;
    }
}