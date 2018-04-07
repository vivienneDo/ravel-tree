const initialState = {
    ravel_uid: '',
    ravel_meta_data: [],
    all_participant_of_a_ravel: [],
    ravel_tag_update: false,
    ravel_participants_update: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RAVEL':
        console.log('Inside create ravel' + action.payload.ravel_uid)
            return {
                ...state,
                ravel_uid: action.payload.ravel_uid,
            };
        case 'GET_RAVEL_META_DATA':
            return {
                ...state,
                ravel_meta_data: action.payload
            };
        case 'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE':
            return {
                ...state,
                all_participant_of_a_ravel: action.payload
            };
        case 'UPDATE_RAVEL_TAG':
            return {
                ...state,
                ravel_tag_update: action.payload
            };

        case 'UPDATE_RAVEL_PARTICIPANTS':
            return {
                ...state,
                ravel_participants_update: action.payload
            }
        case 'RESET_STATE_RAVEL':
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}
