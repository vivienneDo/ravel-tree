/* @created by: Vivienne Do
 * Note to reader: Please go to ../function_prototype/indexPrototype.js and read all of the parameter and
 * state returns for each function
 */
/**
 * LOGS
   - 3/24/2018 - VD Do - Added: createRavel() these fields:
    var roots = {root:true};
    var level_count = 0;
    var nodeCount = { 0:0 };
    var has_children = false;

   - 3/25/2018 - VD Do - Added passage functions and user voting tracker list
   - 3/26/2018 - VD Do - Updated addPassage() and addInitialPassage() to check if currentUser is creator of ravel
                         Updated upVoteRavel() and downDownRavel() to return dispatch ON_SUCCESS : false when failed
                         Updated createStartRavel() push roots:false, nodeCount: false on initi
                         Updated addInitiPassage() to push  var parent = {root:true} and var children = false on start
                         Added getPassageMetaData()
                         Added calculatePassageIndexField() and updated addPassage() and addInitiPassage() to update passage_index

  - 3/28/2018 - VD Do - Added forkPassage() and mergeTwoPassage() and helper functions.
                        Updated getPassageMetaData() to accept ravel_uid as a param
                        <2>Refactored addAdminUser() to create a new user when called
                        Added email field to user's userProfile when new account is created.
                        Added searchUserByEmail()
                        Refactored forkPassage() to add passage_uid to roots array if level === 1
  - 3/31/2018 - VD Do - Refactored downVotePassage() to reset user_track_vote field on downVotePassage()
                        Refactored addPassage(), addInitPassage() and forkPassage() to have datetime with format:
                        dateformat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
                        Refactored addPassage(), addInitPassage() and forkPassage() to have the following fields:
                        - this.props.passage_meta_data.optimalityScore
 *                      - this.props.passage_meta_data.currentPassageOptimality
 *                      - this.props.passage_meta_data.optimalChild
                        Added reCalculateOptimalityScore(), reCalculateCurrentPassagesOptimalityScore
                        Added getOptimalityChildID(), getOptimality()
                        Refactored getPassageMetaData() to call reCalculateOptimalityScore()
 - 04/07/2018 - VD Do - Added userNoVoteTrackerHelper() which sets the field to 'novote' when a user is in no-vote state
                      - Added searchAllRavelByTitle() that searches for allravels by title (public and private )
                      - Modified createUser() to set initial ravel_created field to false
                      - Converted all admin functions to return a promise back
                      - Added fetchPassageExploreView() - Gets at max 30 passages for explore screen
                                                       - Based on the algorithm defined in the function
                      - Modified getRavelMetaData() to add user_uid to trending_view_list
                      - Modfied createStartRavel() to set view count to 0 in ravel object
                      - Added searchRavelByTrending() - returns a list of ravels in ascending order.
 - 04/09/2018 - VD Do - Fixed addAllParentPassageToChildPassageOnFork() by setting each uid uniquely
                      - Added addAllChildPassageToParentPassageOnFork() to add new passage to the `child` array of the common parent
                      - Fixed level_count bug
 - 04/10/2018 - Frank - Fixed potential null reference error on get_curr_tags2 in updateRavelParticipant ().
                      - Fixed negative index bug in fetchPassageExploreView (fetchUserPublicRavelExploreHelper () -> limitToLast ()).
                      - Fixed potential undefined/null object conversion in getRavelTags ().
                      - Fixed potential undefined/null object conversion in fetchPassageExploreView ().
                      - Fixed continued evaluation after auth () error that caused null reference in signInWithEmail ().
 - 04/11/2018 - Frank - Fixed 'category' bug by adding breaks to switch statement in createStartRavel ().
 - 04/12/2018 - VD Do -
                    Added:
                      - getCompletePassageReportList - fetches all passages that are reported
                      - addReportMessage - helper function, do not call directly
                      - reportPassage - adds a passage to report list
                      - dismissReportedPassage - dismisses a reported passage

                    Modified:
                      - addPassage - added enable_comment : ravel enable value, is_banned : false
                      - addInitialPassage- added enable_comment : ravel enable value, is_banned : false
                      - forkPassage- added enable_comment : ravel enable value, is_banned : false
                      - reportUser - added report_message param
                      - reportRavel- added report_message param
 - 04/13/2018 - VD Do - Modified: 
                      - banReportedUser - updates the banned user's userprofile to have null values 
                      - flagReportedUser - ^ comment above is actually for flagReportedUser function 
                      - Fixed unwanted ravel_created/number_participant side effect 
                    Modified:
                      - signInWithEmail - Fixed email verification process. Left code uncommented for now. 
                    Added: 
                      - calculateRavelOptimalityScore - recalculates all passages scores for a given ravel 
                        do not call directly. 
                      - getAllGlobalTags - gets all global tags in the db 
                    Modified:
                      - getRavelMetaData - calls calculateRavelOptimalityScore 
 */


import firebase from 'firebase';
import _ from 'lodash';
const dateformat = require('dateformat');

/* TEST FUNCTIONS */
/**
* @param: nothing
* @returns: The current privacy_policy
* actions: Test function that attempts to get the current privacy policy in the
*          database.
*/
export const returnTest = () => dispatch => {
  return new Promise ((resolve, reject) => {
    firebase.database().ref(`privacy_policy/privacy_policy`).once('value', (snapshot) => {
      resolve (snapshot.val ());
    })
    .catch((error) => {
      reject ('Error getting privacy policy.');
    })
  });
}


/* CREATE USER/LOGIN FUNCTIONS */

/**
* @param: nothing
* @returns: the current privacy_policy
* mapStateToProps = state => term_of_service =
* state.term_of_service:
*      'GET_PRIVACY_POLICY' - the privacy policy in the db
*          - this.props.term_of_service.privacy_policy
* actions: Attempts the get the current privacy policy in the database.
*/
export const readPrivacyPolicy = () => {

    return (dispatch) => {
        firebase.database().ref(`privacy_policy/privacy_policy`).once('value', (snapshot) => {
            dispatch({type: 'GET_PRIVACY_POLICY', payload: snapshot.val() })
        })
        .catch((error) => {
            alert('Error getting privacy policy...')
        })
    }
}


/**
* @param: nothing
* @returns: the current user's uid
*
*/
export const getCurrentLoggedInUserUid = () => dispatch => {

   return firebase.auth().currentUser.uid;
}

/**
* @param: nothing
* @returns: the current user User object
*
*/
export const getCurrentLoggedInUser = () => {

   return firebase.auth().currentUser;
}

/**
* @param: nothing
* @returns: nothing
* actions: Wrapper method that is used to set null values upon a
* new user creation. Do not directly call.
*
*/
export const updateUserProfile = (userProfile, {first_name, last_name, bio,
                               photoURL, stat_ravel_led, stat_passage_written,
                               stat_ravel_contributed, upvotes, ravel_points, email}) => {

   var user_uid = userProfile.uid;
   firebase.database().ref(`/users/${userProfile.uid}/userProfile`)
   .set({ user_uid, first_name, last_name, bio, photoURL,stat_ravel_led, stat_passage_written,
   stat_ravel_contributed, upvotes, ravel_points,email })
   .catch((error) => {
       alert('Error Updating Profile...')
   })
   .then (function (snapshot) {
        getCurrentUserProfile ();
   });
}


/**
* @param: nothing
* @returns: nothing
* actions: logs the current user off
*
*/
export const userLogOff = () => dispatch => {

   firebase.auth().signOut().then(function() {
   })
   .catch((error) => {
       alert('Error Logging Off...');
   })
};


/**
 * @param: registered user's email address
 * @returns: nothing
 * actions: fires an email that will enable a user to reset their password
 *
 */
export const userResetPassword = (email) => dispatch => {
   var auth = firebase.auth();

   auth.sendPasswordResetEmail(email).then(function() {
   })
   .catch(function(error) {
       alert('Cannot reset password...');
   });
}

/**
* @param: registered user's email and password
* @returns:
* mapStateToProps:
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
* actions: Gets the user profile of the current user,
*          Attempts to log a registered user into the db.
*
*/
export const signInWithEmail = (email, password) => dispatch => {

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            } else if (errorCode === 'auth/user-not-found') {
            alert('There is no user corresponding to the given email address.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
        })
        .then (function (user) {
            if (!user) {               
            return;           
            } 
            /* Uncomment out this else if block below if you want to signin with
            email verification */     

            // else if (user.emailVerified === false) {
            //     alert('Please verify your email.')
            // } 
            
            else {

                var currentUid = firebase.auth().currentUser.uid;

                firebase.database().ref(`/users/${currentUid}/userProfile`)
                .once('value', snapshot => {
                    dispatch({ type: 'GET_CURRENT_USER_PROFILE',
                                payload: snapshot.val() });
                })
                .catch((error) => {
                    alert('Error loading user profile.')
                })
                
            }
        });
         
 };

/**
* @param: an email and password
* @returns:
* mapStateToProps:
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
* actions: Attempts to create a new user,
*          Gets the user profile of the current user,
*          Attempts to log a registered user into the db.
*
*/
export const createUserWithEmail = (email, password) => dispatch => {

   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then((user) => {
       firebase.database().ref(`/master_user_key/${user.uid}`).set({ user_uid: true })
       if (user && user.emailVerified === false){
           user.sendEmailVerification().then(function(){
             alert("Email verification sent to user. Please check your email.");
           });
         }
   })
   .catch(function(error) {

   var errorCode = error.code;
   var errorMessage = error.message;
   if (errorCode == 'auth/weak-password') {
       alert('The password is too weak.');
   } else if (errorCode === 'auth/email-already-in-use') {
       alert('There already exists an account with the given email address');
   } else {
       alert(errorMessage);
   }
        console.log(error);
   })
};

