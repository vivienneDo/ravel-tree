/*********************************** ~ HEADER ~ **************************************************/
/* @created by: Vivienne Do 
 *  Note to reader: DO NOT IMPORT THIS FILE, use => import * as actions from '../actions'
 * Since Javescript does not support interfaces, I created a file that lays out 
 * all of functions declarations. If the function's comments does not contain "mapStateToProps"
 * information, that means the function does not return a state.
 * 
 * This is the complete list, category has been created under src/function_prototype/<category>Model
 * 
 * Example of REDUX function: 
 * /**
 * @param: nothing 
 * @returns: 
 * mapStateToProps = state => currentUserProfile =                  // This is the object returned by the reducer
 * state.current_user:                                              // you will map it to your store and set it = state.<reducer's state>
 *      'GET_CURRENT_USER_PROFILE' - an entire userProfile object   // This is the state returned by the reducer 
 *          - this.props.currentUserProfile.bio                     // This is how you would map the fields from the object 
 *          - this.props.currentUserProfile.first_name 
 *          - this.props.currentUserProfile.last_name 
 *          - this.props.currentUserProfile.photoURL
 *          - this.props.currentUserProfile.ravel_points
 *          - this.props.currentUserProfile.stats_passage_written
 *          - this.props.currentUserProfile.stat_ravel_contributed
 *          - this.props.currentUserProfile.stat_ravel_led
 *          - this.props.currentUserProfile.upvotes
 *          - this.props.currentUserProfile.user_uid
 * actions: gets the user profile of the current user 
 * 
 */

 /*********************************** ~ HEADER ~ **************************************************/

/* CREATE USER/LOGIN FUNCTIONS */

/**
 * @param: registered user's email address 
 * @returns: nothing
 * actions: fires an email that will enable a user to reset their password
 * 
 */
export const userResetPassword = (email) => {

}

/**
 * @param: registered user's email and password
 * @returns: nothing
 * actions: attempts to log a registered user into the db. 
 * 
 */
export const signInWithEmail = (email, password) => {

}

/**
 * @param: an email and password
 * @returns: nothing
 * actions: attempts to create a new user and sets their user profile to null 
 * 
 */
export const createUserWithEmail = (email, password) => {

}

/**
 * @param: nothing
 * @returns: nothing
 * actions: logs the current user off 
 * 
 */
export const userLogOff = () => { 

}

/** CURRENT USER FUNCTIONS */

/**
 * @param: nothing
 * @returns: the current user's uid 
 * 
 */
export const getCurrentLoggedInUserUid = () => {

}

/**
 * @param: nothing
 * @returns: the current user User object 
 * 
 */
export const getCurrentLoggedInUser = () => {

}

/**
 * @param: nothing 
 * @returns: 
 * mapStateToProps = state => currentUserProfile =
 * state.current_user: 
 *      'GET_CURRENT_USER_PROFILE' - an entire userProfile object
 *          - this.props.currentUserProfile.bio
 *          - this.props.currentUserProfile.first_name 
 *          - this.props.currentUserProfile.last_name 
 *          - this.props.currentUserProfile.photoURL
 *          - this.props.currentUserProfile.ravel_points
 *          - this.props.currentUserProfile.stats_passage_written
 *          - this.props.currentUserProfile.stat_ravel_contributed
 *          - this.props.currentUserProfile.stat_ravel_led
 *          - this.props.currentUserProfile.upvotes
 *          - this.props.currentUserProfile.user_uid
 * actions: gets the user profile of the current user 
 * 
 */
export const getCurrentUserProfile = () => {

}

/**
 * @param: user's { first_name, last_name, bio }
 * @returns: 
 * mapStateToProps = state => currentUserProfile =
 * state.current_user
 *      'UPDATE_CURRENT_USER_PROFILE' : first_name, last_name, bio
 *          - this.props.currentUserProfile.bio
 *          - this.props.currentUserProfile.first_name 
 *          - this.props.currentUserProfile.last_name 
 *          - this.props.currentUserProfile.photoURL
 *          - this.props.currentUserProfile.ravel_points
 *          - this.props.currentUserProfile.stats_passage_written
 *          - this.props.currentUserProfile.stat_ravel_contributed
 *          - this.props.currentUserProfile.stat_ravel_led
 *          - this.props.currentUserProfile.upvotes
 *          - this.props.currentUserProfile.user_uid
 * actions: attempts to update the current logged in user's first name, last and bio and gives back the updated userProfile
 *          object
 */
export const updateCurrentUserProfile = ({ first_name, last_name, bio }) => {

}


