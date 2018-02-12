const initialState = {
    first_name: '',
    last_name: '',
    bio: '',
    photoURL:'',
    stat_ravel_led: '',
    stat_ravel_contributed: '',
    stat_passage_written: '',
    upvotes: '',
    ravel_points: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {
                ...state,
                people: action.payload,
            };

        case 'UPDATE_USER_PROFILE':
            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                bio: action.payload.bio,
                photoURL: action.payload.photoURL,
            };
            
        case 'UPDATE_USER_STAT':
            return {
                ...state,
                stat_ravel_led: action.payload.stat_ravel_led,
                stat_ravel_contributed: payload.stat_ravel_contributed,
                stat_passage_written: payload.stat_passage_written,
            };
            
        case 'UPDATE_USER_UPVOTE':
            return {
                ...state,
                upvotes: payload.upvote,
            };
        
        case 'UPDATE_USER_RAVEL_POINT':
            return {
                ...state,
                ravel_points: payload.ravel_point,
            };
    
        default:
            return state;
    }
}