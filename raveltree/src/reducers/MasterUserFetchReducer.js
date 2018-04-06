const initialState = {
    all_user_keys: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ALL_USER_KEY_FETCH':
            return {
                ...state,
                all_user_keys: action.payload,
            };
        case 'RESET_STATE_MASTER_USER_FETCH':
            return {
                ...state,
                ...initialState,
            };

        default:
            return state;
    }
}
