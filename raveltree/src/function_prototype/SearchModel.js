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