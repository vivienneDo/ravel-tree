const initialState = {
    ravel_participant_response: false
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE':
            return {
                ...state,
               ravel_participant_response: action.payload
            };
        case 'RESET_STATE_NOTIFICATION':
            return {
                ...state,
                ...initialState,
            }

        default:
            return state;
    }
}
