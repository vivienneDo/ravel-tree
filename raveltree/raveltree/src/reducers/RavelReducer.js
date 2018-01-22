const initialState = {
    
    user_created:'',
    ravel_title: '', 
    ravel_category: '', 
    passage_length: '',              
    visibility: '', 
    enable_voting: '', 
    enable_comment: '', 
    ravel_concept: '', 
    ravel_status: '',
    ravel_time_created:''


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
                ravel_status: action.payload.ravel_status,
                ravel_time_created: action.payload.ravel_time_created
            };

        default:
            return state;
    }
}