/**
* @param:
    user, {
        first_name
        last_name
        bio
        photoURL
    }
* @returns: nothing
* actions: attempts to create a new user via a federated identity and sets
* their user profile to the values provided (or null if none).
*
*/
export const createUser = (firstName, lastName, bio, photoURL = '') => dispatch => {

 var user = firebase.auth().currentUser;
 var m_email = firebase.auth().currentUser.email;

// Do any initial user setup here
 firebase.database ().ref (`/master_user_key/${user.uid}`).set ({ user_uid: true })
 .then(() => {

    firebase.database().ref(`notification_list/${user.uid}`).set(true)
    .then(() => {
        firebase.database().ref(`users/${user.uid}/ravel_created`).set(false)

    })
 })
 .catch ((error) => {alert('Error creating profile.')});

 updateUserProfile (user, {
   first_name: firstName,
   last_name: lastName,
   bio: bio,
   photoURL: photoURL,
   stat_ravel_led: 0,
   stat_passage_written: 0,
   stat_ravel_contributed: 0,
   upvotes: 0,
   ravel_points: 0,
   email: m_email
 });
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
export const getUserProfile = (uid) => dispatch => {
    return new Promise ((resolve, reject) => {
        firebase.database().ref(`/users/${uid}/userProfile`)
        .once('value', snapshot => {
            resolve (snapshot.val ());
            dispatch({ type: 'GET_USER_PROFILE',
                       payload: snapshot.val() });
        })
        .catch((error) => {
            reject ('Error loading user profile.')
        })
    });
};

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
export const loadAllUserKey = () => dispatch => {
  return new Promise ((resolve, reject) => {
    firebase.database().ref(`master_user_key`)
    .once('value', function(snapshotRavels) {
      resolve (snapshotRavels.val());
      dispatch({ type: 'ALL_USER_KEY_FETCH', payload: snapshotRavels.val()});
    })
    .catch((error) => {
      reject ('Error loading all user keys.');
    })
  });
};

/** CURRENT USER FUNCTIONS */

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


    return (dispatch) => {

        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({
            photoURL : url,
          })
          .then(() => {
            dispatch({ type: 'UPDATE_CURRENT_USER_PROFILE_PICTURE',
            payload: url});
          })
          .then(() => {

            var ravel_query = firebase.database().ref(`ravels`).orderByChild(`user_created`).equalTo(currentUser.uid);
            ravel_query.once('value', (snapshot) => {
                snapshot.forEach((ravelSnap) => {
                    firebase.database().ref(`ravels/${ravelSnap.key}`).update({user_created_photoURL : url})
                })
            })

          })
          .then(() => {

            var ravel_query = firebase.database().ref(`users/${currentUser.uid}/ravel_created`);
            ravel_query.once('value', (snapshot) => {
                snapshot.forEach((ravelSnap) => {
                    firebase.database().ref(`users/${currentUser.uid}/ravel_created/${ravelSnap.key}`).update({user_created_photoURL : url})
                })
            })
          })
          .catch((error) => {
            alert('Error updating profile picture at this time...')
          })

    }
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

    var currentUid = firebase.auth().currentUser.uid;

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUid}/userProfile`)
        .once('value', snapshot => {
            dispatch({ type: 'GET_CURRENT_USER_PROFILE',
                       payload: snapshot.val() });
        })
        .catch((error) => {
            alert('Error loading user profile at this time...')
        })
    };
};

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
export const updateCurrentUserProfile = ({ first_name, last_name, bio }) => dispatch => {
    return new Promise ((resolve, reject) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({ first_name, last_name, bio})
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).once('value', snapshot => {
            resolve (snapshot.val ());
            dispatch({ type: 'UPDATE_CURRENT_USER_PROFILE',
                payload: snapshot.val() });
            })
            .catch((error) => {
                reject ('Error updating user profile.');
            });
    });
};

/** CURRENT USER REPORT FUNCTIONS */


// Helper method, do not directly call
export const m_reportRavel = (ravel_uid) => {

  return new Promise ((resolve, reject) => {

    firebase.database().ref(`ravel_report_list/${ravel_uid}`).set(false)
    .then(() => {
        resolve (true);
        //dispatch({type:'REPORT_RAVEL_SUCCESS', payload: true})
    })
    .catch((error) => {
        reject ('Error reporting ravel.');
        //dispatch({type:'REPORT_RAVEL_SUCCESS', payload: false})
    })

  });
}

// Helper method, do not directly call
export const m_reportUser = (user_uid) => {
  return new Promise ((resolve, reject) => {

    firebase.database().ref(`user_report_list/${user_uid}`).set(false)
    .then(() => {
        resolve (true);
        //dispatch({type:'REPORT_USER_SUCCESS', payload: true})
    })
    .catch((error) => {
        reject ('Error reporting user.');
        //dispatch({type:'REPORT_USER_SUCCESS', payload: false})
    })

  });
}

// Helper method, do not directly call
export const m_reportPassage = (ravel_uid, passage_uid) => {
    return new Promise ((resolve, reject) => {

      firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).once('value', (snapshot) => {
        firebase.database().ref(`passage_report_list/${passage_uid}`).set(snapshot.val())
      })
      .then(() => {
          resolve (true);
          //dispatch({type:'REPORT_USER_SUCCESS', payload: true})
      })
      .catch((error) => {
          reject ('Error reporting passage.');
          //dispatch({type:'REPORT_USER_SUCCESS', payload: false})
      })

    });
  }

// Helper method,do not directly call
export const addReportMessage = (reported_uid, report_message) => {
    return new Promise ((resolve,reject) => {
        firebase.database().ref(`report_message_list/${reported_uid}`).set(report_message)
        .then(() => {
            resolve(true)
        })
        .catch((error) => {
            reject('Error adding report message.')
        })
    })
}


/**
 * @param: ravel_uid, report_message
 * @returns:
 * Actions: Attempts to add a report_message under report_message_list and also add
 * the reported ravel to ravel_report_list
 * returns true on success, false on fail.
 */
export const reportRavel = (ravel_uid, report_message) => dispatch => {

    return new Promise ((resolve, reject) => {

        var promises = []

        promises.push(m_reportRavel(ravel_uid))
        promises.push(addReportMessage(ravel_uid, report_message))

        Promise.all(promises)
        .then((results) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })


    });
}

/**
 * @param: user_uid, report_message
 * @returns:
 * Actions: Attempts to add a report_message under report_message_list and also add
 * the reported user to user_report_list.
 * returns true on success, false on fail.
 */
export const reportUser = (user_uid, report_message) => dispatch => {

    return new Promise ((resolve, reject) => {

        var promises = []

        promises.push(m_reportUser(user_uid))
        promises.push(addReportMessage(user_uid, report_message))

        Promise.all(promises)
        .then((results) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })


    });
}

export const reportPassage = (ravel_uid, passage_uid, report_message) => dispatch => {

    return new Promise ((resolve, reject) => {

        var promises = []

        promises.push(m_reportPassage(ravel_uid, passage_uid))
        promises.push(addReportMessage(passage_uid, report_message))

        Promise.all(promises)
        .then((results) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })


    });
}



/** CURRENT USER 'YOUR RAVELS' TAB FUNCTIONS */

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
export const loadNonCreatedCurrentUserRavel = () => dispatch => {
  var currentUid = firebase.auth().currentUser.uid;

  return new Promise ((resolve, reject) => {

    firebase.database().ref(`ravels`).orderByChild(`ravel_participants/${currentUid}`).equalTo(true).once('value', (snapshot) => {
        resolve (snapshot.val());
        dispatch({ type: 'ALL_NON_CREATED_CURR_USER_RAVEL', payload: snapshot.val()})
    })
    .catch((error) => {
        reject ('Error loading user-participating ravels.');
    })

  });
}

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
export const loadInitialCurrentUserCreatedRavel = () => dispatch => {

  var currentUserUid = firebase.auth().currentUser.uid;

  return new Promise ((resolve, reject) => {

    firebase.database().ref(`/users/${currentUserUid}/ravel_created`)
    firebase.database().ref(`/users`).orderByChild(`/${currentUserUid}/ravel_created`).once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        var uid_child = childSnapShot.key;
      })
    })
    .then(() => {
      firebase.database().ref(`/users/${currentUserUid}/ravel_created`)
      .once('value', function(snapshotRavels) {
        resolve (snapshotRavels.val());
        dispatch({ type: 'INITIAL_CREATED_CURR_USER_RAVEL_FETCH', payload: snapshotRavels.val()});
      })
    })
    .catch((error) => {
      reject ('Error loading user-created ravels.');
    })

  });
};

/**
 * @param: nothing
 * @returns:
 * mapStateToProps = state => get_pending_invite_ravel =
 * state.current_user_ravel:
 *      'GET_PENDING_INVITE_RAVEL' : a list of ravels that a user is invited to (pending status)
 *          Each ravel object will have the following fields:
    *          - this.props.get_pending_invite_ravel.enable_comment
                - this.props.get_pending_invite_ravel.enable_voting
                - this.props.get_pending_invite_ravel.m_ravel_participants
                - this.props.get_pending_invite_ravel.passage_length
                - this.props.get_pending_invite_ravel.ravel_category
                - this.props.get_pending_invite_ravel.ravel_concept
                - this.props.get_pending_invite_ravel.ravel_create_date
                - this.props.get_pending_invite_ravel.ravel_number_participants
                - this.props.get_pending_invite_ravel.ravel_participants{}
                - this.props.get_pending_invite_ravel.ravel_points
                - this.props.get_pending_invite_ravel.ravel_title
                - this.props.get_pending_invite_ravel.user_created
                - this.props.get_pending_invite_ravel.user_created_photoURL
 * actions: gets the current user's pending invtted ravels
 *
 */
export const getPendingRavelInvite = () => dispatch => {

    var currentUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`ravels`).orderByChild(`ravel_participants/${currentUid}`).equalTo(false).once('value', (snapshot) => {
          resolve (snapshot.val());
          dispatch({type: 'GET_PENDING_INVITE_RAVEL', payload: snapshot.val()})
        })
        .catch((error) => {
          reject ('Error loading invited ravels.');
        })

    });
}


/** RAVEL FUNCTIONS */

/**
 * @param: nothing
 * @returns:
 * mapStateToProps = state => all_ravel_key =
 * state.master_ravel
 *      'ALL_RAVEL_KEY_FETCH': a list of all ravel uid and it's status (true/false)
 *          - this.props.all_ravel_key => ravel_uid
 */
export const loadAllRavelKey = () => dispatch => {
  return new Promise ((resolve, reject) => {

    firebase.database().ref(`master_ravel_key`)
    .once('value', function(snapshotRavels) {
        resolve (snapshotRavels.val());
        dispatch({ type: 'ALL_RAVEL_KEY_FETCH', payload: snapshotRavels.val()});
    })
    .catch((error) => {
        reject ('Error loading all ravel keys.');
    })

  });

};


/**  FUTURE TODO: HOOK UP NOTIFICATION FUNCTION => sendInviteAlertNotification() when participants are added
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
            - this.props.ravel_meta_data.nodeCount{key:value} // false if none exist
            - this.props.ravel_meta_data.roots{key:value} // false if none exist
            - this.props.ravel_meta_data.level_count // 0 is none exist

 * actions: attempts to create a new ravel and set all of the metadata. Will update the user stats on userProfile
 *          object as well (+1 to stat_ravel_led field). Will then kick off a helper function that will re-calc the ravel_points
 *          field in userProfile object.
 *
 *
 */
export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
                                ravel_concept, m_ravel_participants, ravel_tags }) => dispatch => {

    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_status = true;
    let ravel_create_date = dateformat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    //dateformat(ravel_create_date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    var user_created_photoURL = '';
    var ravel_points = 0;
    var ravel_number_participants = 0;
    var ravel_participants = {};
    m_ravel_participants.forEach(function(elm) { ravel_participants[elm] = false })

    // Update the user's ravel created count
    var ravel_led_stat;
    var ravel_counter = 1;

    var public_tag_set = {};
    ravel_tags.forEach(function(elm) { public_tag_set["public_" + elm] = false })
    var public_ravel_title = '';

    var public_cat_fiction = false;
    var public_cat_nonfiction = false;
    var public_cat_other = false;
    var roots = false;
    var level_count = 0;
    var nodeCount = false;
    var has_child = false;
    var views = 0;

    if (visibility === true) {

        // tags
        ravel_tags.forEach(function(elm) { public_tag_set["public_" + elm] = true })

        // title
        public_ravel_title = "public_" + ravel_title;

        // category
        switch (ravel_category) {
          case 'fiction': {
              public_cat_fiction = true;
              break;
          }
          case 'nonfiction': {
              public_cat_nonfiction = true;
              break;
          }
          case 'other': {
              pubic_cat_other = true
              break;
          }
          default: {
              public_cat_other = true
          }
        }

    }

    return new Promise ((resolve, reject) => {

        var ravel_uid;
        firebase.database().ref(`/users/${user_created}/userProfile/photoURL`).once('value', snapshotPhoto => {

        user_created_photoURL = snapshotPhoto.val()})
        .then(() => {

            firebase.database().ref(`/ravels`)
            .push({ views, roots, nodeCount, user_created, user_created_photoURL, ravel_title, ravel_category, passage_length,
                visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_number_participants,
                ravel_participants, m_ravel_participants, ravel_create_date, public_tag_set, ravel_points, public_ravel_title,
                public_cat_fiction, public_cat_nonfiction, public_cat_other, level_count,  has_child})
            .then(returnKey => {
                ravel_uid = returnKey.getKey();
                firebase.database().ref(`/ravels/${ravel_uid}/ravel_uid`).set(ravel_uid)
                .then(() => {
                    firebase.database().ref(`/users/${currentUser.uid}/ravel_created/${ravel_uid}`).set({ravel_uid, user_created_photoURL, ravel_title, ravel_number_participants, ravel_points});
                })
                
            })
            .then(() => {

                dispatch({ type: 'CREATE_RAVEL',
                           payload:  {ravel_uid} });
            })
            .then(() => {
                firebase.database().ref(`/ravels/${ravel_uid}`).once('value', function (snapshot) {
                    resolve (snapshot.val());
                    dispatch({ type: 'GET_RAVEL_META_DATA', payload: snapshot.val()})
                });
            })
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/userProfile/stat_ravel_led`).once('value', (snapshot) => {

                        ravel_led_stat = snapshot.val();
                })
                .then(() => {
                    firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({
                        stat_ravel_led : ravel_led_stat + ravel_counter,
                      })
                      .then(() => {
                        userRavelPointCalculationHelper(user_created);
                    })
                })
            })
            .then(() => {
                // Add to master_ravel_key
                firebase.database().ref(`/master_ravel_key/${ravel_uid}`).set({
                    ravel_uid: true
                })
            })
        })
        .catch((error) => {
            reject ('Error creating ravel.');
        })

    });

};

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
            - this.props.ravel_meta_data.ravel_participants{key:value}
            - this.props.ravel_meta_data.ravel_points
            - this.props.ravel_meta_data.ravel_title
            - this.props.ravel_meta_data.user_created
            - this.props.ravel_meta_data.user_created_photoURL
            - this.props.ravel_meta_data.nodeCount{key:value} // false if none exist
            - this.props.ravel_meta_data.roots{key:value} // false if none exist
            - this.props.ravel_meta_data.level_count // 0 is none exist

 * actions: attempts to get a particular ravel object's metadata (public/private)
 */
export const getRavelMetaData = (ravel_uid) => dispatch => {

  var currentUserUid = firebase.auth().currentUser.uid;

  return new Promise ((resolve, reject) => {

      calculateNodeCountOnRavelFetch(ravel_uid)
      .then(() => {

          firebase.database().ref(`/ravels/${ravel_uid}`).once('value', function (snapshot) {
              resolve (snapshot.val());
              dispatch({ type: 'GET_RAVEL_META_DATA', payload: snapshot.val()})
          })
      })
      .then(() => {
        // Sets a unique user ID when user views this ravel
        firebase.database().ref(`trending_view_tracker/${ravel_uid}/${currentUserUid}`).set(true)
      })
      .then(() => {
        // Update the view count for unique users
        updateRavelViewCount(ravel_uid)
      })
      .then(() => {
        calculateRavelOptimality(ravel_uid)
      })
      .catch((error) => {
          reject ('Error getting ravel metadata.');
      })

  });
}

