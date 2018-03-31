const initialState = {
    terms_of_service: '',
    add_admin: false,
    is_admin: false,
    ravel_report_list: [],
    user_report_list: [],
    dismiss_ravel_state: false,
    dismiss_user_state: false,
    number_ravels: 0,
    number_users: 0,
    number_reported_ravels: 0,
    number_reported_users: 0,
    ban_ravel_success: false
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'IS_ADMIN':
            return {
                ...state,
                is_admin: action.payload
            }
        case 'GET_TERMS_OF_SERVICE':
            return {
                ...state,
                terms_of_service: action.payload
            };   
        case 'ADD_ADMIN':
            return {
                ...state,
                add_admin: action.payload
            }
        case 'GET_RAVEL_REPORT_LIST':
            return {
                ...state,
                ravel_report_list: action.payload
            }
        case 'GET_USER_REPORT_LIST':
            return {
                ...state,
                user_report_list: action.payload
            }
        case 'DISMISS_REPORT_RAVEL_SUCCESS':
            return {
                ...state,
                dismiss_ravel_state: action.payload
            }
        case 'DISMISS_REPORT_USER_SUCCESS':
            return {
                ...state,
                dismiss_user_state: action.payload
            }
        case 'GET_ADMIN_STAT':
            return {
                ...state,
                number_ravels: action.payload.number_ravels, 
                number_users: action.payload.number_users,
                number_reported_ravels: action.payload.number_reported_ravels,
                number_reported_users: action.payload.number_reported_users
           }
        case 'BAN_RAVEL_SUCCESS':
           return {
               ...state,
               ban_ravel_success: action.payload
           }
        default:
            return state;
    }
}