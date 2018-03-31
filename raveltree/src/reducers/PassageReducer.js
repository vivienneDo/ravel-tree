const initialState = {
    passage_uid: '',
    passage_meta_data: [],
    passage_comment: [],
    passage_remove_comment_is_succcess: false,
    passage_vote_is_success: false,
    passage_comment_fetch_is_success: false,
    passage_meta_data_fetch_is_success: false,
    passage_uid_level_list: [],
    passage_level_fetch_is_success: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PASSAGE':
            return {
                ...state,
                passage_uid: action.payload.passage_uid,
            };
        case 'GET_PASSAGE_META_DATA':
            return {
                ...state,
                passage_meta_data: action.payload
            };
        case 'GET_PASSAGE_COMMENT':
            return {
                ...state,
                passage_comment: action.payload
            }
        case 'REMOVE_PASSAGE_COMMENT_IS_SUCCESS':
            return {
                ...state,
                passage_remove_comment_is_succcess: action.payload
            }
        case 'ON_VOTE_SUCCESS':
            return {
                ...state,
                passage_vote_is_success: action.payload
            }
        case 'ON_GET_PASSAGE_COMMENT_SUCCESS':
            return {
                ...state,
                passage_comment_fetch_is_success: action.payload
            }
        case 'ON_GET_PASSAGE_META_DATA_SUCCESS':
            return {
                ...state,
                passage_meta_data_fetch_is_success: action.payload
            }
        case 'FETCH_ALL_PASSAGE_UID_ON_LEVEL':
            return {
                ...state,
                passage_uid_level_list: action.payload
            }
        case 'FETCH_ALL_PASSAGE_UID_ON_LEVEL_ON_SUCCESS':
            return {
                ...state,
                passage_level_fetch_is_success: action.payload
            }
        case 'RESET_STATE_PASSAGE':
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}