/**
 * @param: photo url
 * @returns: 
 * mapStateToProps = state => photoURL =
 * state.current_user: 
 *      'UPDATE_CURRENT_USER_PROFILE_PICTURE' - new photo url 
 *          - this.props.photoURL
 * 
 * actions: updates the currently logged in user's user profile picture
 * and updates in their user_created ravel card reference 
 */
export const updateProfilePicture = (url) => {

}

/** CURRENT USER 'YOUR RAVELS' TAB FUNCTIONS */

/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_user_created_ravels = 
 * state.current_user_ravel:
 *      'INITIAL_USER_RAVEL_FETCH' : a list of ravels that the current user created   
 *          - this.props.all_user_created_ravels.enable_comment
            - this.props.all_user_created_ravels.enable_voting
            - this.props.all_user_created_ravels.m_ravel_participants
            - this.props.all_user_created_ravels.passage_length
            - this.props.all_user_created_ravels.ravel_category
            - this.props.all_user_created_ravels.ravel_concept
            - this.props.all_user_created_ravels.ravel_create_date
            - this.props.all_user_created_ravels.ravel_number_participants
            - this.props.all_user_created_ravels.ravel_participants{}
            - this.props.all_user_created_ravels.ravel_points 
            - this.props.all_user_created_ravels.ravel_title
            - this.props.all_user_created_ravels.user_created
            - this.props.all_user_created_ravels.user_created_photoURL
 * actions: gets the current user's created ravels 
 * 
 */
export const loadInitialCurrentUserCreatedRavel = () => {

}

/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_non_created_user_ravel =
 * state.current_user_ravel:
 *      'ALL_NON_CREATED_CURR_USER_RAVEL' : a list of ravels that the current user is particpating in (but did not create) 
 *          - this.props.all_non_created_user_ravel.enable_comment
            - this.props.all_non_created_user_ravel.enable_voting
            - this.props.all_non_created_user_ravel.m_ravel_participants
            - this.props.all_non_created_user_ravel.passage_length
            - this.props.all_non_created_user_ravel.ravel_category
            - this.props.all_non_created_user_ravel.ravel_concept
            - this.props.all_non_created_user_ravel.ravel_create_date
            - this.props.all_non_created_user_ravel.ravel_number_participants
            - this.props.all_non_created_user_ravel.ravel_participants{}
            - this.props.all_non_created_user_ravel.ravel_points 
            - this.props.all_non_created_user_ravel.ravel_title
            - this.props.all_non_created_user_ravel.user_created
            - this.props.all_non_created_user_ravel.user_created_photoURL
 * actions: gets the current user's participating ravels 
 * 
 */
export const loadNonCreatedCurrentUserRavel = () => {
   
}



/** NON_CURRENT_USER USER FUNCTIONS */

/**
 * @param: user uid 
 * @returns: 
 * mapStateToProps = state => userProfile = 
 * state.user: 
 *      'GET_USER_PROFILE' - an entire userProfile object
 *          - this.props.userProfile.bio
 *          - this.props.userProfile.first_name 
 *          - this.props.userProfile.last_name 
 *          - this.props.userProfile.photoURL
 *          - this.props.userProfile.ravel_points
 *          - this.props.userProfile.stats_passage_written
 *          - this.props.userProfile.stat_ravel_contributed
 *          - this.props.userProfile.stat_ravel_led
 *          - this.props.userProfile.upvotes
 *          - this.props.userProfile.user_uid
 * actions: gets the user profile of the passed in uid 
 * 
 */
export const getUserProfile = (uid) => {

}

/** RAVEL FUNCTIONS */

/**
 * @param: { ravel_title, ravel_category, passage_length, visibility (true/false), enable_voting (true/false), enable_comment (true/false),
           ravel_concept, m_ravel_participants [ARRAY], ravel_tags [ARRAY] }
 * @returns: 
 * mapStateToProps = state => ravel_meta_data = 
 * state.ravel
 *      <1>'CREATE_RAVEL' - a new ravel uid
 *          - this.props.ravel_uid
 * 
 *      <2>'GET_RAVEL_META_DATA' - entire ravel object
 *      
            - this.props.ravel_meta_data.enable_comment
            - this.props.ravel_meta_data.enable_voting
            - this.props.ravel_meta_data.m_ravel_participants
            - this.props.ravel_meta_data.passage_length
            - this.props.ravel_meta_data.ravel_category
            - this.props.ravel_meta_data.ravel_concept
            - this.props.ravel_meta_data.ravel_create_date
            - this.props.ravel_meta_data.ravel_number_participants
            - this.props.ravel_meta_data.ravel_participants{}
            - this.props.ravel_meta_data.ravel_points 
            - this.props.ravel_meta_data.ravel_title
            - this.props.ravel_meta_data.user_created
            - this.props.ravel_meta_data.user_created_photoURL

 * actions: attempts to create a new ravel and set all of the metadata. 
 * 
 * 
 */
