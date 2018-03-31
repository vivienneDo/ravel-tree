const initialState = {
    photoURL:'',
    currentUserProfile: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE_CURRENT_USER_PROFILE_PICTURE':
            return {
                ...state,
                photoURL: action.payload
            };

        case 'UPDATE_CURRENT_USER_PROFILE':
        console.log('I am here')
            return {
                ...state,
                currentUserProfile: action.payload
            };
        case 'GET_CURRENT_USER_PROFILE':
            return {
                ...state,
                currentUserProfile: action.payload
            };

        case 'RESET_STATE_CURRENT_USER':
            return {
                ...state,
                ...initialState,
            };

        default:
            return state;
    }
}
