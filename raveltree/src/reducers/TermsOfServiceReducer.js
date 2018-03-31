const initialState = {
    terms_of_service: '',
    terms_of_service_accept: false,
    privacy_policy: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'GET_TERMS_OF_SERVICE': 
            return {
                ...state,
                terms_of_service: action.payload,
            };
        case 'USER_ACCEPTED_TERMS_OF_SERVICE':
            return {
                ...state,
                terms_of_service_accept: action.payload
            }
        case 'GET_PRIVACY_POLICY':
            return {
                ...state,
                privacy_policy: action.payload
            }
        default:
            return state;
    }
}