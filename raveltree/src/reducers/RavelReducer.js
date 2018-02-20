const initialState = {
    user_created:'',
    ravel_title: '', 
    ravel_category: '', 
    passage_length: '',              
    visibility: '', 
    enable_voting: '', 
    enable_comment: '', 
    ravel_concept: '', 
    ravel_status: false,
    ravel_number_participants: '',
    ravel_created_date: '',
    ravel_participants: [],
    ravel_tags: [],
    ravel_points: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RAVEL':
            return {
                ...state,
                user_created: action.payload.user_created,
                ravel_title: action.payload.ravel_title, 
                ravel_category: action.payload.ravel_category, 
                passage_length: action.payload.passage_length,              
                visibility: action.payload.visibility, 
                enable_voting: action.payload.enable_voting, 
                enable_comment: action.payload.enable_comment, 
                ravel_concept: action.payload.ravel_concept, 
                ravel_status: true,
                ravel_number_participants: action.payload.ravel_number_participants,
                ravel_created_date: action.payload.ravel_created_date,
                ravel_participants: action.payload.ravel_participants,
                ravel_points: action.payload.ravel_points
            };
        case 'INSERT_RAVEL_TAGS':
            return {
                ...state,
                ravel_tags: action.payload.ravel_tags,
            };

        case 'GET_RAVEL_META_DATA': 
            return {
                ...state,
                user_created: action.payload.user_created,
                ravel_title: action.payload.ravel_title, 
                ravel_category: action.payload.ravel_category, 
                passage_length: action.payload.passage_length,              
                visibility: action.payload.visibility, 
                enable_voting: action.payload.enable_voting, 
                enable_comment: action.payload.enable_comment, 
                ravel_concept: action.payload.ravel_concept, 
                ravel_status: true,
                ravel_number_participants: action.payload.ravel_number_participants,
                ravel_created_date: action.payload.ravel_created_date,
                ravel_participants: action.payload.ravel_participants,
                ravel_points: action.payload.ravel_points
            };

        default:
            return state;
    }
}