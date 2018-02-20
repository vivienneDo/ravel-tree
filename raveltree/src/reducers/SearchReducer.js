const initialState = {
    users_first_name_search: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_USER_FIRST_NAME':
        console.log('Inside search reducer')
            return {
                ...state,
                users_first_name_search: action.payload
            };
        
        default:
            return state;
    }
}