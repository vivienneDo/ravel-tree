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

        default:
            return state;
    }
}