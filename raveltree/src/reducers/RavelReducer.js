const initialState = {
    ravel_uid: '',
    ravel_meta_data: [],
    all_child_uid_val: [],
    all_ravel: [],
    ravel_tag_update: false
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
        console.log('Inside get meta data')
            return {
                ...state,
                ravel_meta_data: action.payload
            };
        case 'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE':
            return {
                ...state,
                all_child_uid_val: action.payload
            };
        case 'ALL_RAVEL_FETCH':
            return {
                ...state,
                all_ravel: action.payload
            };
        case 'UPDATE_RAVEL_TAG':
            return {
                ...state,
                ravel_tag_update: action.payload
            };
        default:
            return state;
    }
}