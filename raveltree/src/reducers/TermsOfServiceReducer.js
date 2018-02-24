const initialState = {
    terms_of_service: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'GET_TERMS_OF_SERVICE': 
            return {
                ...state,
                terms_of_service: action.payload,
            };

        default:
            return state;
    }
}