export const updateRavelViewCount = (ravel_uid) => {

    var currentUserUid = firebase.auth().currentUser.uid;
    var numCount = 0;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`trending_view_tracker/${ravel_uid}`).once('value', (snapshot) => {
            numCount = snapshot.numChildren();
        })
        .then(() => {

            firebase.database().ref(`ravels/${ravel_uid}/views`).once('value', (snapshotView) => {
                firebase.database().ref(`ravels/${ravel_uid}/views`).set(numCount)

            })
        })
        .then(() => {
            resolve(true)
        })
        .catch((error) => {
            reject('Error')
        })

    });
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
export const getAllRavelParticipantUserProfile = (ravel_uid) => dispatch => {
  return new Promise ((resolve, reject) => {

    var all_participant_of_a_ravel = [];
        firebase.database().ref(`ravels/${ravel_uid}/ravel_participants`).orderByKey().once('value', function(snapshot) {
            snapshot.forEach((childSnapShot) => {
                            if(childSnapShot.val() === true){
                                firebase.database().ref(`/users/${childSnapShot.key}/userProfile`).once('value', function (snapshotChild){
                                    all_participant_of_a_ravel.push(snapshotChild.val());
                                    resolve (all_participant_of_a_ravel);
                                    dispatch( {type: 'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE', payload: all_participant_of_a_ravel})
                                })
                            }})
        })
        .catch((error) => {
            reject ('Error getting user profiles.');
        })

  });
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
export const loadAllPublicRavel = () => dispatch => {
  return new Promise ((resolve, reject) => {

          firebase.database().ref(`ravels`).orderByChild(`visibility`).equalTo(true).once('value', (snapshotPublicRavel) => {
              resolve (snapshotPublicRavel.val());
              dispatch({ type: 'ALL_PUBLIC_RAVEL_FETCH', payload: snapshotPublicRavel.val()});
          })
          .catch((error) => {
              reject ('Error loading all ravels.');
          })

  });
};

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
export const loadAllRavel = () => dispatch => {
  return new Promise ((resolve, reject) => {

    firebase.database().ref(`/ravels/`)
    .once('value', function(snapshotRavels) {
        resolve (snapshotRavels.val());
        dispatch({ type: 'ALL_RAVEL_FETCH', payload: snapshotRavels.val()});
    })
    .catch((error) => {
        reject ('Error loading all ravels.');
    })

  });
};

/** RAVEL UPDATE FUNCTIONS  */

/*
/**
 * @param: ravel_uid
 * @returns: Existing ravel tags; error on failure.
 * actions: Attempts to get a ravel's existing tags.
 */
export const getRavelTags = (ravel_uid) => dispatch => {
  return new Promise ((resolve, reject) => {

    firebase.database().ref(`ravels/${ravel_uid}/public_tag_set`).once('value', (snapshot) => {
      var currentTags = snapshot.val();
      if (!currentTags) {
        resolve ([]);
      }
      else {
        var tags = Object.keys (currentTags).map (tag => {
          return tag.replace (/^(public_)/,"");
        });
        resolve (tags);
      }
    })
    // .then(() => {
    //     // var tags = Object.keys (get_current_tags).map (tag => {
    //     //   return tag.replace (/^(public_)/,"");
    //     // });
    //     // resolve (tags);
    // })
    .catch((error) => {
        reject ('Error retrieving ravel tags.');
    })

  });
}

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
export const updateRavelTag = (ravel_uid, ravel_tags) => dispatch => {
  return new Promise ((resolve, reject) => {

  var get_curr_tags = {};

      firebase.database().ref(`ravels/${ravel_uid}/public_tag_set`).once('value', (snapshot) => {
      get_current_tags = snapshot.val();

      })
      .then(() => {
          var m_tag_set = {};
          ravel_tags.forEach((elm) => { m_tag_set['public_' + elm] = true } );
          var master = {...get_current_tags, ...m_tag_set};
          firebase.database().ref(`ravels/${ravel_uid}`).update({ public_tag_set : master });
          resolve (true);
          dispatch({ type: 'UPDATE_RAVEL_TAG', payload: true})
      })
      .catch((error) => {
          reject ('Error updating ravel tags.');
      })

  });
}

/**  FUTURE TODO: HOOK UP NOTIFICATION FUNCTION => sendInviteAlertNotification() when participant it added
 * @param: ravel uid, a new set of ravel participants[ARRAY]
 * @returns:
 * mapStateToProps = state => ravel_participants_update =
 * state.ravel
 *      'UPDATE_RAVEL_PARTICIPANTS': returns true if successful, false if not.
 *          - this.props.ravel_participants_update
 * actions: attempts to adds the new participants to the list of existing participants for a particular ravel
 *          if the ravel_par_number <= 4.
 */
export const updateRavelParticipant = (ravel_uid, ravel_tags) => dispatch => {
    return new Promise ((resolve, reject) => {

      var get_curr_tags = {};
      var get_curr_tags2 = [];

      // Currently only checks if the ravel_number_participant is greater than 4. If I have time, I will add
      // error check on adding the same uid.
      firebase.database().ref(`ravels/${ravel_uid}/ravel_number_participants`).once('value', (snapshot) => {

          if (snapshot.val() >= 4) {

            reject ('A ravel can\'t have more than 4 participants.');
            dispatch({ type: 'UPDATE_RAVEL_PARTICIPANTS', payload: false})

          } else {
            firebase.database().ref(`ravels/${ravel_uid}/ravel_participants`).once('value', (snapshot) => {

              get_current_tags = snapshot.val();

            })
            .then(() => {

                var m_tag_set = {};
                ravel_tags.forEach((elm) => { m_tag_set[elm] = false } );
                var master = {...get_current_tags, ...m_tag_set};
                firebase.database().ref(`ravels/${ravel_uid}`).update({ ravel_participants : master });

                resolve (true);
                dispatch({ type: 'UPDATE_RAVEL_PARTICIPANTS', payload: true})

            })
            .then(() => {

                firebase.database().ref(`ravels/${ravel_uid}/m_ravel_participants`).once('value', (snapshot) => {
                  get_curr_tags2 = snapshot.val();
                  var master_set = [];
                  if (get_curr_tags2) {
                    master_set = arrayUnique(get_curr_tags2.concat(ravel_tags));
                  } else {
                    master_set = ravel_tags;
                  }
                  firebase.database().ref(`ravels/${ravel_uid}`).update({m_ravel_participants : master_set})
                })

            })
          }
      });

    });

    // remove duplicates
    function arrayUnique(array) {
        var a = array.concat();
        for(var i = 0; i < a.length; ++i) {
            for(var j = i + 1; j < a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

}

/** NOTIFICATION FUNCTIONS */

/**
 * FUTURE TODO: HOOK UP NOTIFICATION FUNCTION => sendInviteAlertNotificationAccept() when participant accepts
 * @param {*} ravel_uid
 * @returns:
 * mapStateToProps = state => ravel_participant =
 * state.notification
 *      'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE' - sets 'true' if accepts, 'false' if something went wrong...
 *          - this.props.ravel_participant_response
 * actions: sets the ravel participant to 'true' if a user accepts the ravel invite. Updates the ravel_number_participant
 *          field in the particular ravel_uid.
 * UI: Invite Accept Button
 */
export const acceptRavelInvite = (ravel_uid) => dispatch => {

    var currentUid = firebase.auth().currentUser.uid;
    var ravel_counter = 1;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`ravels/${ravel_uid}/ravel_participants/${currentUid}`).once('value', (snapshot) => {
            if (snapshot.val() != null && snapshot.val() === false) {
                var stat_ravel_contributed;
                var m_ravel_number_participants;

                firebase.database().ref(`ravels/${ravel_uid}/ravel_participants/${currentUid}`).set(true)
                firebase.database().ref(`/users/${currentUid}/userProfile/stat_ravel_contributed`).once('value', (snapshot) => {
                stat_ravel_contributed = snapshot.val()})
                .then(() => {
                    firebase.database().ref(`/users/${currentUid}/userProfile`).update({
                    stat_ravel_contributed : stat_ravel_contributed + ravel_counter})
                })
                .then(() => {
                    firebase.database().ref(`ravels/${ravel_uid}/ravel_number_participants`).once('value', (snapshotNum) => {
                    m_ravel_number_participants = snapshotNum.val() })
                    .then(() => {
                        firebase.database().ref(`ravels/${ravel_uid}`).update({
                            ravel_number_participants : m_ravel_number_participants + ravel_counter
                        })
                        .then(() => {

                            // Get the user who created the ravel and update their ravel_created card for UI 
                            firebase.database().ref(`ravels/${ravel_uid}/user_created`).once('value', (snapshot) => {

                                firebase.database().ref(`/users/${snapshot.val()}/ravel_created/${ravel_uid}`).update({

                                    ravel_number_participants: m_ravel_number_participants + ravel_counter

                                })
                            })


                        })

                        .then(() => {
                            userRavelPointCalculationHelper(currentUid);
                        })

                    })

                })

                resolve (true);
                dispatch({type: 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE', payload: true})

            } else {
                reject ('Error accepting ravel invitation.');
                dispatch({type: 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE', payload: false})
            }
        })

    });
}

/**
 * @param {*} ravel_uid
 * @returns:
 * mapStateToProps = state => ravel_participant =
 * state.notification
 *      'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE' - sets 'true' if removal of participant from ravel : ravel_participants
 *                                                  + decline was set successfully in db
 *          - this.props.ravel_participant_response
 * actions: sets 'true' if removal of participant from ravel + decline was set successfully in db
 * UI: Invite decline button
 *
 */
export const declineRavelInvite = (ravel_uid) => dispatch => {

    var currentUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`ravels/${ravel_uid}/ravel_participants/${currentUid}`).once('value', (snapshot) => {

            if (snapshot.val() != null && snapshot.val() === false) {

                firebase.database().ref(`ravels/${ravel_uid}/ravel_participants/${currentUid}`).remove()
                .then(() => {
                    resolve (true);
                    dispatch({type: 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE', payload: true})
                })
                .catch((error) => {
                    reject ('Error declining ravel invitation.');
                })
            }
        })

    });
}

/** EXPLORE SCREEN */

// Returns a object with random passage uids based on a user's: ravel_created ravels, ravel particpating ravels
// and public ravels
// Algorithm will first attempt to query in this priority: user_created_ravels, user_participating_ravels, all_public_ravels
// Max ravels queried will be 10. Currently, the number of passages queried back returned max is 30 passages*
//
// If user has no ravels from "My Ravels" tab, function will query 10 public ravels (max)

export const fetchPassageExploreView = () => dispatch => {

  var currentUserUid = firebase.auth().currentUser.uid;
  var array = {}
  var count = 0

  return new Promise ((resolve, reject) => {

    fetchUserCreatedRavelExploreHelper().then((userCreatedResult) => {

      array = {...userCreatedResult}

      fetchUserParticipantRavelExploreHelper().then((userNonCreatedResult) => {

        array = {...array, ...userNonCreatedResult}

        // Query at least 10 random ravels
        var totalCountWithNoPublic = Object.keys(userCreatedResult || []).length + Object.keys(userNonCreatedResult || []).length;
        var countToQueryPublic = 10 - totalCountWithNoPublic;

        if (countToQueryPublic < 1) {
          // Pass in an empty list and the full list
          populatePassageListExploreHelper(array).then((unsortedPassageList) => {

            shuffleList(unsortedPassageList).then((shuffledPassageList) => {

              resolve(shuffledPassageList);
              //dispatch({type: 'SEARCH_RAVEL_BY_TITLE', payload: shuffledPassageList})
            })
          })
        }

        else {
          fetchUserPublicRavelExploreHelper(countToQueryPublic).then((publicRavelResult) => {

            array = {...userCreatedResult, ...userNonCreatedResult, ...publicRavelResult}

            // Pass in an empty list and the full list
            populatePassageListExploreHelper(array).then((unsortedPassageList) => {

              shuffleList(unsortedPassageList).then((shuffledPassageList) => {

                resolve(shuffledPassageList);
                //dispatch({type: 'SEARCH_RAVEL_BY_TITLE', payload: shuffledPassageList})

              })

            })

          })
        }
      })

    })
    .catch(() => {
        reject('Error getting explore view')
    })
  });

};

// Gets a user created ravel list
export const fetchUserCreatedRavelExploreHelper = () => {

    var currentUserUid = firebase.auth().currentUser.uid;
    return new Promise ((resolve, reject) => {

    firebase.database().ref(`/users/${currentUserUid}/ravel_created`).once('value', function(snapshotRavels) {
        if (snapshotRavels.val() === false) {
            resolve({})
        } else {
            resolve (snapshotRavels.val());
        }
    })
    .catch(() => {
        reject(false)
    })


    });
}

// Gets a user's participanting ravels
export const fetchUserParticipantRavelExploreHelper = () => {

    var currentUserUid = firebase.auth().currentUser.uid;
    return new Promise ((resolve, reject) => {

        firebase.database().ref(`ravels`).orderByChild(`ravel_participants/${currentUserUid}`).equalTo(true).once('value', (snapshot) => {

            if(snapshot.exists() === false) {
                resolve({})
            } else {
                resolve (snapshot.val());


            }
          })
          .catch((error) => {
            reject ('Error loading invited ravels.');
          })


    });
}

// Gets a user public ravel
export const fetchUserPublicRavelExploreHelper = (countToQueryPublic) =>  {

    var currentUserUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`/ravels/`).orderByChild("visibility").equalTo(true).limitToLast(countToQueryPublic).once('value', snapshot => {
            if (snapshot.exists() === false) {
                resolve({})
            } else {
                resolve (snapshot.val());

            }

        })
        .catch((error) => {
            reject ('Error searching for ravel.');
        })


    });
}

// Shuffles an object list
export const shuffleList = (array) => {

    return new Promise((resolve,reject) => {

            for (let i = (Object.keys(array).length) - 1; i > 0; i--) {

                var j = i + Math.floor(Math.random() * ((Object.keys(array).length) - i));

                var temp = array[Object.keys(array)[j]];
                array[Object.keys(array)[j]] = array[Object.keys(array)[i]];
                array[Object.keys(array)[i]] = temp;
            }

        resolve(array)
    })
}



export const populatePassageListExploreHelper = (array) =>  {

    var currentUserUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        var unsortPassageList = {};
        var response = [];
        var promises = [];

        Object.keys(array).forEach((elm) => {

            // Get passages from ravels and assign to list.
            promises.push(fetchPassageExploreViewFromEachRavelHelper(elm));

        })

        Promise.all(promises)
            .then((results) => {
                results.forEach((result) => {
                    Object.assign(unsortPassageList, result);
                })

                resolve(unsortPassageList);
            })
            .catch((error) => {
                reject(unsortPassageList);
            })
    })
}


// array = key,value pair of ravel uids
export const fetchPassageExploreViewFromEachRavelHelper = (ravel_uid) =>  {

    var currentUserUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`/passages/${ravel_uid}`).limitToLast(3).once('value', snapshot => {
            if (snapshot.exists() === false) {

                // Empty
                resolve({})
            } else {

                resolve (snapshot.val());

            }

        })
        .catch((error) => {
            reject ('Error searching for ravel.');
        })


    });
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
export const searchUserByName = (first_name) => dispatch => {
    return new Promise ((resolve, reject) => {

        firebase.database().ref(`/users`).orderByChild("userProfile/first_name").equalTo(first_name).once('value', function(snapshot) {
            resolve (snapshot.val());
            dispatch({type : 'SEARCH_USER_FIRST_NAME', payload: snapshot.val()});
        })
        .catch((error) => {
            reject ('Error searching for user.');
        })

    });
}

/**
 * @param: email
 * @returns:
 * mapStateToProps = state => user_email_search =
 * state.search
 *      'SEARCH_USER_FIRST_NAME': a list of userProfile object with the same first name
 *          - this.props.user_email_search.bio
 *          - this.props.user_email_search.first_name
 *          - this.props.user_email_search.last_name
 *          - this.props.user_email_search.photoURL
 *          - this.props.user_email_search.ravel_points
 *          - this.props.user_email_search.stats_passage_written
 *          - this.props.user_email_search.stat_ravel_contributed
 *          - this.props.user_email_search.stat_ravel_led
 *          - this.props.user_email_search.upvotes
 *          - this.props.user_email_search.user_uid
 * actions: filters all user profiles by email
 *
 */
export const searchUserByEmail = (email) => dispatch => {
    return new Promise ((resolve, reject) => {

        firebase.database().ref(`/users`).orderByChild("userProfile/email").equalTo(email).once('value', function(snapshot) {
            resolve (snapshot.val());
            dispatch({type : 'SEARCH_USER_EMAIL', payload: snapshot.val()});
        })
        .catch((error) => {
            reject ('Error searching for user.');
        })

    });
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
export const searchRavelByTag = (tag) => dispatch => {

    return new Promise ((resolve, reject) => {

        tag.forEach((tag) => {
            firebase.database().ref(`/ravels/`).orderByChild(`public_tag_set/${'public_' + tag}`).equalTo(true).once('value', function(snapshot) {
                resolve (snapshot.val());
                dispatch({type : 'SEARCH_RAVEL_BY_TAG', payload: snapshot.val()});
            })
            .catch((error) => {
                reject ('Error searching for ravel.');
            })
        })

    });
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
export const searchRavelByTitle = (title) => dispatch => {

    var public_title = 'public_' + title;

    return new Promise ((resolve, reject) => {
        firebase.database().ref(`/ravels/`).orderByChild("public_ravel_title").equalTo(public_title).once('value', snapshot => {
            resolve (snapshot.val());
            dispatch({type: 'SEARCH_RAVEL_BY_TITLE', payload: snapshot.val()})
        })
        .catch((error) => {
            reject ('Error searching for ravel.');
        })
    });
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
export const searchRavelByCategory = (category) => dispatch => {
    return new Promise ((resolve, reject) => {

        switch (category) {
            case 'fiction': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_fiction").equalTo(true).once('value', snapshot => {
                    resolve (snapshot.val());
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                })
                .catch((error) => {
                    reject ('Error searching for ravels.');
                })
            }
            case 'nonfiction': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_nonfiction").equalTo(true).once('value', snapshot => {
                    resolve (snapshot.val());
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                })
                .catch((error) => {
                    reject ('Error searching for ravels.');
                })
            }
            case 'other': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_other").equalTo(true).once('value', snapshot => {
                    resolve (snapshot.val());
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                })
                .catch((error) => {
                    reject ('Error searching for ravels.');
                })
            }
            default: {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_other").equalTo(true).once('value', snapshot => {
                    resolve (snapshot.val());
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                })
                .catch((error) => {
                    reject ('Error searching for ravels.');
                })
            }
        }

    });
}

/**
 * @param: nothing
 * @returns:
 * resolve - an object list (key,value) of ravels in ASC order (with metadata)
 * actions:
 *
 *
 */
export const searchRavelByTrending = () => dispatch => {

    return new Promise ((resolve, reject) => {
        firebase.database().ref(`ravels`).orderByChild('views').once('value', snapshot => {

            resolve(snapshot.val())
            //dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val().reverse()})

        })
        .catch((error) => {
            reject ('Error searching for ravel.');
        })
    });
}

/** PASSAGE FUNCTIONS */

/**
 *
 *       level: level that the passage is on
 *       parent{}: list of parent_passage_uid
 *       child{}: list of child_passage_uid
 * @param {*} {ravel_uid, passage_title, passage_body}
 * @returns {*}
 *
 * mapStateToProps = state => passage_uid =
 * state.passage
 *              <1> 'CREATE_PASSAGE' - returns the passage_uid that was just created
 *                  - this.props.passage.passage_uid
 *
 * mapStateToProps = state => passage_meta_data =
 * state.passage
 *              <2> 'GET_PASSAGE_META_DATA' - attempts to get the metadata from a passage just created
 *                  - this.props.passage_meta_data.passage_body
 *                  - this.props.passage_meta_data.passage_create_date
 *                  - this.props.passage_meta_data.passage_downvote
 *                  - this.props.passage_meta_data.passage_combined_vote
 *                  - this.props.passage_meta_data.passage_title
 *                  - this.props.passage_meta_data.passage_upvote
 *                  - this.props.passage_meta_data.ravel_title
 *                  - this.props.passage_meta_data.ravel_uid
 *                  - this.props.passage_meta_data.user_created
 *                  - this.props.passage_meta_data.user_created_photoURL
 *                  - this.props.passage_meta_data.level
 *                  - this.props.passage_meta_data.parent{root:true}
 *                  - this.props.passage_meta_data.child{} // false if none , otherwise a key:value list
 *
 * mapStateToProps => state = passage_meta_data_fetch_is_success =
 * state.passage
 *              <3>'ON_GET_PASSAGE_META_DATA_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_meta_data_fetch_is_success
 *
 * actions: Checks if current user is in ravel participant field. Checks if this is the first passage
 *          to be added to this ravel. If so, adds a new initial passage to the db and sets all of the meta data field. Updates the current userProfile : stat_passage_written
 *          field to be +1 what is currently stored. Fires an update function that will re-calc the userProfile : ravel_points field
 *          to reflect these changes. Returns the meta data for the newly added passage.
 */