export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
                                ravel_concept, m_ravel_participants, ravel_tags }) => {
}

/** 
 * @param: ravel uid (unique id)
 * @returns: 
 * mapToStateProps = state => ravel_meta_data = 
 * state.ravel
 *      'GET_RAVEL_META_DATA': a particular ravel object that contains its metadata 
 *          - this.props.ravel_meta_data.enable_comment
            - this.props.ravel_meta_data.enable_voting
            - this.props.ravel_meta_data.m_ravel_participants
            - this.props.ravel_meta_data.passage_length
            - this.props.ravel_meta_data.ravel_category
            - this.props.ravel_meta_data.ravel_concept
            - this.props.ravel_meta_data.ravel_create_date
            - this.props.ravel_meta_data.ravel_number_participants
            - this.props.ravel_meta_data.ravel_participants{}
            - this.props.ravel_meta_data.ravel_points 
            - this.props.ravel_meta_data.ravel_title
            - this.props.ravel_meta_data.user_created
            - this.props.ravel_meta_data.user_created_photoURL
 * actions: attempts to get a particular ravel object's metadata (public/private)
 */
export const getRavelMetaData = (ravel_uid) => {

}

/**
 * @param: ravel_uid
 * @returns: 
 * mapToStateProps = state => all_participant_of_a_ravel = 
 * state.ravel
 *      'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE': a list of userProfile objects of all participants for a particular ravel
 *          - this.props.all_participant_of_a_ravel.bio
 *          - this.props.all_participant_of_a_ravel.first_name 
 *          - this.props.all_participant_of_a_ravel.last_name 
 *          - this.props.all_participant_of_a_ravel.photoURL
 *          - this.props.all_participant_of_a_ravel.ravel_points
 *          - this.props.all_participant_of_a_ravel.stats_passage_written
 *          - this.props.all_participant_of_a_ravel.stat_ravel_contributed
 *          - this.props.all_participant_of_a_ravel.stat_ravel_led
 *          - this.props.all_participant_of_a_ravel.upvotes
 *          - this.props.all_participant_of_a_ravel.user_uid
 * actions: attempts to get a list of userProfile objects of all participants for a particular ravel
 * 
 */
export const getAllRavelParticipantUserProfile = (ravel_uid) => {
    
}


/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_public_ravel_fetch = 
 * state.master_ravel 
 *      'ALL_PUBLIC_RAVEL_FETCH': a list of all public ravel objects 
 *          - this.props.all_public_ravel_fetch.enable_comment
            - this.props.all_public_ravel_fetch.enable_voting
            - this.props.all_public_ravel_fetch.m_ravel_participants
            - this.props.all_public_ravel_fetch.passage_length
            - this.props.all_public_ravel_fetch.ravel_category
            - this.props.all_public_ravel_fetch.ravel_concept
            - this.props.all_public_ravel_fetch.ravel_create_date
            - this.props.all_public_ravel_fetch.ravel_number_participants
            - this.props.all_public_ravel_fetch.ravel_participants{}
            - this.props.all_public_ravel_fetch.ravel_points 
            - this.props.all_public_ravel_fetch.ravel_title
            - this.props.all_public_ravel_fetch.user_created
            - this.props.all_public_ravel_fetch.user_created_photoURL
 * actions: attempts to get a list of all public ravel objects 
 */
export const loadAllPublicRavel = () => {

}

/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_ravel = 
 * state.master_ravel 
 *      'ALL_RAVEL_FETCH': a list of all ravel objects 
 *          - this.props.all_ravel.enable_comment
            - this.props.all_ravel.enable_voting
            - this.props.all_ravel.m_ravel_participants
            - this.props.all_ravel.passage_length
            - this.props.all_ravel.ravel_category
            - this.props.all_ravel.ravel_concept
            - this.props.all_ravel.ravel_create_date
            - this.props.all_ravel.ravel_number_participants
            - this.props.all_ravel.ravel_participants{}
            - this.props.all_ravel.ravel_points 
            - this.props.all_ravel.ravel_title
            - this.props.all_ravel.user_created
            - this.props.all_ravel.user_created_photoURL
 * actions: attempts to get a list of all ravel objects 
 */
export const loadAllRavel = () => {

}

