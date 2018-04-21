const initialState = {
    ravel_participant_response: false,
    notificationCount : 0
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'RETRIEVED_UNREAD_NOTIFICATIONS':
            return {
                ...state,
                notificationCount: action.payload
            };

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