export const addInitialPassage = ({ravel_uid, passage_title, passage_body}) => dispatch => {

    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_title = '';
    var passage_create_date = dateformat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    var user_created_photoURL = '';
    var passage_upvote = 0;
    var passage_downvote = 0;
    var passage_combined_vote = 0;
    var stat_passage_written;
    var passage_comment = '';
    var level = 1;
    var parent = {root:true};
    var child = false;
    var checkUserCreator = '';
    var optimalityScore = 0;
    var currentPassageOptimality = 0;
    var optimalChild = false;
    var is_banned = false;
    var enable_comment = false;

    return new Promise ((resolve, reject) => {

      checkUserCreatedPassage(ravel_uid).then(valueOfKey => {

        checkUserCreator = valueOfKey
        console.log('Check user creator: ' + checkUserCreator);

        checkParticipantExistRavel(ravel_uid).then(valueOfKey => {

            if (checkUserCreator || valueOfKey) {

                checkRavelHasChild(ravel_uid).then(valueOfKey => {

                    if (valueOfKey) {

                        console.log('ravel has child value' + valueOfKey);
                        alert('Ravel has an initial passage, please use add passage function...');

                    } else {

                        var passage_uid;

                        firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                            m_ravel_title = snapshotPhoto.val();
                        })
                        .then(() => {

                            firebase.database().ref(`/passages/${ravel_uid}`)
                                .push({enable_comment, is_banned, optimalityScore, currentPassageOptimality, optimalChild, parent, child, level, passage_comment, passage_downvote, passage_upvote, passage_combined_vote, user_created, ravel_uid, passage_title, passage_body, passage_create_date, user_created_photoURL, ravel_title })
                                .then(returnKey => {
                                    passage_uid = returnKey.getKey();

                                    // Do something with the passage_uid
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_uid : passage_uid})
                                })
                                .then(() => {
                                    dispatch({ type: 'CREATE_PASSAGE',
                                            payload: {passage_uid} });
                                })
                                .then(() => {
                                    firebase.database().ref(`/users/${user_created}/userProfile/photoURL`).once('value', snapshotPhoto => {
                                            user_created_photoURL = snapshotPhoto.val();
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({user_created_photoURL : user_created_photoURL})
                                    })
                                    firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                                        ravel_title = snapshotPhoto.val();
                                    })

                                    .then(() => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ravel_title : ravel_title})
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/ravels/${ravel_uid}/enable_comment`).once('value', snapshotPhoto => {
                                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({enable_comment : snapshotPhoto.val()})
                                        })

                                    })

                                })
                                .then(() => {
                                    firebase.database().ref(`ravels/${ravel_uid}`).update({has_child : true});
                                })
                                .then(() => {

                                    calculatePassageIndexField(ravel_uid,level,passage_uid).then(passage_index => {

                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_index`).set(passage_index)
                                    })
                                    .then(() => {
                                        addPassageToRavelLevelTree(ravel_uid, level, passage_uid);

                                    })
                                    .then(() => {
                                        addPassageToRavelRootList(ravel_uid, passage_uid);
                                    })
                                    .then(() => {
                                        updateRavelLevelCountOnAddPassage(ravel_uid);
                                    })
                                })

                                .then(() => {
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).once('value', (snapshot) => {
                                        resolve (snapshot.val());
                                        dispatch({type: 'GET_PASSAGE_META_DATA', payload: snapshot.val()})
                                    })
                                })
                                .then(() => {
                                    firebase.database().ref(`users/${user_created}/userProfile/stat_passage_written`).once('value', (snapshot) => {
                                        stat_passage_written = snapshot.val() + 1

                                    })
                                    .then(() => { // Update the number of passages a user has written
                                        firebase.database().ref(`users/${user_created}/userProfile`).update({stat_passage_written : stat_passage_written});
                                    })
                                    .then(() => {
                                        userRavelPointCalculationHelper(user_created);
                                    })
                                })
                                .then(() => {
                                    dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: true})
                                })

                        })
                        .catch(() => {
                            dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                            reject ('Failure adding a new passage.');
                        })

                    }
                })

            } else {
                dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                reject ('Cannot add passage – current user is not a part of this ravel.');
            }
        })

      })

    });
}

// Maybe this function is not needed, if forking, simply update the root{} in the ravel.
// export const setRootPassageOnRavelCreate = (ravel_uid) => {

//     const { currentUser } = firebase.auth();

//     var user_created = currentUser.uid;
//     var passage_create_date = new Date().toLocaleTimeString();
//     var level = 0;
//     var parent = false;
//     var child = false;

//     firebase.database().ref(`/passages/${ravel_uid}/root`)
//         .set({ parent: parent, child: child , level : level , user_created : user_created, passage_create_date: passage_create_date})


// }

/**
 *
 *       level: level that the passage is on
 *       parent{}: list of parent_passage_uid
 *       child{}: list of child_passage_uid
 * @param {*} {ravel_uid, parent_passage_uid, passage_title, passage_body}
 * @returns {*}
 *
 * mapStateToProps = state => passage_uid =
 * state.passage
 *              <1> 'CREATE_PASSAGE' - returns the passage_uid that was just created
 *                  - this.props.passage.passage_uid
 *
 * mapStateToProps = state => passage_meta_data =
 * state.passage
 *              <2> 'GET_PASSAGE_META_DATA' - attempts to get the metadata from a passage just created
 *                  - this.props.passage_meta_data.passage_body
 *                  - this.props.passage_meta_data.passage_create_date
 *                  - this.props.passage_meta_data.passage_downvote
 *                  - this.props.passage_meta_data.passage_combined_vote
 *                  - this.props.passage_meta_data.passage_title
 *                  - this.props.passage_meta_data.passage_upvote
 *                  - this.props.passage_meta_data.ravel_title
 *                  - this.props.passage_meta_data.ravel_uid
 *                  - this.props.passage_meta_data.user_created
 *                  - this.props.passage_meta_data.user_created_photoURL
 *                  - this.props.passage_meta_data.level
 *                  - this.props.passage_meta_data.parent{} // {root:0} if root if parent, otherwise, key:value pair of parent_passage_uids
 *                  - this.props.passage_meta_data.child{} // false if none , otherwise a key:value list
 *                  - this.props.passage_meta_data.optimalityScore
 *                  - this.props.passage_meta_data.currentPassageOptimality
 *                  - this.props.passage_meta_data.optimalChild
 *
 * mapStateToProps => state = passage_meta_data_fetch_is_success =
 * state.passage
 *              <3>'ON_GET_PASSAGE_META_DATA_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_meta_data_fetch_is_success
 *
 * actions: adds a new passage to the db and sets all of the meta data field. Updates the current userProfile : stat_passage_written
 *          field to be +1 what is currently stored. Fires an update function that will re-calc the userProfile : ravel_points field
 *          to reflect these changes. Returns the meta data for the newly added passage.
 */
