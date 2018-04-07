const initialState = {
    userProfile: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'GET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.payload
            };
        case 'RESET_STATE_USER':
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}
