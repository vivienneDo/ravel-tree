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
*          if the ravel_par_number < 4
*/
export const updateRavelParticipant = (ravel_uid, ravel_tags) => {

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