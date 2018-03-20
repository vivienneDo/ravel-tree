const initialState = {
    ravel_report_success: false,
    user_report_success: false

};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REPORT_RAVEL_SUCCESS':
            return {
                ...state,
                ravel_report_success: action.payload
            }
        case 'REPORT_USER_SUCCESS':
            return {
                ...state,
                user_report_success: action.payload
            }
        default:
            return state;
    }
}
