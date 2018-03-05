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
