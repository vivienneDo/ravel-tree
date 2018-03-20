const initialState = {
    all_user_created_ravels: [],
    all_non_created_user_ravel: [],
    get_pending_invite_ravel: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_CREATED_CURR_USER_RAVEL_FETCH':
            return {
                ...state,
                all_user_created_ravels: action.payload
            };
        case 'ALL_NON_CREATED_CURR_USER_RAVEL':
            return {
                ...state,
                all_non_created_user_ravel: action.payload
        }
        case'GET_PENDING_INVITE_RAVEL':
            return {
                ...state,
                get_pending_invite_ravel: action.payload
            }
        default:
            return state;
    }
}