export const addPassage = ({ravel_uid, parent_passage_uid, passage_title, passage_body}) => dispatch => {

    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_title = '';
    var passage_create_date = dateformat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    var user_created_photoURL = '';
    var passage_upvote = 0;
    var passage_downvote = 0;
    var passage_combined_vote = 0;
    var stat_passage_written;
    var passage_comment = '';
    var level = 0;  // calculate this by function
    var parent = '';  // add parent_passage_uid to this {}
    var children = '';      // update parent_passage_uid children{} to have this new passage_uid
    var checkUserCreator = '';
    var optimalityScore = 0;
    var currentPassageOptimality = 0;
    var optimalChild = false;
    var is_banned = false;
    var enable_comment = false;

    return new Promise ((resolve, reject) => {

      checkUserCreatedPassage(ravel_uid).then(valueOfKey => {

        checkUserCreator = valueOfKey

          checkParticipantExistRavel(ravel_uid).then(valueOfKey => {

            if (checkUserCreator || valueOfKey) {

                checkRavelHasChild(ravel_uid).then(valueOfKey => {
                    if (valueOfKey != true ) {

                        console.log('ravel has child value' + valueOfKey);
                        alert('Ravel does not have initial child, please use initial add passage function...');

                    } else {

                        var passage_uid;

                        firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                            m_ravel_title = snapshotPhoto.val();
                        })
                        .then(() => {
                            firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                                m_ravel_title = snapshotPhoto.val();
                            })
                        })
                        .then(() => {
                            firebase.database().ref(`/passages/${ravel_uid}`)
                                .push({is_banned, enable_comment, optimalityScore, currentPassageOptimality,optimalChild,  level, passage_comment, passage_downvote, passage_upvote, passage_combined_vote, user_created, ravel_uid, passage_title, passage_body, passage_create_date, user_created_photoURL, ravel_title })
                                .then(returnKey => {
                                    passage_uid = returnKey.getKey();

                                    // Do something with the passage_uid
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_uid : passage_uid})
                                })
                                .then(() => {
                                    dispatch({ type: 'CREATE_PASSAGE',
                                            payload: {passage_uid} });
                                })
                                .then(() => {
                                    firebase.database().ref(`/users/${user_created}/userProfile/photoURL`).once('value', snapshotPhoto => {
                                            user_created_photoURL = snapshotPhoto.val();
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({user_created_photoURL : user_created_photoURL})
                                    })
                                    firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                                        ravel_title = snapshotPhoto.val();
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ravel_title : ravel_title})
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ravel_title : ravel_title})
                                    })
                                    .then(() => {
                                        firebase.database().ref(`/ravels/${ravel_uid}/enable_comment`).once('value', snapshotPhoto => {
                                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({enable_comment : snapshotPhoto.val()})
                                        })
                                    })


                                })
                                    .then(() => {
                                        firebase.database().ref(`ravels/${ravel_uid}`).update({has_child : true});
                                    })
                                        .then(() => {
                                        addChildPassageToParentPassage(ravel_uid, parent_passage_uid, passage_uid)

                                    })
                                    .then(() => {
                                        addParentPassageToChildPassage(ravel_uid, parent_passage_uid, passage_uid);
                                    })
                                    .then(() => {

                                        updateAddPassageLevel(ravel_uid, parent_passage_uid, passage_uid).then(valueOfKey => {

                                            var level = valueOfKey;
                                            calculatePassageIndexField(ravel_uid, level, passage_uid).then(passage_index => {
                                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_index`).set(passage_index);
                                            })
                                            .then(() => {
                                                addPassageToRavelLevelTree(ravel_uid, valueOfKey, passage_uid)
                                            })
                                            .then(() => {
                                            updateRavelLevelCountOnAddPassage(ravel_uid);
                                             })


                                        });
                                    })
                                .then(() => {
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).once('value', (snapshot) => {
                                        resolve (snapshot.val());
                                        dispatch({type: 'GET_PASSAGE_META_DATA', payload: snapshot.val()})
                                    })
                                })
                                .then(() => {
                                    firebase.database().ref(`users/${user_created}/userProfile/stat_passage_written`).once('value', (snapshot) => {
                                        stat_passage_written = snapshot.val() + 1

                                    })
                                    .then(() => { // Update the number of passages a user has written
                                        firebase.database().ref(`users/${user_created}/userProfile`).update({stat_passage_written : stat_passage_written});
                                    })
                                    .then(() => {
                                        userRavelPointCalculationHelper(user_created);
                                    })
                                })
                                .then(() => {
                                    dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: true})
                                })

                        })
                        .catch(() => {
                            dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                            reject ('Failure adding a new passage.')
                        })

                    }
                })

            } else {
                dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                reject ('Cannot add passage – Current user is not a part of this ravel.');
            }
        })

      })

    });
}

/**
 *
 * @param {*} {passage_uid, ravel_uid}
 * @returns {*} DISPATCHES

 * mapStateToProps = state => passage_meta_data =
 * state.passage
 *              <1> 'GET_PASSAGE_META_DATA' - attempts to get the metadata from a passage just created
 *                  - this.props.passage_meta_data.passage_body
 *                  - this.props.passage_meta_data.passage_create_date
 *                  - this.props.passage_meta_data.passage_downvote
 *                  - this.props.passage_meta_data.passage_combined_vote
 *                  - this.props.passage_meta_data.passage_title
 *                  - this.props.passage_meta_data.passage_upvote
 *                  - this.props.passage_meta_data.ravel_title
 *                  - this.props.passage_meta_data.ravel_uid
 *                  - this.props.passage_meta_data.user_created
 *                  - this.props.passage_meta_data.user_created_photoURL
 *                  - this.props.passage_meta_data.level
 *                  - this.props.passage_meta_data.parent{} // {root:0} if root if parent, otherwise, key:value pair of parent_passage_uids
 *                  - this.props.passage_meta_data.child{} // false if none , otherwise a key:value list
 *  *               - this.props.passage_meta_data.optimalityScore
 *                  - this.props.passage_meta_data.currentPassageOptimality
 *                  - this.props.passage_meta_data.optimalChild
 *                  - this.props.passage_meta_data.optimalityScore
 *                  - this.props.passage_meta_data.currentPassageOptimality
 *                  - this.props.passage_meta_data.optimalChild
 *
 * mapStateToProps => state = passage_meta_data_fetch_is_success =
 * state.passage
 *              <2>'ON_GET_PASSAGE_META_DATA_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_meta_data_fetch_is_success
 *
 * actions: Attempts to get the metadata for a particular ravel
 */
export const getPassageMetaData = (passage_uid, ravel_uid) => dispatch => {

    var currentUserUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        reCalculateOptimalityScore(passage_uid, ravel_uid).then(valueOfKey => {

        })
        .then(() => {

            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).once('value', (snapshot) => {
                resolve (snapshot.val());
                dispatch({type: 'GET_PASSAGE_META_DATA', payload: snapshot.val()})
            })
            .then(() => {
                // dispatch a success state
                dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: true})
            })

        })

        .catch((error) => {
            // dispatch an error
            dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
            reject ('Error fetching passage metadata.');
        })

    });
}

export const testerPromiseHelper = (ravel_uid,passage_uid,level) => {

    return (dispatch) => {
        calculatePassageIndexField(ravel_uid,passage_uid,level)
        dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: true})
    }


}


/**
 *
 * @param {*} ravel_uid, level, passage_uid
 * @returns {*} promise, returns 'passage_index' field in the format 'level-alphaversion'
 * actions: Attempts to create a new passage index field for a ravel
 */
export const calculatePassageIndexField = (ravel_uid, level, passage_uid) => {

    // Get the level the passage_uid is on
    // Get the number of children currently on the passage's level
    // +1 that number and convert it to alpha

    var numChild = 0;
    var passageNum_Pre_Alpha = 0;
    var nodesAtNextLevel = 0;
    var nextLetterIndex = 0;
    var nextLetters = '';
    var passage_index = '';

    return new Promise((resolve,reject) => {

        firebase.database().ref(`ravel_level_passage/${ravel_uid}/${level}`).once('value', (snapshot) => {

            // If no child exist for that level, default to level-A
            if (snapshot.exists() === false) {

                passage_index = level + '-' + 'A'

            } else {
                nodesAtNextLevel = snapshot.numChildren();
                nextLetterIndex = nodesAtNextLevel + 1;

                // Converts the numeric index to base 26.
                while (nextLetterIndex > 0) {
                    nextLetterIndex--; // 1 -> a, not 0 -> a
                    var remainder = nextLetterIndex % 26;
                    var digit = String.fromCharCode (remainder + 97);
                    nextLetters = nextLetters + digit;
                    nextLetterIndex = (nextLetterIndex - remainder) / 26;
                 }
                // Reverse the string (because we constructed it backwards).
                nextLetters = nextLetters.split ("").reverse ().join ("");

                // Make sure the letters are uppercase.
                nextLetters = nextLetters.toUpperCase ();

                passage_index = level + '-' + nextLetters;
            }

        })
        .then(() => {
            return passage_index;
        })
        .then(() => {
            resolve(passage_index);
        })
        .catch((error) => {
            reject(error);
        })
    })
}



export const checkUserCreatedPassage = (ravel_uid) => {

    return new Promise((resolve, reject) => {
        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`ravels/${ravel_uid}/user_created`).once('value', (snapshot) => {
            if (currentUid === snapshot.val()) {
                valueOfKey = true;
            } else {
                valueOfKey = false;
            }

        })
        .then(() => {
            return valueOfKey;
        })
        .then(() => {
            resolve(valueOfKey);
        })
        .catch((error) => {
            reject(error);
        })
    })
}


/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Checks if current user that is attempting to add new passage is a participant in a particular ravel
 */
export const checkParticipantExistRavel = (ravel_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        firebase.database().ref(`ravels/${ravel_uid}/ravel_participants/${currentUid}`).once('value', (snapshot) => {
            //console.log('ravel uid = ' + ravel_uid);
            //console.log('Current uid = ' + currentUid);
            if (snapshot.val() === true) {
                valueOfKey = true
            }
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}


/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Checks if ravel has initial passage yet.
 */
export const checkRavelHasChild = (ravel_uid) => {

    return new Promise((resolve,reject) => {
        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`ravels/${ravel_uid}/has_child`).orderByKey().once('value', (snapshot) => {

            if (snapshot.val() === true ) {
                valueOfKey = true
            }
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, number of levels a ravel has
 * actions: Checks the level_count of a ravel
 */
export const checkRavelLevel = (ravel_uid) => {

    return new Promise((resolve,reject) => {
        var valueOfKey = 0;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`ravels/${ravel_uid}/level_count`).once('value', (snapshot) => {

            if (snapshot.val() != null ) {
                valueOfKey = snapshot.val()
            }
        })
        .then(() => {
            return valueOfKey;
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to add initial passage to root list
 */
export const addPassageToRavelRootList = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`ravels/${ravel_uid}/roots/${passage_uid}`).set(true)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to add the child passage uid to the parent passage uid 'child{}' field
 */
export const addChildPassageToParentPassage = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`passages/${ravel_uid}/${parent_passage_uid}/child/${passage_uid}`).set(true)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}


/**
 *
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to add the parent passage uid to the child passage uid 'parent{}' field
 */
export const addParentPassageToChildPassage = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/parent/${parent_passage_uid}`).set(true)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}




/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to updates ravel level_count by 1 on addPassage() or addInitialPassage()
 *
 */

export const updateRavelLevelCountOnAddPassage = (ravel_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        var m_level_count = 0;

        // Check to see if adding passage actually introduces a new level
        // we should check the numChildren in ravel_level_passage/m_level_count + 1.
        // If exist, that means there are children, therefore, do not update the ravel level.
        firebase.database().ref(`ravel_level_passage/${ravel_uid}`).once('value', (snapshot) => {

            var numChildLevel = snapshot.numChildren();

            firebase.database().ref(`ravels/${ravel_uid}`).update({level_count : numChildLevel})
        })
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to Add passage takes the parent_passage_uid and +1 the child's
 *
 */
export const updateAddPassageLevel = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = 0;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        var m_level_count = 0;

        firebase.database().ref(`passages/${ravel_uid}/${parent_passage_uid}/level`).once('value', (snapshot) => {
            if ( snapshot.val() != null ) {

                m_level_count = snapshot.val() + 1;
                valueOfKey = snapshot.val() + 1;

            } else {
                alert('Error getting parent passage level at this time...')
            }
        })
        .then(() => {
            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({level : m_level_count})
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Updates child passage_uid to have same level as parent
 *
 */
export const updatePassageLevelOnFork = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = 0;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        var m_level_count = 0;

        firebase.database().ref(`passages/${ravel_uid}/${parent_passage_uid}/level`).once('value', (snapshot) => {
            if ( snapshot.val() != null ) {

                m_level_count = snapshot.val();
                valueOfKey = snapshot.val();

            } else {
                alert('Error getting parent passage level at this time...')
            }
        })
        .then(() => {
            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({level : m_level_count})
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}


/**
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to set a new passage_uid under ravel_level_passsage/${ravel_uid}/${level}/${passage_uid}
 */
export const addPassageToRavelLevelTree = (ravel_uid, level, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`ravel_level_passage/${ravel_uid}/${level}/${passage_uid}`).set(true)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 *
 * @param {*} ravel_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to calculate nodeCount field on getRavelMetaData()
 *
 */
export const calculateNodeCountOnRavelFetch= (ravel_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        var m_level_count = 0;


        firebase.database().ref(`ravels/${ravel_uid}/level_count`).once('value', (snapshot) => {
            m_level_count = snapshot.val()
        })
        .then(() => {

            if (m_level_count <= 0) {

                valueOfKey = true;

            } else {
                var m_nodeCount = [];
                var m_numChildOnLevel = [];


                for( var i = 0; i < m_level_count; i++) {


                    firebase.database().ref(`ravel_level_passage/${ravel_uid}/${i + 1}`).once('value', (snapshot) => {

                        m_numChildOnLevel.push(snapshot.numChildren());

                    })
                    .then(() => {
                        var i = 0;

                        m_numChildOnLevel.forEach(elm => {
                            // frank (04/04/18): Fixed bug that inserted an extra space in the key.
                            // firebase.database().ref(`ravels/${ravel_uid}/nodeCount/${i + 1} `).set(elm);
                            firebase.database().ref(`ravels/${ravel_uid}/nodeCount/${i + 1}`).set(elm);
                            i++;
                        })
                    })


                }

                valueOfKey = true;

            }

        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 * @param {*} ravel_uid, level
 * @returns {*} DISPATCH 'FETCH_ALL_PASSAGE_UID_ON_LEVEL'
 * mapStateToProps => state = passage_uid_level_list
 * state.passages
 *                  <1> FETCH_ALL_PASSAGE_UID_ON_LEVEL - list of passage uids in the form of key,pair : <uid:true>
 *                  this.props.passages.passage_uid_level_list
 *
 * mapStateToProps => state = passage_level_fetch_is_success
 * state.passages
 *                  <2> 'FETCH_ALL_PASSAGE_UID_ON_LEVEL_ON_SUCCESS' - true on success, false on fail
 *
 *
 * actions: Attempts to get a list of passage uids on the passed in level
 */
export const getPassageUidOnLevel = (ravel_uid, level) => dispatch => {

    var currentUid = firebase.auth().currentUser.uid;

    return new Promise ((resolve, reject) => {

        firebase.database().ref(`ravel_level_passage/${ravel_uid}/${level}`).orderByKey().once('value', (snapshot) => {
            resolve (snapshot.val());
            dispatch({ type: 'FETCH_ALL_PASSAGE_UID_ON_LEVEL', payload: snapshot.val()})
        })
        .then(() => {
            dispatch({ type: 'FETCH_ALL_PASSAGE_UID_ON_LEVEL_ON_SUCCESS', payload: true})
        })
        .catch((error) => {
            dispatch({ type: 'FETCH_ALL_PASSAGE_UID_ON_LEVEL_ON_SUCCESS', payload: false})
            reject ('Error loading passages at level ' + level + '.');
        })

    });
}


/**
 * Forking means you add all parent{} passage_uid inside of parent_passage_uid into the new passage_uid child{}
 * @param {*} Object of vars - {ravel_uid, parent_passage_uid, passage_title, passage_body}
 * @returns {*} DISPATCHES
 *
 * mapStateToProps = state => passage_uid =
 * state.passage
 *              <1> 'CREATE_PASSAGE' - returns the passage_uid that was just created
 *                  - this.props.passage.passage_uid
 *
 * mapStateToProps = state => passage_meta_data =
 * state.passage
 *              <2> 'GET_PASSAGE_META_DATA' - attempts to get the metadata from a passage just created
 *                  - this.props.passage_meta_data.passage_body
 *                  - this.props.passage_meta_data.passage_create_date
 *                  - this.props.passage_meta_data.passage_downvote
 *                  - this.props.passage_meta_data.passage_combined_vote
 *                  - this.props.passage_meta_data.passage_title
 *                  - this.props.passage_meta_data.passage_upvote
 *                  - this.props.passage_meta_data.ravel_title
 *                  - this.props.passage_meta_data.ravel_uid
 *                  - this.props.passage_meta_data.user_created
 *                  - this.props.passage_meta_data.user_created_photoURL
 *                  - this.props.passage_meta_data.level
 *                  - this.props.passage_meta_data.parent{} // {root:0} if root if parent, otherwise, key:value pair of parent_passage_uids
 *                  - this.props.passage_meta_data.child{} // false if none, otherwise a key:value list
 *                  - this.props.passage_meta_data.optimalityScore
 *                  - this.props.passage_meta_data.currentPassageOptimality
 *                  - this.props.passage_meta_data.optimalChild
 *
 * mapStateToProps => state = passage_meta_data_fetch_is_success =
 * state.passage
 *              <3>'ON_GET_PASSAGE_META_DATA_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_meta_data_fetch_is_success
 *
 * actions: Attempts to add a new passage to the db and sets all of the meta data field. Updates the current userProfile : stat_passage_written
 *          field to be +1 what is currently stored. Fires an update function that will re-calc the userProfile : ravel_points field
 *          to reflect these changes. Returns the meta data for the newly added passage where the newly created passage_uid: parent{} has
 *          all of parent_passage_uid:parent{}.
 */
export const forkPassage = ({ravel_uid, parent_passage_uid, passage_title, passage_body}) => dispatch => {

    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_title = '';
    var passage_create_date = dateformat(new Date(), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    var user_created_photoURL = '';
    var passage_upvote = 0;
    var passage_downvote = 0;
    var passage_combined_vote = 0;
    var stat_passage_written;
    var passage_comment = '';
    var level = 0;  // calculate this by function
    var parent = '';  // add parent_passage_uid to this {}
    var children = '';      // update parent_passage_uid children{} to have this new passage_uid
    var checkUserCreator = '';
    var optimalityScore = 0;
    var currentPassageOptimality = 0;
    var optimalChild = false;
    var enable_comment = false;
    var is_banned = false;

    return new Promise ((resolve, reject) => {

      checkUserCreatedPassage(ravel_uid).then(valueOfKey => {

        checkUserCreator = valueOfKey

        checkParticipantExistRavel(ravel_uid).then(valueOfKey => {

            if (checkUserCreator || valueOfKey) {

                    var passage_uid;

                    firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                        m_ravel_title = snapshotPhoto.val();
                    })
                    .then(() => {
                        firebase.database().ref(`/passages/${ravel_uid}`)
                                .push({enable_comment, is_banned, optimalityScore, currentPassageOptimality, optimalChild, level, passage_comment, passage_downvote, passage_upvote, passage_combined_vote, user_created, ravel_uid, passage_title, passage_body, passage_create_date, user_created_photoURL, ravel_title })
                                .then(returnKey => {
                                    passage_uid = returnKey.getKey();

                                    // Do something with the passage_uid
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_uid : passage_uid})
                                })
                                .then(() => {
                                    dispatch({ type: 'CREATE_PASSAGE',
                                            payload: {passage_uid} });
                                })
                                .then(() => {
                                firebase.database().ref(`/users/${user_created}/userProfile/photoURL`).once('value', snapshotPhoto => {
                                        user_created_photoURL = snapshotPhoto.val();
                                })
                                .then(() => {
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({user_created_photoURL : user_created_photoURL})
                                })
                                firebase.database().ref(`/ravels/${ravel_uid}/ravel_title`).once('value', snapshotPhoto => {
                                    ravel_title = snapshotPhoto.val();
                                })
                                .then(() => {
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ravel_title : ravel_title})
                                })
                                .then(() => {
                                    firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ravel_title : ravel_title})
                                })
                                .then(() => {
                                    firebase.database().ref(`/ravels/${ravel_uid}/enable_comment`).once('value', snapshotPhoto => {
                                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({enable_comment : snapshotPhoto.val()})
                                    })
                                })

                                })
                                .then(() => {
                                    addAllParentPassageToChildPassageOnFork(ravel_uid, parent_passage_uid, passage_uid);
                                })
                                .then(() => {
                                    addAllChildPassageToParentPassageOnFork(ravel_uid, parent_passage_uid, passage_uid);
                                })
                                .then(() => {

                                    updatePassageLevelOnFork(ravel_uid, parent_passage_uid, passage_uid).then(valueOfKey => {

                                        var level = valueOfKey;

                                        calculatePassageIndexField(ravel_uid, level, passage_uid).then(passage_index => {
                                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_index`).set(passage_index);
                                        })
                                        .then(() => {
                                            addPassageToRavelLevelTree(ravel_uid, valueOfKey, passage_uid)
                                        })
                                        .then(() => {
                                            if (level === 1 ) {

                                                // add to roots object
                                                firebase.database().ref(`/ravels/${ravel_uid}/roots/${passage_uid}`).set(true);

                                            }
                                        })


                                    });
                                })
                            .then(() => {
                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).once('value', (snapshot) => {
                                    resolve (snapshot.val());
                                    dispatch({type: 'GET_PASSAGE_META_DATA', payload: snapshot.val()})
                                })
                            })
                            .then(() => {
                                firebase.database().ref(`users/${user_created}/userProfile/stat_passage_written`).once('value', (snapshot) => {
                                    stat_passage_written = snapshot.val() + 1

                                })
                                .then(() => { // Update the number of passages a user has written
                                    firebase.database().ref(`users/${user_created}/userProfile`).update({stat_passage_written : stat_passage_written});
                                })
                                .then(() => {
                                    userRavelPointCalculationHelper(user_created);
                                })
                            })
                            .then(() => {
                                dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: true})
                            })

                    })
                    .catch(() => {
                        dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                        reject ('Error adding a passage.');
                    })

                } else {
                    dispatch({type:'ON_GET_PASSAGE_META_DATA_SUCCESS', payload: false})
                    reject ('Error: User is not a participant in this ravel.');
                }
            })
        })
    });
}

/**
 *
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to add all parent{} from parent_passage_uid to the child passage uid 'parent{}' field
 */
export const addAllParentPassageToChildPassageOnFork = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        var p;

        firebase.database().ref(`passages/${ravel_uid}/${parent_passage_uid}/parent`).once('value', (snapshot) => {
            p = snapshot.val();
            valueOfKey = true;

            snapshot.forEach((elm) => {
                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/parent/${elm.key}`).set(true)
            })
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

/**
 * // Get the list of `parent` uids in parent_passage_uid and set passage_uid to it.
 * @param {*} ravel_uid, parent_passage_uid, passage_uid
 * @returns {*} promise, true on success, false on fail
 * actions: Attempts to add all parent{} from parent_passage_uid to the child passage uid 'parent{}' field
 */
export const addAllChildPassageToParentPassageOnFork = (ravel_uid, parent_passage_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        var p;

        firebase.database().ref(`passages/${ravel_uid}/${parent_passage_uid}/parent`).once('value', (snapshot) => {
            valueOfKey = true;
            snapshot.forEach((elm) => {
                firebase.database().ref(`passages/${ravel_uid}/${elm.key}/child/${passage_uid}`).set(true)

            })
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })

    })

}

/**
 *
 * @param {*} ravel_uid, Object of vars {ravel_uid, parent_passage_uid, child_passage_uid}
 *            parent_passage_uid = passage you are merging from
 *            child_passage_uid = passage you are merging to
 * @returns {*} dispatch ON_MERGE_SUCCESS
 * mapStateToProps => state = passage_merge_is_success =
 * state.passage
 *              <1>'ON_MERGE_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_merge_is_success
 *
 * actions: Merging means to merge two passages together. The parent_passage_uid is the initial clicked passage.
   The child_passage is the passage that will suceed the parent.
   Go to parent_passage_uid: child{} and add child_passage_uid to it.
   Go to child_passage_uid:parent and add parent_passage_uid to it.
 */
export const mergeTwoPassage = ({ravel_uid, parent_passage_uid, child_passage_uid}) => dispatch => {

  var checkUserCreator = '';

  return new Promise ((resolve, reject) => {

    checkUserCreatedPassage(ravel_uid).then(valueOfKey => {

      checkUserCreator = valueOfKey

      checkParticipantExistRavel(ravel_uid).then(valueOfKey => {

        if (checkUserCreator || valueOfKey) {

          addChildPassageToParentPassage(ravel_uid, parent_passage_uid, child_passage_uid)
          .then(() => {
              addParentPassageToChildPassage(ravel_uid, parent_passage_uid, child_passage_uid);
          })
          .then(() => {
              resolve (true);
              dispatch({type:'ON_MERGE_SUCCESS', payload: true})
          })
          .catch(() => {
              dispatch({type:'ON_MERGE_SUCCESS', payload: false})
              reject ('Error merging passage.')
          })

          } else {
              dispatch({type:'ON_MERGE_SUCCESS', payload: false})
              reject ('Error merging passage: Current user is not a participant in this ravel.');
          }

      })

    })

  });
}

/**
 *
 * @param {*} ravel_uid, passage_uid
 * @returns {*} dispatch ON_VOTE_SUCCESS
 * mapStateToProps => state = passage_vote_is_success =
 * state.passage
 *              <1>'ON_VOTE_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_vote_is_success
 *
 * actions: Checks to see if ravel has voting enabled. If so, updates passage_uid: passage_upvote to be +1.
 * Then, updates the user that created the passage_uid userProfile: upvotes field.
 */
export const upVotePassage = (ravel_uid, passage_uid) => dispatch => {

    var upvotes;
    var passage_creator_uid;
    var downvote;

    return new Promise ((resolve, reject) => {

        checkRavelEnabledVoting(ravel_uid, passage_uid).then(valueOfKey => {

            if (valueOfKey) {

                checkUserVoteTrackerHelper(ravel_uid, passage_uid).then(valueOfKey => {

                    //console.log('Before checking vote tracker value: ' + valueOfKey)

                    // If the value in track_user_vote is true, that means the user has upvoted. Do nothing because
                    // user is trying to upvote again
                    if (valueOfKey) {
                        // Ask Frank what he wants set back
                        reject ('Invalid upvote');
                        dispatch({type: 'ON_VOTE_SUCCESS', payload: false})

                    // Else, if the user value if false, that means they have downvoted before and now that are
                    // trying to upvote. Set their flag to 'novote'
                    } else if(valueOfKey === false) {

                        //console.log('Inside false')

                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                            upvotes = snapshot.val() + 1
                        })
                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {

                            downvote = snapshot.val()
                        })
                        .then(() => {
                            var tot = upvotes + downvote;
                            //console.log('total vote: ' + tot)
                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_upvote : upvotes, passage_combined_vote: tot});
                        })
                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                passage_creator_uid = snapshot.val();
                            })
                            .then(() => {
                                firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                            })
                            .then(() => {
                                userRavelPointCalculationHelper(passage_creator_uid);
                            })
                            .then(() => {

                                userNoVoteTrackerHelper(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                reCalculateOptimalityScore(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                //console.log('Done in VOTINGGG')
                                resolve (true);
                                dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                            })
                        })
                      // User is in a novote state, set their flag to 'true'
                    } else if (valueOfKey === 'novote') {

                        //console.log('Inside false')

                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                            upvotes = snapshot.val() + 1
                        })
                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {

                            downvote = snapshot.val()
                        })
                        .then(() => {
                            var tot = upvotes + downvote;
                            //console.log('total vote: ' + tot)
                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_upvote : upvotes, passage_combined_vote: tot});
                        })
                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                passage_creator_uid = snapshot.val();
                            })
                            .then(() => {
                                firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                            })
                            .then(() => {
                                userRavelPointCalculationHelper(passage_creator_uid);
                            })
                            .then(() => {

                                userUpVoteTrackerHelper(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                reCalculateOptimalityScore(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                //console.log('Done in VOTINGGG')
                                resolve (true);
                                dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                            })
                        })
                    }
                    // User is not in the list, flag to 'true'
                    else {

                        // Add them to upvote tracker list

                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                                upvotes = snapshot.val() + 1
                            })
                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {

                                downvote = snapshot.val()
                            })
                            .then(() => {
                                var tot = upvotes + downvote;
                                //console.log('total vote: ' + tot)

                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_upvote : upvotes, passage_combined_vote: tot});
                            })
                            .then(() => {
                                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                    passage_creator_uid = snapshot.val();
                                })
                                .then(() => {
                                    firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                                })
                                .then(() => {
                                    userRavelPointCalculationHelper(passage_creator_uid);
                                })
                                .then(() => {

                                    userUpVoteTrackerHelper(ravel_uid, passage_uid);
                                })
                                .then(() => {
                                    reCalculateOptimalityScore(ravel_uid, passage_uid);
                                })
                                .then(() => {

                                    //console.log('Done in VOTINGGG')
                                    resolve (true);
                                    dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                                })
                            })

                    }
                })

            } else {
                dispatch({type: 'ON_VOTE_SUCCESS', payload: false})
                reject ('This ravel does not have voting enabled.');
            }

        })
    });
}

