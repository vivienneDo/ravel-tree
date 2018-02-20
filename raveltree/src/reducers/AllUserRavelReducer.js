const initialState = {
    ravels: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_USER_RAVEL_FETCH':
            return {
                ...state,
                ravels: action.payload
            };

        default:
            return state;
    }
}