/** RAVEL UPDATE FUNCTIONS  */
/*
/**
 * @param: ravel uid, a new set of ravel_tags[ARRAY]
 * @returns:
 * mapStateToProps = state => ravel_tag_update 
 * state.ravel
 *      'UPDATE_RAVEL_TAG': returns true if successful 
 *          - this.props.ravel_tag_update
 * actions: attempts to adds the new tags to the list of existing tags for a particular ravel
 */
export const updateRavelTag = (ravel_uid, ravel_tags) => {

}

/**
 * @param: ravel uid, a new set of ravel participants[ARRAY]
 * @returns: 
 * mapStateToProps = state => ravel_participants_update = 
 * state.ravel
 *      'UPDATE_RAVEL_PARTICIPANTS': returns true if successful, false if not.
 *          - this.props.ravel_participants_update
 * actions: attempts to adds the new participants to the list of existing participants for a particular ravel
 *          if the ravel_par_number <= 4
 */
export const updateRavelParticipant = (ravel_uid, ravel_tags) => {

}



/** SEARCH FUNCTIONS */

/**
 * @param: a first name search 
 * @returns: 
 * mapStateToProps = state => users_first_name_search =
 * state.search
 *      'SEARCH_USER_FIRST_NAME': a list of userProfile object with the same first name
 *          - this.props.users_first_name_search.bio
 *          - this.props.users_first_name_search.first_name 
 *          - this.props.users_first_name_search.last_name 
 *          - this.props.users_first_name_search.photoURL
 *          - this.props.users_first_name_search.ravel_points
 *          - this.props.users_first_name_search.stats_passage_written
 *          - this.props.users_first_name_search.stat_ravel_contributed
 *          - this.props.users_first_name_search.stat_ravel_led
 *          - this.props.users_first_name_search.upvotes
 *          - this.props.users_first_name_search.user_uid
 * actions: filters all user profiles by first name attribute 
 * 
 */
export const searchUserByName = (first_name) => {

}

/**
 * @param: tag [ARRAY]
 * @returns: 
 * mapStateToProps = state => ravel_tag_search = 
 * state.search
 *      'SEARCH_RAVEL_BY_TAG': a list of ravel objects with associated tags 
            - this.props.ravel_tag_search.enable_comment
            - this.props.ravel_tag_search.enable_voting
            - this.props.ravel_tag_search.m_ravel_participants
            - this.props.ravel_tag_search.passage_length
            - this.props.ravel_tag_search.ravel_category
            - this.props.ravel_tag_search.ravel_concept
            - this.props.ravel_tag_search.ravel_create_date
            - this.props.ravel_tag_search.ravel_number_participants
            - this.props.ravel_tag_search.ravel_participants{}
            - this.props.ravel_tag_search.ravel_points 
            - this.props.ravel_tag_search.ravel_title
            - this.props.ravel_tag_search.user_created
            - this.props.ravel_tag_search.user_created_photoURL
 * actions: attempts to filter all ravels by tag. function will loop through 
 * all tags in tag[] and return all ravels with a match.
 * 
 */
export const searchRavelByTag = (tag) => {

}

/**
 * @param: title
 * @returns: 
 * mapStateToProps = state => ravel_title_search = 
 * state.search 
 *      'SEARCH_RAVEL_BY_TITLE': a list of ravels with the same title param
            - this.props.ravel_title_search.enable_comment
            - this.props.ravel_title_search.enable_voting
            - this.props.ravel_title_search.m_ravel_participants
            - this.props.ravel_title_search.passage_length
            - this.props.ravel_title_search.ravel_category
            - this.props.ravel_title_search.ravel_concept
            - this.props.ravel_title_search.ravel_create_date
            - this.props.ravel_title_search.ravel_number_participants
            - this.props.ravel_title_search.ravel_participants{}
            - this.props.ravel_title_search.ravel_points 
            - this.props.ravel_title_search.ravel_title
            - this.props.ravel_title_search.user_created
            - this.props.ravel_title_search.user_created_photoURL
 * actions: attempts to filter ravels by title
 * 
 * 
 */
export const searchRavelByTitle = (title) => {

}

/**
 * @param: category
 * @returns: 
 * mapStateToProps = state => ravel_category_search = 
 * state.search
 *      'SEARCH_RAVEL_BY_CATEGORY': a list of ravels with the same category
            - this.props.ravel_category_search.enable_comment
            - this.props.ravel_category_search.enable_voting
            - this.props.ravel_category_search.m_ravel_participants
            - this.props.ravel_category_search.passage_length
            - this.props.ravel_category_search.ravel_category
            - this.props.ravel_category_search.ravel_concept
            - this.props.ravel_category_search.ravel_create_date
            - this.props.ravel_category_search.ravel_number_participants
            - this.props.ravel_category_search.ravel_participants{}
            - this.props.ravel_category_search.ravel_points 
            - this.props.ravel_category_search.ravel_title
            - this.props.ravel_category_search.user_created
            - this.props.ravel_category_search.user_created_photoURL
 * actions: attempts to filter ravels by category
 * 
 */