/**
 *
 * @param {*} ravel_uid, passage_uid
 * @returns {*} dispatch ON_VOTE_SUCCESS
 * mapStateToProps => state = passage_vote_is_success =
 * state.passage
 *              <1>'ON_VOTE_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_vote_is_success
 *
 * actions: Updates the passage_uid/passage_combined_vote field by decrementing the value by one.
 *          Updates the user created userProfile/upvotes field by decrementing it by one.
 *          Updates the userProfile/ravel_points field by re-calculating it due to decrement
 *          Updates passage_uid/passage_downvote field by decrementing it by one
 */
export const downVotePassage = (ravel_uid, passage_uid) => dispatch => {

    var total_votes;
    var passage_creator_uid;
    var user_uid;
    var m_down_votes;
    var upvotes;
    var downvote;

    return new Promise ((resolve, reject) => {

        checkRavelEnabledVoting(ravel_uid, passage_uid).then(valueOfKey => {

            if (valueOfKey) {

                checkUserVoteTrackerHelper(ravel_uid, passage_uid).then(valueOfKey => {

                    // User has already downvoted and attempting to downvote again
                    // do nothing
                    if (valueOfKey === false) {
                        //console.log('After checking vote tracker value: ' + valueOfKey)
                        // Add return value for Frank to know user has already downvoted and is attempting to re-downvote
                        reject ('Invalid downvote.');
                        dispatch({type: 'ON_VOTE_SUCCESS', payload: false})
                    // Else, user upvoted before and is now trying to downvote. Flag as 'novote'
                    } else if (valueOfKey) {

                        //console.log('After checking vote tracker value: ' + valueOfKey)

                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                            upvotes = snapshot.val();
                        })
                        .then(() => {

                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {

                                downvote = snapshot.val() - 1;
                            })
                            .then(() => {
                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_downvote : downvote, passage_combined_vote: (upvotes + downvote)});
                            })

                        })

                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                passage_creator_uid = snapshot.val();
                                user_uid = snapshot.val()
                            })
                            .then(() => {
                                firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                            })
                            .then(() => {
                                userRavelPointCalculationHelper(passage_creator_uid);
                            })
                            // .then(() => {
                            //     downVotePassageHelper(ravel_uid, passage_uid);
                            // })
                            .then(() => {
                                userNoVoteTrackerHelper(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                reCalculateOptimalityScore(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                resolve (true);
                                dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                            })
                        })
                    // Else, user is in 'novote' state and is trying to downvote. Flag to 'false'
                    } else if (valueOfKey === 'novote') {

                        //console.log('After checking vote tracker value: ' + valueOfKey)

                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                            upvotes = snapshot.val();
                        })
                        .then(() => {

                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {

                                downvote = snapshot.val() - 1;
                            })
                            .then(() => {
                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_downvote : downvote, passage_combined_vote: (upvotes + downvote)});
                            })

                        })

                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                passage_creator_uid = snapshot.val();
                                user_uid = snapshot.val()
                            })
                            .then(() => {
                                firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                            })
                            .then(() => {
                                userRavelPointCalculationHelper(passage_creator_uid);
                            })
                            // .then(() => {
                            //     downVotePassageHelper(ravel_uid, passage_uid);
                            // })
                            .then(() => {
                                userDownVoteTrackerHelper(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                reCalculateOptimalityScore(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                resolve (true);
                                dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                            })
                        })
                    }
                    // User never voting, flag to 'false'
                    else {

                        // First time downvoting, add them to tracker downvote list
                        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {

                            upvotes = snapshot.val();

                        })
                        .then(() => {

                            firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {
                                //console.log('down vote in.....' + snapshot.val())
                                downvote = (snapshot.val() - 1);
                            })
                            .then(() => {
                                //console.log('up vote + down vote in downvot' + (upvotes + downvote))
                                firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({passage_downvote : downvote, passage_combined_vote: (upvotes + downvote)});
                            })

                        })

                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/user_created`).once('value', (snapshot) => {
                                passage_creator_uid = snapshot.val();
                                user_uid = snapshot.val()
                            })
                            .then(() => {
                                firebase.database().ref(`users/${passage_creator_uid}/userProfile`).update({upvotes : (upvotes + downvote)})

                            })
                            .then(() => {
                                userRavelPointCalculationHelper(passage_creator_uid);
                            })
                            .then(() => {
                                userDownVoteTrackerHelper(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                reCalculateOptimalityScore(ravel_uid, passage_uid);
                            })
                            .then(() => {
                                resolve (true);
                                dispatch({type: 'ON_VOTE_SUCCESS', payload: true})
                            })
                        })
                    }
                })


            } else {
                dispatch({type: 'ON_VOTE_SUCCESS', payload: false})
                reject ('This ravel does not have voting enabled.');
            }
        })
    });

}

/**
 *
 * @param {*} passage_uid
 * @returns {*} nothing
 * actions: function that updates the passage_downvote field for stats purposes
 */
export const downVotePassageHelper = (ravel_uid, passage_uid) => {

    var m_down_votes;

     firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {
         m_down_votes = snapshot.val() - 1
     })
     .then(() => {
         firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}`).update({ passage_downvote : m_down_votes})
     })



}



export const userUpVoteTrackerHelper = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`track_user_vote/${ravel_uid}/${passage_uid}/${currentUid}`).set(true)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

export const checkUserVoteTrackerHelper = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`track_user_vote/${ravel_uid}/${passage_uid}/${currentUid}`).once('value', (snapshot) => {

            if (snapshot.val() === true) {
                //console.log('I am in if statement' + snapshot.val())
                // User has upvoted already
                valueOfKey = true;

            } else if (snapshot.val() === false) {

                // User has downvoted already
                valueOfKey = false;

            } else {
                valueOfKey = 0;
                // User has never voted before

            }

            //console.log('Snapshot value:' + snapshot.val())
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })
    })
}


export const userDownVoteTrackerHelper = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        //console.log('i am here')
        firebase.database().ref(`track_user_vote/${ravel_uid}/${passage_uid}/${currentUid}`).set(false)
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })



    })
}

export const userNoVoteTrackerHelper = (ravel_uid, passage_uid) => {
  return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;
        //console.log('i am here')
        firebase.database().ref(`track_user_vote/${ravel_uid}/${passage_uid}/${currentUid}`).set('novote')
        .then(() => {
            valueOfKey = true;
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })

    })
}

export const checkUserVote = (ravel_uid, passage_uid) => dispatch => {

    return new Promise((resolve,reject) => {

        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`track_user_vote/${ravel_uid}/${passage_uid}/${currentUid}`).once('value', (snapshot) => {

            if (snapshot.val() === true) {
                //console.log('I am in if statement' + snapshot.val())
                // User has upvoted already
                valueOfKey = true;

            } else if (snapshot.val() === false) {

                // User has downvoted already
                valueOfKey = false;

            } else {
                valueOfKey = 0;
                // User has never voted before

            }

            //console.log('Snapshot value:' + snapshot.val())
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })

    })
}


/**
 *
 * @param {*} ravel_uid, passage_uid, comment_body
 * @returns {*} dispatches GET_PASSAGE_COMMENT
 * mapStateToProps = state => passage_comment =
 * state.passage
 *              <1> 'GET_PASSAGE_COMMENT' - returns a list of passage comments
 *                  - this.props.passage.passage_comment
 *
 * mapStateToProps = state => passage_comment_fetch_is_success =
 * state.passage
 *              <2> 'ON_GET_PASSAGE_COMMENT_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_comment_fetch_is_success
 *
 * actions: Check if a ravel has comments_enabled, if so continute, else alert user and return.
 *          If comments are enabled, push a new comment to path ${passage_uid}/passage_comment with the user's metadata
 *          Returns back a state change with the passage_uid/passage_comment list
 */
export const writePassageComment = (ravel_uid, passage_uid, comment_body) => dispatch => {

    return new Promise ((resolve, reject) => {
        var m_first_name = '';
        var m_photo_URL = '';

        checkRavelEnabledComment(ravel_uid, passage_uid).then(valueOfKey => {
            if (valueOfKey) {
                var currentUid = firebase.auth().currentUser.uid;
                firebase.database().ref(`users/${currentUid}/userProfile/first_name`).once('value', (snapshot) => {
                    m_first_name = snapshot.val();
                })
                .then(() => {
                    firebase.database().ref(`users/${currentUid}/userProfile/photoURL`).once('value', (snapshot) => {
                        m_photo_URL = snapshot.val();
                    })
                })
                .then(() => {
                    let comment = {
                        passage_uid : passage_uid,
                        user_photoURL : m_photo_URL,
                        user_first_name : m_first_name,
                        comment_body : comment_body,
                        time: new Date().toLocaleTimeString(),
                        user_uid : currentUid
                    }

                    const newCommentRef = firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_comment`).push();
                    comment.key = newCommentRef.key;
                    newCommentRef.set(comment);
                    firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_comment`).orderByChild('timestamp').once('value', (snapshot )=> {
                        resolve (snapshot.val());
                        dispatch({type: 'GET_PASSAGE_COMMENT', payload: snapshot.val()})
                    })

                })
                .then(() => {
                    dispatch({type: 'ON_GET_PASSAGE_COMMENT_SUCCESS', payload: true})
                })


            } else {
                dispatch({type: 'ON_GET_PASSAGE_COMMENT_SUCCESS', payload: false})
                reject ('This ravel does not have comments enabled.');
            }
        })

    });
}


/**
 *
 * @param {*} ravel_uid, passage_uid, comment_key
 * @returns {*} dispatches REMOVE_PASSAGE_COMMENT_IS_SUCCESS
 * mapStateToProps = state => passage_remove_comment_is_succcess =
 * state.passage
 *              <1> 'REMOVE_PASSAGE_COMMENT_IS_SUCCESS' - returns a list of passage comments
 *                  - this.props.passage.passage_remove_comment_is_succcess
 *
 * actions: Attempts to remove a passage comment. Checks if ravel has comments_enabaled. If so, remove the comment
 *          associated with param@comment_key.
 *
 */
export const deletePassageComment = (ravel_uid, passage_uid, comment_key) => dispatch => {

    return new Promise ((resolve, reject) => {
        var currentUid = firebase.auth().currentUser.uid;
        var m_current_uid = '';

        checkRavelEnabledComment(ravel_uid, passage_uid).then(valueOfKey => {
            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_comment/${comment_key}/user_uid`).once('value', (snapshot) => {
                m_current_uid = snapshot.val()})
                .then(() => {
                    if (valueOfKey && (m_current_uid === currentUid)) {

                        firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_comment/${comment_key}`).remove()
                        resolve (true);
                        dispatch({type: 'REMOVE_PASSAGE_COMMENT_IS_SUCCESS', payload: true})

                    } else {
                        dispatch({type: 'REMOVE_PASSAGE_COMMENT_IS_SUCCESS', payload: false})
                        reject ('Failed to remove comment. Either you do not have permission, or comments are disabled.');
                    }
                })
        })

    });

}

