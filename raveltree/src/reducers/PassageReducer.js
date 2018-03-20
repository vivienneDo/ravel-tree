const initialState = {
    passage_uid: '',
    passage_meta_data: [],
    passage_comment: [],
    passage_remove_comment_is_succcess: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PASSAGE':
            return {
                ...state,
                passage_uid: action.payload.ravel_uid,
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
        default:
            return state;
    }
}
