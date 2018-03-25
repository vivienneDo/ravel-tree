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
            return {
                ...state,
                currentUserProfile: action.payload
            };       
        case 'GET_CURRENT_USER_PROFILE':
            return {
                ...state,
                currentUserProfile: action.payload
            };
        default:
            return state;
    }
}