export const searchRavelByCategory = (category) => {

}

/** PASSAGE FUNCTIONS */
/**
 * 
 * @param {*} {ravel_uid, passage_title, passage_body}
 * @returns {*} 
 * mapStateToProps = state => passage_meta_data =
 * state.passage
 *              <1> 'CREATE_PASSAGE' - returns the passage_uid that was just created
 *                  - this.props.passage_uid
 *              <2> 'GET_PASSAGE_META_DATA' - attempts to get the metadata from a passage just created
 *                  - this.props.passage_meta_data.passage_body
 *                  - this.props.passage_meta_data.passage_create_date
 *                  - this.props.passage_meta_data.passage_downvote
 *                  - this.props.passage_meta_data.passage_title
 *                  - this.props.passage_meta_data.passage_upvote
 *                  - this.props.passage_meta_data.ravel_title
 *                  - this.props.passage_meta_data.ravel_uid
 *                  - this.props.passage_meta_data.user_created
 *                  - this.props.passage_meta_data.user_created_photoURL
 *                  - this.props.passage_meta_data.
 */
export const createPassage = ({ravel_uid, passage_title, passage_body}) => {

}

/**
 * 
 * @param {*} passage_uid 
 * @returns {*} nothing 
 * actions: updates a passage's upvote count
 */
export const upVotePassage = (passage_uid) => {

}

/**
 * 
 * @param {*} passage_uid 
 * @returns {*} nothing
 * actions: updates a passage's downvote count
 */
export const downVotePassage = (passage_uid) => {

}

/**
 * 
 * @param {*} passage_uid 
 * @returns {*} nothing*** for stats puposes: upvote + downvote total 
 */
export const calculateTotalVotePassage = (passage_uid) => {

}

/** NOTIFICATION FUNCTIONS */

/**
 * 
 * @param {*} ravel_uid 
 * @returns: 
 * mapStateToProps = state => ravel_participant =       
 * state.notification
 *      'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE' - sets 'true' if accepts, 'false' if does not accept
 *          - this.props.ravel_participant_response 
 * actions: sets the ravel participant to 'true' if a user accepts the ravel invite. Updates the ravel_number_participant 
 *          field. 
 * 
 */
export const acceptRavelInvite = (ravel_uid) => {

}

/** ADMIN FUNCTIONS... (NOT DONE) */

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: 
 * @returns: 
 * 
 */
export const insertTermsOfService = (terms_of_service) => {

    
}

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: 
 * @returns: 
 * 
 */
export const updateTermsOfService = (terms_of_service) => {
    
}

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: nothing 
 * @returns: the current terms of service 
 * 
 */
export const readTermsOfService = () => {
   
}

/**
 * 
 */
export const addAdminUser = (uid) => {

}

/** MASTER KEY FUNCTIONS */
/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_user_keys =
 * state.all_user_keys
 *      'ALL_USER_KEY_FETCH': a list of all user uid and it's status (true/false)
 *          - this.props.all_user_keys => user.uid
 */
export const loadAllUserKey = () => {

}


/**
 * @param: nothing
 * @returns: 
 * mapStateToProps = state => all_ravel_key = 
 * state.master_ravel
 *      'ALL_RAVEL_KEY_FETCH': a list of all ravel uid and it's status (true/false)
 *          - this.props.all_ravel_key => ravel_uid
 */
export const loadAllRavelKey = () => {

}



/* HELPER FUNCTIONS (WRAPPERS) */
/**
 * @param: nothing 
 * @returns: nothing
 * actions: Wrapper method that is used to set null values upon a
 * new user creation. Do not directly call. 
 * 
 */
export const updateUserProfile = (userProfile, {first_name, last_name, bio, 
    photoURL, stat_ravel_led, stat_passage_written, 
    stat_ravel_contributed, upvotes, ravel_points}) => {
}

/** TODO
 * @param: 
 * @returns: 
 * 
 */
export const calculatesUserStat = ({ stat_ravel_led, stat_ravel_contributed, stat_passage_written }) => {

}


/** TODO 
 * @param: 
 * @returns: 
 * 
 * 
 */
export const calculatesUserUpVote = (upvotes) => {

}


/** TODO
 * @param: 
 * @returns: 
 * 
 * 
 */
export const updateUserRavelPoint = (ravel_points) => {

}