/**
 *
 * @param {*} ravel_uid, passage_uid
 * @returns {*} dispatches GET_PASSAGE_COMMENT
 * mapStateToProps = state => passage_comment =
 * state.passage
 *              <1> 'GET_PASSAGE_COMMENT' - returns a list of passage comments
 *                  - this.props.passage.passage_comment
 * mapStateToProps = state => passage_comment_fetch_is_success =
 * state.passage
 *              <2> 'ON_GET_PASSAGE_COMMENT_SUCCESS' - returns true on success, false on fail
 *                  - this.props.passage.passage_comment_fetch_is_success
 *
 * actions: Check if a ravel has comments_enabled, if so continute, else alert user and return.
 *          If comments are enabled, returns back a state change with the passage_uid/passage_comment list
 */
export const getPassageComment = (ravel_uid, passage_uid) => dispatch => {
    return new Promise ((resolve, reject) => {
        checkRavelEnabledComment(ravel_uid, passage_uid).then(valueOfKey => {
            if (valueOfKey) {

                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_comment`).orderByChild('timestamp').once('value', (snapshot) => {
                    resolve (snapshot.val());
                    dispatch({type: 'GET_PASSAGE_COMMENT', payload: snapshot.val()})
                })
                .then(() => {
                    dispatch({type: 'ON_GET_PASSAGE_COMMENT_SUCCESS', payload: true})
                })
            } else {
                dispatch({type: 'ON_GET_PASSAGE_COMMENT_SUCCESS', payload: false})
                reject ('Failed to fetch comments.');
            }
        })
    });
}


/** EXPLORE SCREEN FUNCTIONS */

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
// Gets a list of random passages associated to a ravel that is in public_list
export const loadPassageExplore = () => {

    var currentUserUid = firebase.auth().currentUser.uid;
    var listOfPublicRavel = {};
    var randomElm;

    return (dispatch) => {
        firebase.database().ref(`ravels`).orderByChild(`visibility`).equalTo(true).once('value', (snapshotPublicRavel) => {
            listOfPublicRavel = snapshotPublicRavel.val();
            //console.log('snapshotPublicRavel elm = ' + snapshotPublicRavel.val())
            //console.log('listOfPublicRavel elm = ' + listOfPublicRavel.val())
        })
        .then(() => {
            randomElm = listOfPublicRavel[Math.floor(Math.random() * listOfPublicRavel.length)]
        })

        //console.log('random elm = ' + randomElm)



    };
};


/** HELPER FUNCTION  */

/**
 * @param {*} user_uid
 * @returns {*} nothing
 * actions: Updates the ravel_points. This is a helper function that is called when a user:
 * creates a ravel, creates a passage, a passage they wrote become upvoted/downvoted, a user accepts
 * a ravel invite
 */
export const userRavelPointCalculationHelper = (user_uid) => {
    /**
     * ravel_points: close
       stat_passage_written:
       stat_ravel_contributed:
       stat_ravel_led:
       up_votes:
     */
    //console.log('inside user ravel point calc')
     /** ravel_points = f(userProfile) = stat_ravel_led + stat_ravel_contributed + stat_passage_written + up_votes*/
     var m_stat_ravel_led;
     var m_stat_ravel_contributed;
     var m_stat_passage_written;
     var m_upvotes;
     var m_ravel_points;

         firebase.database().ref(`users/${user_uid}/userProfile/stat_ravel_led`).once('value', (snapshot) => {
             m_stat_ravel_led = snapshot.val()
         })
         .then(() => {
            firebase.database().ref(`users/${user_uid}/userProfile/stat_ravel_contributed`).once('value', (snapshot) => {
                m_stat_ravel_contributed = snapshot.val()
            })
            .then(() => {
                firebase.database().ref(`users/${user_uid}/userProfile/stat_passage_written`).once('value', (snapshot) => {
                    m_stat_passage_written = snapshot.val()
                })
                .then(() => {
                    firebase.database().ref(`users/${user_uid}/userProfile/upvotes`).once('value', (snapshot) => {
                        m_upvotes = snapshot.val()
                    })
                    .then(() => {
                        m_ravel_points = m_stat_ravel_led + m_stat_ravel_contributed + m_stat_passage_written +
                                        m_upvotes;
                        firebase.database().ref(`users/${user_uid}/userProfile`).update({ravel_points : m_ravel_points})
                    })

                })
            })
         })

}

export const reCalculateCurrentPassagesOptimalityScore = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {
     var valueOfKey = false;
     var m_passage_upvote;
     var m_passage_downvote;
     var m_currentPassageOptimality;


         firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_upvote`).once('value', (snapshot) => {
            m_passage_upvote = snapshot.val()
         })
         .then(() => {
            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/passage_downvote`).once('value', (snapshot) => {
                m_passage_downvote = snapshot.val()
            })
            .then(() => {
                m_currentPassageOptimality = (m_passage_upvote + 1.5*m_passage_downvote)
                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update( {currentPassageOptimality : m_currentPassageOptimality})

            })
         })
         .then(() => {
            valueOfKey = true
        })
            .then(() => {
                //console.log('value of value of key inside recalcu' + valueOfKey)
                return valueOfKey
            })
            .then((valueOfKey) => {
                resolve(valueOfKey)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

export const getOptimality = (ravel_uid, elm_key) => {


    return new Promise((resolve,reject) => {
     var valueOfKey = 0;
     //console.log('ravel uid' + ravel_uid)
     //console.log('passage uid' + elm_key)

         firebase.database().ref(`passages/${ravel_uid}/${elm_key}/currentPassageOptimality`).once('value', (snapshot) => {
            valueOfKey = snapshot.val()
         })
            .then(() => {
                //console.log('optimal score = ' + valueOfKey)
                return valueOfKey
            })
            .then((valueOfKey) => {
                resolve(valueOfKey)
            })
            .catch((error) => {
                reject(error)
            })

    })
}


export const getOptimalityChildID = (ravel_uid, passage_uid) => {
    var m_valueOfKey = '';
    var m_optimalChildScore = 0;

    return new Promise((resolve,reject) => {
     //var m_valueOfKey = '';
     var optimalChildScore = 0;
     //var m_optimalChildScore = 0;
     var optimalChild = '';
     var elm_opt;
     var elm_key;
     var valueOfKey;

         firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/child`).once('value', (snapshot) => {
            //  if (snapshot.val() === false) {
            //      // exit because there is no child
            //  } else {

                snapshot.forEach((elm) => {

                    firebase.database().ref(`passages/${ravel_uid}/${elm.key}/currentPassageOptimality`).once('value', (snapshot) => {
                        valueOfKey = snapshot.val()
                        //console.log('value of key ' + valueOfKey)
                        if (valueOfKey === false) {
                            // do nothing and return
                        }
                        else  {
                            if (valueOfKey > optimalChildScore) {
                                optimalChild = elm.key.toString();
                                //console.log('in else if function...optimal child id: ' + optimalChild)

                            }

                            //m_valueOfKey = elm.key;
                        }
                     })

                })




             //}

         })
            .then(() => {
                //console.log('after function...optimal child id: ' + optimalChild)
                return optimalChild
            })
            .then((optimalChild) => {
                resolve(optimalChild)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

// Use this function to recalculate all the scores on 
// getRavelMetaData()
// do not call directly 
export const calculateRavelOptimality = (ravel_uid) => {

    return new Promise((resolve, reject) => {
        var promises = []
        // First, get all the passage_uids for a given ravel 
        firebase.database().ref(`passages/${ravel_uid}`).once('value', (snapshot) => {
            snapshot.forEach((elm) => {
                promises.push(reCalculateOptimalityScore(ravel_uid, elm.key))
            })

            Promise.all(promises).then((result) => {
                resolve(true)
            })
            .catch((error) => {
                reject('Failed trying to recalcuate all optimality for a given ravel...')
            })

        })

    })
    
}

export const reCalculateOptimalityScore = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {

     var valueOfKey = '';
     var optimalChildID = '';
     var optimalChildIDScore = 0;
     var this_passage_score = 0;
     var m_optimalityScore = 0;
     var optimalChild = '';

    reCalculateCurrentPassagesOptimalityScore(ravel_uid, passage_uid).then(valueOfKey => {

        if (valueOfKey) {

            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}/child`).once('value', (snapshot) => {

                if (snapshot.val() === false) {
                    getOptimality(ravel_uid, passage_uid).then((valueOfKey) => {
                        this_passage_score = valueOfKey;
                    })
                    .then(() => {
                        m_optimalityScore = this_passage_score + 0;
                        firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({optimalityScore : m_optimalityScore})
                    })
                    valueOfKey = false;

                }  else {

                var optimalChildScore = 0;

                snapshot.forEach((elm) => {
                    optimalChild = elm.key;

                    firebase.database().ref(`passages/${ravel_uid}/${elm.key}/currentPassageOptimality`).once('value', (snapshot) => {

                        valueOfKey = snapshot.val()

                        if (valueOfKey === false) {

                        }
                        else  {
                            if (valueOfKey > optimalChildScore) {

                                optimalChild = elm.key;
                                optimalChildScore = valueOfKey;

                            }
                        }
                     })

                })

                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({optimalChild:optimalChild })
                .then(() => {

                    getOptimality(ravel_uid, optimalChild).then((valueOfKey) => {

                    optimalChildIDScore = valueOfKey;


                    })
                    .then(() => {
                        getOptimality(ravel_uid, passage_uid).then((valueOfKey) => {
                            this_passage_score = valueOfKey;
                        })
                        .then(() => {
                            //console.log('m_optimalityScore AFTERrrr inside then optimalChildIDScore in else if function...optimal child id: ' + optimalChildIDScore)
                            m_optimalityScore = this_passage_score + optimalChildIDScore;
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({optimalityScore : m_optimalityScore})
                        })
                        .then(() => {
                            firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({optimalChild:optimalChild })
                        })
                    })

                })

            }

        })

        } else {
            valueOfKey = false;
        }
     })

            .then(() => {
                return valueOfKey
            })
            .then((valueOfKey) => {
                resolve(valueOfKey)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

/**
 * @param: nothing
 * @returns: a promise, resolve will have valueOfKey = true if currentUser is in admin list.
 * actions: Attempts to check if the current user is an admin
 */
export const checkCurrentUserIsAdmin = () => {

    return new Promise((resolve,reject) => {
        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;

            firebase.database().ref(`/admin`).orderByKey().once('value', (snapshotKey) => {
                snapshotKey.forEach((elm) => {
                    if (elm.key === currentUid) {
                        valueOfKey = true;
                    }
                })
            })
            .then(() => {
                return valueOfKey
            })
            .then((valueOfKey) => {
                resolve(valueOfKey)
            })
            .catch((error) => {
                reject(error)
            })

    })
}

/**
 * @param: nothing
 * @returns: a promise, resolve will have valueOfKey = true if currentUser is in admin list.
 * actions: Attempts to check if a particular ravel has voting enabled
 */
export const checkRavelEnabledVoting = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {
        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/ravel_uid`).once('value', (snapshot) => {
            snapShotVal = snapshot.val();
        })
        .then(() => {
            firebase.database().ref(`ravels/${snapShotVal}/enable_voting`).orderByKey().once('value', (snapshotKey) => {
                if (snapshotKey.val() === true) {
                    valueOfKey = true;
                }
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })

        })


    })
}

/**
 * @param: nothing
 * @returns: a promise, resolve will have valueOfKey = true if currentUser is in admin list.
 * actions: Attempts to check if a particular ravel has commenting enabled
 */
export const checkRavelEnabledComment = (ravel_uid, passage_uid) => {

    return new Promise((resolve,reject) => {
        var valueOfKey = false;
        var currentUid = firebase.auth().currentUser.uid;
        var snapShotVal;

        firebase.database().ref(`/passages/${ravel_uid}/${passage_uid}/ravel_uid`).once('value', (snapshot) => {
            snapShotVal = snapshot.val();
        })
        .then(() => {
            firebase.database().ref(`ravels/${snapShotVal}/enable_comment`).orderByKey().once('value', (snapshotKey) => {
                if (snapshotKey.val() === true) {
                    valueOfKey = true;
                }
        })
        .then(() => {
            return valueOfKey
        })
        .then((valueOfKey) => {
            resolve(valueOfKey)
        })
        .catch((error) => {
            reject(error)
        })

        })


    })
}



/** ADMIN FUNCTIONS....*/

/**
 * @param: terms_of_service
 * @returns: dispatch 'GET_TERMS_OF_SERVICE' - the current terms of service in a long string....
 * mapStateToProps => state = terms_of_service
 * state.terms_of_service
 *                       <1> 'GET_TERMS_OF_SERVICE'
 *                           - this.props.terms_of_service.terms_of_service
 * Actions: Adds a new terms of service, will fail if user is not admin
 */
export const insertTermsOfService = (terms_of_service) => dispatch => {

        return new Promise((resolve,reject) => {

            checkCurrentUserIsAdmin().then(valueOfKey => {
                if (valueOfKey) {
                    firebase.database().ref(`terms_of_service`).set({terms_of_service : terms_of_service})
                    .then(() => {
                        firebase.database().ref(`terms_of_service/terms_of_service`).once('value', (snapshot) => {
                            resolve(snapshot.val())
                        dispatch({type: 'GET_TERMS_OF_SERVICE', payload: snapshot.val() })
                    })
                        .catch(() => {
                            reject('Sorry, you do have no admin rights...')
                            dispatch({type: 'IS_ADMIN', payload: false})
                        })
                    })

                } else {
                    reject('Sorry, you do have no admin rights...')
                    dispatch({type: 'IS_ADMIN', payload: false})
                }
            })
        })
}

/**
 * @param: terms_of_service
 * @returns: dispatch 'GET_TERMS_OF_SERVICE' - the current terms of service in a long string....
 * mapStateToProps => state = terms_of_service
 * state.terms_of_service
 *                       <1> 'GET_TERMS_OF_SERVICE'
 *                           - this.props.terms_of_service.terms_of_service
 * Actions: Updates the terms of service, will fail if user is not admin
 */
export const updateTermsOfService = (terms_of_service) => dispatch => {

    return new Promise((resolve,reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {
                firebase.database().ref(`terms_of_service`).update({terms_of_service : terms_of_service})
                .then(() => {
                    firebase.database().ref(`terms_of_service/terms_of_service`).once('value', (snapshot) => {
                    resolve(snapshot.val())
                    dispatch({type: 'GET_TERMS_OF_SERVICE', payload: snapshot.val()})
                })
                    .catch(() => {
                        reject('Sorry, you do have no admin rights...')
                        dispatch({type: 'IS_ADMIN', payload: false})
                    })
                })

            } else {
                reject('Sorry, you do have no admin rights...')
                dispatch({type: 'IS_ADMIN', payload: false})
            }
        })
    })
}

/**
 * @param: terms_of_service
 * @returns: dispatch 'GET_TERMS_OF_SERVICE' - the current terms of service in a long string....
 * mapStateToProps => state = terms_of_service
 * state.terms_of_service
 *                       <1> 'GET_TERMS_OF_SERVICE'
 *                           - this.props.terms_of_service.terms_of_service
 * Actions: Gets the terms of service
 */
export const readTermsOfService = () => dispatch => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`terms_of_service/terms_of_service`).once('value', (snapshot) => {
            resolve(snapshot.val())
            dispatch({type: 'GET_TERMS_OF_SERVICE', payload: snapshot.val() })
        })
        .catch((error) => {
            reject('Error getting terms of service...')
        })
    })

}



/**
 * @param: user_uid
 * @returns: dispatch 'ADD_ADMIN' - attempts to add a new admin to admin list
 * mapStateToProps => state = add_admin
 * state.admin_functions
 *                       <1> 'ADD_ADMIN'
 *                           - this.props.admin_functions.add_admin
 * Actions: Attempts to create a new user account and add their uid to admin node
 */

export const addAdminUser = (email, password) => dispatch => {

    return new Promise((resolve, reject) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            firebase.database().ref(`/admin/${user.uid}`).set(true)
            resolve(true)
            dispatch({type: 'ADD_ADMIN', payload: true})
        })
        .catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            reject('The password is too weak.');
        } else if (errorCode === 'auth/email-already-in-use') {
            reject('There already exists an account with the given email address');
        } else {
            reject(errorMessage);
        }
             console.log(error);
        })



    })


 }


