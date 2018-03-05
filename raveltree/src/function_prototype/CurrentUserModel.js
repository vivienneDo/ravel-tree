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
