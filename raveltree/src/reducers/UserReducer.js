const initialState = {
    first_name: '',
    last_name: '',
    bio: '',
    photoURL:'',
    stat_ravel_led: 0,
    stat_ravel_contributed: 0,
    stat_passage_written: 0,
    upvotes: 0,
    ravel_points: 0,
};

export default (state = initialState, action) => {
    console.log("getting user profile2")
    console.log('in index');
    switch (action.type) {

        case 'GET_USER_PROFILE':
            console.log('in get_user_profile');
            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                bio: action.payload.bio,
                photoURL: action.payload.photoURL,
                stat_ravel_led: action.payload.stat_ravel_led,
                stat_ravel_contributed: action.payload.stat_ravel_contributed,
                stat_passage_written: action.payload.stat_passage_written,
                upvotes: action.payload.upvotes,
                ravel_points: action.payload.ravel_points,
            };

        case 'UPDATE_USER_PROFILE_PICTURE':
            console.log('in update_user_profile_picture');
            return {
                ...state,
                photoURL: action.payload
            };   

        case 'UPDATE_USER_PROFILE':
            console.log('in update_user_profile');
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
                upvotes: action.payload.upvotes,
            };
        
        case 'UPDATE_USER_RAVEL_POINT':
            return {
                ...state,
                ravel_points: action.payload.ravel_points,
            };
            
        default:
            return state;
    }
}