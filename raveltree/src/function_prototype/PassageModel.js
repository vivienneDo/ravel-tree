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