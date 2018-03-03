const initialState = {
    passage_uid: '',
    passage_meta_data: []
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
        default:
            return state;
    }
}