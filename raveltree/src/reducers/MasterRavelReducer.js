const initialState = {
    all_ravel: [],
    all_ravel_key: [],
    all_public_ravel_fetch: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'ALL_RAVEL_FETCH':
            return {
                ...state,
                all_ravel: action.payload
            };
        
        case 'ALL_RAVEL_KEY_FETCH': 
            return {
                ...state,
                all_ravel_keys: action.payload
            };

        case 'ALL_PUBLIC_RAVEL_FETCH':
            return {
                ...state,
                all_public_ravel_fetch: action.payload
            }
       
        default:
            return state;
    }
}