/**
 * @param: nothing
 * @returns: dispatch 'GET_RAVEL_REPORT_LIST' - attempts to get the report ravel list
 *           Attempts to get an ARRAY of ravels in the form of => [ {key,value}, [key,value] ]
 * mapStateToProps => state = ravel_report_list
 * state.admin_functions
 *                       <1> 'GET_RAVEL_REPORT_LIST'
 *                           - this.props.admin_functions.ravel_report_list
 * Actions: Attempts to get an ARRAY of ravels in the form of => [ {key,value}, [key,value] ]
 */
export const getCompleteRavelReportList = () => dispatch => {

    var ravel_report_list_array = []

    return new Promise((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`ravel_report_list`).orderByKey().once('value', function(snapshot) {
                    snapshot.forEach((childSnapShot) => {
                        if (childSnapShot.val() === false) {
                            firebase.database().ref(`/ravels/${childSnapShot.key}`).once('value', function (snapshotChild){
                            ravel_report_list_array.push({key: childSnapShot.key, value: snapshotChild.val()});
                            resolve(ravel_report_list_array)
                            dispatch( {type: 'GET_RAVEL_REPORT_LIST', payload: ravel_report_list_array})
                        })
                        }})

                })
                .catch((error) => {
                    reject('Error getting all reported ravels...')
                })
            }
        })
    })

}

/**
 * @param: nothing
 * @returns: dispatch 'GET_USER_REPORT_LIST' - attempts to get the report user list
 *           Attempts to get an ARRAY of users in the form of => [ {key,value}, [key,value] ]
 * mapStateToProps => state = user_report_list
 * state.admin_functions
 *                       <1> 'GET_USER_REPORT_LIST'
 *                           - this.props.admin_functions.user_report_list
 * Actions: Attempts to get an ARRAY of users in the form of => [ {key,value}, [key,value] ]
 */
export const getCompleteUserReportList = () => dispatch => {

    var user_report_list_array = []

    return new Promise((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {
                firebase.database().ref(`user_report_list`).orderByKey().once('value', function(snapshot) {
                    snapshot.forEach((childSnapShot) => {
                        if (childSnapShot.val() === false) {
                            firebase.database().ref(`/users/${childSnapShot.key}/userProfile`).once('value', function (snapshotChild){
                            user_report_list_array.push({key: childSnapShot.key, value: snapshotChild.val()});
                            resolve(user_report_list_array)
                            dispatch( {type: 'GET_USER_REPORT_LIST', payload: user_report_list_array})
                            })
                        }})

                })
                .catch((error) => {
                    reject('Error getting all reported users...')
                })
            }
        })
    })
}

// returns a list of reported passage_uid and it's metadata
export const getCompletePassageReportList = () => dispatch => {

    return new Promise((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {
                firebase.database().ref(`passage_report_list`).once('value', function(snapshot) {
                    resolve(snapshot.val())
                })
                .catch((error) => {
                    reject('Error getting all reported passages...')
                })
            }
        })
    })
}


/**
 * @param: nothing
 * @returns: dispatch 'DISMISS_REPORT_RAVEL_SUCCESS' - attempts to dismiss a ravel from report list
 *
 * mapStateToProps => state = dismiss_ravel_state
 * state.admin_functions
 *                       <1> 'DISMISS_REPORT_RAVEL_SUCCESS'
 *                           - this.props.admin_functions.dismiss_ravel_state
 * Actions: Attempts to dismiss a ravel_uid from the ravel_report_list
 */
export const dismissReportedRavel = (ravel_uid) => dispatch =>  {

    return new Promise((resolve, reject) => {
        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`ravel_report_list/${ravel_uid}`).remove()
                .then(() => {
                    resolve(true)
                    dispatch({type:'DISMISS_REPORT_RAVEL_SUCCESS', payload: true})
                })
            }
        })
        .catch((error) => {
            reject('Cannot dismiss this ravel at this time...')
            dispatch({type:'DISMISS_REPORT_RAVEL_SUCCESS', payload: false})
        })

    })
}

/**
 * @param: nothing
 * @returns: dispatch 'DISMISS_REPORT_USER_SUCCESS' - attempts to dismiss a user from report list
 *
 * mapStateToProps => state = dismiss_user_state
 * state.admin_functions
 *                       <1> 'DISMISS_REPORT_USER_SUCCESS'
 *                           - this.props.admin_functions.dismiss_user_state
 * Actions: Attempts to dismiss a user_uid from the user_report_list
 */
export const dismissReportedUser = (user_uid) => dispatch => {

    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`user_report_list/${user_uid}`).remove()
                .then(() => {
                    resolve(true)
                    dispatch({type:'DISMISS_REPORT_USER_SUCCESS', payload: true})
                })
            }
        })
        .catch((error) => {
            reject('Cannot dismiss this user at this time...')
            dispatch({type:'DISMISS_REPORT_USER_SUCCESS', payload: false})
        })

    })
}

/**
 * @param: passage_uid
 * removes a passage_uid from the passage_report_list if admin 'dismisses' it.
 */
export const dismissReportedPassage = (passage_uid) => dispatch => {

    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`passage_report_list/${passage_uid}`).remove()
                .then(() => {
                    resolve(true)

                })
            }
        })
        .catch((error) => {
            reject('Cannot dismiss this user at this time...')

        })

    })
}


/**
 * @param: ravel_uid
 * @returns: dispatch BAN_RAVEL_SUCCESS, 'DISMISS_REPORT_RAVEL_SUCCESS'
 *
 * mapStateToProps => state = ban_ravel_success
 * state.admin_functions
 *                       <1> 'BAN_RAVEL_SUCCESS' - returns true on success
 *                           - this.props.admin_functions.ban_ravel_success
 * mapStateToProps => state = dismiss_ravel_state
 * state.admin_functions
 *                       <2> 'DISMISS_REPORT_RAVEL_SUCCESS' - returns true on success
 *                           - this.props.admin_functions.dismiss_ravel_state
 * Actions: Attempts to ban a reported ravel by removing it from the follow paths:
 *                                                                  - ravels/${ravel_uid}
 *                                                                  - users/${uid}/ravel_created/${ravel_uid}
 *                                                                  - master_ravel_key/${ravel_uid}
 */
export const banReportedRavel = (ravel_uid) => dispatch => {
    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {

                firebase.database().ref(`ravels/${ravel_uid}/user_created`).once('value', (snapshot) => {

                    firebase.database().ref(`users/${snapshot.val()}/ravel_created/${ravel_uid}`).remove()
                    .then(() => {

                        firebase.database().ref(`ravels/${ravel_uid}`).remove()
                        .then(() => {
                            firebase.database().ref(`master_ravel_key/${ravel_uid}`).remove()
                            .then(() => {

                                firebase.database().ref(`ravel_report_list/${ravel_uid}`).remove()
                                .then(() => {
                                    resolve(true)
                                    dispatch({type:'DISMISS_REPORT_RAVEL_SUCCESS', payload: true})
                                })



                            })
                        })
                    })
                    .catch(() => {
                        reject('Error banning report')
                    })
                })
            }
        })
    })
}

export const deleteRavel = (ravel_uid) => dispatch => {

    return new Promise ((resolve, reject) => {
        firebase.database().ref(`/ravels`).orderByChild("ravel_uid").equalTo(ravel_uid).once('value', function(snapshot) {

          firebase.database().ref(`ravels/${ravel_uid}`).remove()
          .then(() => {
            console.log("ravel_uid removed");
          })
          .catch((error) => {
            console.log("Error removing: " + error);
          })

        })
        .catch((error) => {
          console.log(error);
          reject ('Error searching for ravel by title.');
        })
      });
}

/**
 * @param: user_uid
 * @returns:
 *
 * Actions: Attempts to flag user as banned (value is true)
 */
export const flagReportedUser = (user_uid) => dispatch => {

    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`user_report_list/${user_uid}`).set(true)
                .then(() => {
                    // Update the user as being NULL 
                    firebase.database().ref(`users/${user_uid}/userProfile`).update(
                        {
                        bio: 'NULL',
                        email: 'NULL', 
                        first_name: 'User banned due to RavelTree violation.',
                        last_name: 'NULL', 
                        photoURL: '' 
                    })
                    .then(() => {
                        resolve(true)
                    })
                    
                })
                
            }
        })
        .catch((error) => {
            reject('Cannot dismiss this user at this time...')
            //dispatch({type:'DISMISS_REPORT_USER_SUCCESS', payload: false})
        })

    })
}

export const banReportedPassage = (ravel_uid, passage_uid) => dispatch => {
    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {

                firebase.database().ref(`passages/${ravel_uid}/${passage_uid}`).update({
                passage_body: 'This passage has been removed due to violation.',
                passage_title: 'This passage has been removed due to violation.',
                currentPassageOptimality: 0,
                optimalChild: false,
                optimalityScore: 0,
                passage_combined_vote: 0,
                passage_comment: false,
                passage_downvote: 0,
                passage_upvote: 0,
                user_created_photoURL: false,
                is_banned: true,
                enable_comment: false,

              })
              .then(() => {
                  firebase.database().ref(`passage_report_list/${passage_uid}`).remove()
              })

              resolve(true)
            }
        })
        .catch((error) => {
            reject('Not an Admin.')
        })
    })
}

/**
 * Gets the admin stat page
 * // Number of Ravels
 * // Number of Users
 * // Number of Reported Ravels
 * // Number of Reported Users
 */
/**
 * @param: nothing
 * @returns: dispatch 'GET_ADMIN_STAT'
 *
 * mapStateToProps => state = various
 * state.admin_functions
 *                       <1> 'GET_ADMIN_STAT'
 *                           - this.props.admin_functions.number_ravels
 *                           - this.props.admin_functions.number_users
 *                           - this.props.admin_functions.number_reported_ravels
 *                           - this.props.admin_functions.number_reported_users
 *
 * Actions: Attempts to get the stats for admin stats page
 */
export const getStats = () => dispatch => {

    var m_number_ravels = 0;
    var m_number_users = 0;
    var m_number_reported_ravels = 0;
    var m_number_reported_users = 0;

    return new Promise((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {

                firebase.database().ref(`master_ravel_key`).once('value', (snapshot) => {
                    m_number_ravels = snapshot.numChildren()
                })
                .then(() => {
                    firebase.database().ref(`master_user_key`).once('value', (snapshot) => {
                        m_number_users = snapshot.numChildren();
                    })
                    .then(() => {
                        firebase.database().ref(`ravel_report_list`).once('value', (snapshot) => {
                            m_number_reported_ravels = snapshot.numChildren();
                        })
                        .then(() => {
                            firebase.database().ref(`user_report_list`).once('value', (snapshot) => {
                                m_number_reported_users = snapshot.numChildren();
                            })
                            .then(() => {
                                resolve({ number_ravels: m_number_ravels, number_users : m_number_users,
                                    number_reported_ravels: m_number_reported_ravels, number_reported_users: m_number_reported_users})

                                dispatch({type: 'GET_ADMIN_STAT', payload: ({ number_ravels: m_number_ravels, number_users : m_number_users,
                                                                            number_reported_ravels: m_number_reported_ravels, number_reported_users: m_number_reported_users})})
                            })
                            .catch(() => {
                                reject('Error getting stats');
                            })
                        })
                    })

                })
            }
        })
    })
}


/**
 * @param: privacy_policy
 * mapStateToProps => state = privacy_policy
 * state.term_of_service
 *                      <1> 'GET_PRIVACY_POLICY'
 *                          - this.props.terms_of_service.privacy_policy
* mapStateToProps => state = is_admin
 * state.admin_functions
 *                      <2> 'IS_ADMIN'
 *                          - this.props.admin_functions.is_admind
 * @returns: the current privacy_policy in a long string....
 * Actions: Adds a new privacy_policy, will fail if user is not admin
 */
export const insertPrivacyPolicy = (privacy_policy) => dispatch => {

    return new Promise ((resolve,reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {
            if (valueOfKey) {
                firebase.database().ref(`privacy_policy`).set({privacy_policy : privacy_policy})
                .then(() => {
                    firebase.database().ref(`privacy_policy/privacy_policy`).once('value', (snapshot) => {
                        resolve((snapshot.val()))
                    dispatch({type: 'GET_PRIVACY_POLICY', payload: snapshot.val() })
                })
                    .catch(() => {
                        reject('Sorry, you do have no admin rights...');
                        dispatch({type: 'IS_ADMIN', payload: false})
                    })
                })

            } else {
                reject('Sorry, you do have no admin rights...');
                dispatch({type: 'IS_ADMIN', payload: false})
            }
        })
    })
}

/**
 * @param: privacy_policy
 * mapStateToProps => state = privacy_policy
 * state.term_of_service
 *                      <1> 'GET_PRIVACY_POLICY'
 *                          - this.props.terms_of_service.privacy_policy
* mapStateToProps => state = is_admin
 * state.admin_functions
 *                      <2> 'IS_ADMIN'
 *                          - this.props.admin_functions.is_admind
 * @returns: the current privacy_policy in a long string....
 * Actions: Updates the privacy_policy, will fail if user is not admin
 */
export const updatePrivacyPolicy = (privacy_policy) => dispatch =>{

return new Promise ((resolve, reject) => {

    checkCurrentUserIsAdmin().then(valueOfKey => {

        if (valueOfKey) {
            firebase.database().ref(`privacy_policy`).update({privacy_policy : privacy_policy})
            .then(() => {
                firebase.database().ref(`privacy_policy/privacy_policy`).once('value', (snapshot) => {
                    resolve((snapshot.val()))
                dispatch({type: 'GET_PRIVACY_POLICY', payload: snapshot.val()})
            })
                .catch(() => {
                    reject('Sorry, you do have no admin rights...');
                    dispatch({type: 'IS_ADMIN', payload: false})
                })
            })

        } else {
            reject('Sorry, you do have no admin rights...');
            dispatch({type: 'IS_ADMIN', payload: false})
        }
    })
})

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
export const searchAllRavelByTitle = (title) => dispatch => {

    return new Promise ((resolve, reject) => {

        checkCurrentUserIsAdmin().then(valueOfKey => {

            if (valueOfKey) {

                firebase.database().ref(`/ravels/`).orderByChild("ravel_title").equalTo(title).once('value', snapshot => {
                    resolve (snapshot.val());
                    dispatch({type: 'SEARCH_RAVEL_BY_TITLE', payload: snapshot.val()})
                })
                .catch((error) => {
                    reject('Error searching for ravel.');
                })

            } else {
                reject ('Sorry, you do have no admin rights...');
                dispatch({type: 'IS_ADMIN', payload: false})
            }
        })



    });
}

// params: pass in either a reported: ravel_uid, user_uid or passage_uid
export const getReportMessage = (reported_uid) => dispatch => {
    return new Promise ((resolve, reject) => {
        firebase.database().ref(`report_message_list/${reported_uid}`).once('value', (snapshot) => {
            console.log(snapshot.val())
            resolve(snapshot.val())
        })
        .catch((error) => {
            reject('Error fetching report message ')
        })
    })
}

// Get's all of the tags in the db in the order in which they appear in the db 
// If a random list is needed, please message Vivienne 
export const getAllGlobalTags = () => dispatch => {

    return new Promise((resolve,reject) => {

        firebase.database().ref(`global_tag_list`).once('value', (snapshot) => {
            
            resolve(snapshot.val())
        })
        .catch((error) => {
            reject('Failed getting all tags')
        })

    })

}
