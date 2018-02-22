import firebase from 'firebase';
import _ from 'lodash'
firebase.initializeApp({
    apiKey: "AIzaSyCmt6Cq6wj2NJZ-WOCE27brxfW-kg6TUKQ",
    authDomain: "crmlinkedln2-81204.firebaseapp.com",
    databaseURL: "https://crmlinkedln2-81204.firebaseio.com",
    projectId: "crmlinkedln2-81204",
    storageBucket: "crmlinkedln2-81204.appspot.com",
    messagingSenderId: "107870538404"
  });

  

// When using these functions, you have to import the functions into your page
// You also have to import the correct Reducer.js. 

/* START USER FUNCTIONS */

// Will get the currently logged in user's uid 
export const getCurrentLoggedInUserUid = () => {

    return firebase.auth().currentUser.uid;
}

export const getCurrentLoggedInUser = () => {
    return firebase.auth().currentUser;
}

// Wrapper method to set null values when creating a user
export const updateUserProfile = (userProfile, {first_name, last_name, bio, 
                                photoURL, stat_ravel_led, stat_passage_written, 
                                stat_ravel_contributed, upvotes, ravel_points}) => {

    console.log("updating user profile");
    var user_uid = userProfile.uid;

    firebase.database().ref(`/users/${userProfile.uid}/userProfile`)
    .set({ user_uid, first_name, last_name, bio, photoURL,stat_ravel_led, stat_passage_written, 
    stat_ravel_contributed, upvotes, ravel_points })
    .then(() => {
    console.log('Success');
    })
    .catch((error) => {
    console.log(error);
    });
}

// Action: Logs the current user off
export const userLogOff = () => { 
    firebase.auth().signOut().then(function() {
      }, function(error) {
            console.log('Logging off Failed');
      });
};

// Params: Takes an exisiting user's email 
// Action: Resets password
export const userResetPassword = (email) => {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function() {

    }).catch(function(error) {
        console.log("Cannot send email");
    });
}

// Params: Takes a user's email and password 
// Action: Signs in the user if auth was successful
export const signInWithEmail = (email, password) => {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else if (errorCode === 'auth/user-not-found') {
      alert('there is no user corresponding to the given email');
    } else {
      alert(errorMessage);
    }
        console.log(error);
    });
};

// Params: Takes a user's email and password
// Actions: Creates a new user with the email and password and sets profile to empty
export const createUserWithEmail = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => { 
        console.log('i am here in create user with email'); 
        console.log(user.uid);
        updateUserProfile(user, {first_name:'',last_name:'',bio:'',photoURL:'', stat_ravel_led:'', stat_passage_written:'', stat_ravel_contributed:'', 
                                upvotes:'', ravel_points:'' });
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
    });

};


/* END USER FUNCTIONS */

/* START USER ACTIONS (will set props)*/

export const updateProfilePicture = (url) => {

    
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({
            photoURL : url,
          })
          .then(() => {
            dispatch({ type: 'UPDATE_USER_PROFILE_PICTURE',
            payload: url});
          })
          .catch((error) => {
            console.log(error);
          })
                  
    }
}

// Params: user uid 
// Action: Gets the meta-data for a user profile 
export const getUserProfile = (uid) => {

    console.log("getting user profile")
    return (dispatch) => {
        firebase.database().ref(`/users/${uid}/userProfile`)
        .once('value', snapshot => {
            console.log('getting snap value'+snapshot.val());
            dispatch({ type: 'GET_USER_PROFILE',
                       payload: snapshot.val() });
        });
    };
};

// Params: first name, last name, bio, photoURL 
// Action: Updates the currently logged in user's first name, last name, bio and photo
export const updateCurrentUserProfile = ({ first_name, last_name, bio, photoURL}) => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
            .set({ first_name, last_name, bio, photoURL })
            .then(() => {
                console.log('Success');
                dispatch({ type: 'UPDATE_USER_PROFILE',
                           payload: {first_name, last_name, bio, photoURL}});
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// Actions: Will calculate the user's stats 
export const calculatesUserStat = ({ stat_ravel_led, stat_ravel_contributed, stat_passage_written }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .set({ stat_ravel_led, stat_ravel_contributed, stat_passage_written })
        .then(() => {
            dispath({type: 'UPDATE_USER_STAT',
                     payload: {stat_ravel_led, stat_ravel_contributed, stat_passage_written}});
        })
        .catch((error) => {
            console.log(error);
        });
    };
};


export const calculatesUserUpVote = (upvotes) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .set(upvotes)
        .then(() => {
            dispath({type: 'UPDATE_USER_UPVOTE',
                    payload: upvotes})
        })
        .catch((error) => {
            console.log(error);
        });
        
    };
};

// TODO: Calculate ravelpoints with function 
export const updateUserRavelPoint = (ravel_points) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        set(ravel_points)
        .then(() => {
            dispatch({type: 'UPDATE_USER_RAVEL_POINT',
                    payload: ravel_points});
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

/* END USER ACTIONS */

/* START RAVEL FUNCTIONS */

/* END RAVEL FUNCTIONS */

/* START RAVEL ACTIONS */

// Params: Takes meta-date from the ravel. This starts a ravel creation. 
// Action: Writes the the db the meta-data and sets the current user logged in 
// as the creator. ravel_status: 
// State change: the ravel_uid and the metadata for that ravel 

export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
                                ravel_concept, m_ravel_participants, ravel_tags }) => {

    console.log('creating ravel');
    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_status = true;
    var ravel_create_date = new Date().toLocaleTimeString();
    // TODO: Most likely will delete this photoURL and just query the most recent one...
    var user_created_photoURL = '';
    // TODO: Calculate ravel points dynamically 
    var ravel_points = '';

    var ravel_number_participants = m_ravel_participants.length;
    var ravel_participants = {};
    m_ravel_participants.forEach(function(elm) { ravel_participants[elm] = true })
    //ravel_participants.forEach((elm) => console.log('elm = '+ elm))
    

    
    
                
    return (dispatch) => {
        var ravel_uid;
        firebase.database().ref(`/ravels`)
            .push({ user_created, user_created_photoURL, ravel_title, ravel_category, passage_length,
                visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_number_participants,
                ravel_participants, ravel_create_date, ravel_tags, ravel_points })
            .then(returnKey => {
                // Push to ravels node and to user's created ravel node 
                // for Your Ravels card view 
                ravel_uid = returnKey.getKey();
                firebase.database().ref(`/ravels/${ravel_uid}/ravel_uid`).set(ravel_uid);
                firebase.database().ref(`/users/${currentUser.uid}/ravel_created`).push({ravel_uid, user_created_photoURL, ravel_title, ravel_number_participants, ravel_points});    
                console.log('Ravel UID in Create Ravel....:' + ravel_uid) 
                
                
            })
            .then(() => {

                dispatch({ type: 'CREATE_RAVEL',
                           payload:  {ravel_uid} });

            })
            .then(() => {
                firebase.database().ref(`/ravels/${ravel_uid}`).once('value', function (snapshot) {
                    dispatch({ type: 'GET_RAVEL_META_DATA', payload: snapshot.val()})
                });
            })           
            .catch((error) => {
                console.log('Failed creating ravel');
            });
        
    };




};

// Closes a ravel, no longer editable 
// export const closeUserRavel = (ravel_uid, user) => {

//     firebase.database().ref(`/users/${user.uid}/ravel_created`).child(ravel_uid).once('value', function(snapshot) {
//         if (snapshot !== null ) {
//             firebase.database().ref(`/ravels/${ravel_uid}`).update({ravel_status : false})
//         }
//     });

// }

// Loads all ravels for a particular user 
// Params: user object 
// Returns: a list of ravel_uids and meta-deta:

export const loadInitialUserCreatedRavel = (user) => {

    return (dispatch) => {
            firebase.database().ref(`/users/${user.uid}/ravel_created`)
            .once('value', function(snapshotRavels) {
                dispatch({ type: 'INITIAL_USER_RAVEL_FETCH', payload:  snapshotRavels.val()});
            });
    };
};

// Params: Accepts a first null string literal 
// Return: Will return a list of user profiles associated with the first namee 

export const searchUserByName = (first_name) => {
    return (dispatch) => {
        firebase.database().ref(`/users`).orderByChild("userProfile/first_name").equalTo(first_name).once('value', function(snapshot) {
            dispatch({type : 'SEARCH_USER_FIRST_NAME', payload: snapshot.val()});
        });       
    } 
}

export const searchRavelByTag = (tag) => {
    return (dispatch) => {
        firebase.database().ref(`/ravels`).orderByChild("ravel_tags").equalTo(tag).once('value', function(snapshot) {
            console.log('tag snap:' + snapshot.val())
            dispatch({type : 'SEARCH_RAVEL_BY_TAG', payload: snapshot.val()});
        });       
    } 
}

// Action: Get a particular ravel metadata 
// Params: ravel_uid 
// Returns: An object with all of the ravel_uid's metadata 
export const getRavelMetaData = (ravel_uid) => {
    return (dispatch) => {
        console.log("Inside get ravel uid:" + ravel_uid)
        firebase.database().ref(`/ravels/${ravel_uid}`).once('value', function (snapshot) {
            dispatch({ type: 'GET_RAVEL_META_DATA', payload: snapshot.val()})
        });
    }
}

// Action: Gets the userprofiles of ravel tree users 
// Params: ravel_uid 
// Returns: An object with all ravel member's userProfiles 
export const getAllRavelParticipantUserProfile = (ravel_uid) => {
    
    var all_child_uid_val = [];
    return (dispatch) => {    

        firebase.database().ref(`/ravels/${ravel_uid}/ravel_participants`).once('value', function (snapshot) {
            console.log('I am here' + snapshot)
            snapshot.child(function (childSnapShot) {
                
                var child_uid = childSnapShot; 
                console.log('I am here child: ' + child_uid)
                firebase.database().ref(`/users/${child_uid}/userProfile`).once('value', function (snapshotChild){
                    all_child_uid_val.push(snapshotChild.val());
                    dispatch( {type: 'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE', payload: all_child_uid_val})                   
                })
            })      
        })

    }
}

export const loadAllRavel = () => {

    return (dispatch) => {
            firebase.database().ref(`/ravels/`)
            .once('value', function(snapshotRavels) {
                dispatch({ type: 'ALL_RAVEL_FETCH', payload: snapshotRavels.val()});
            });
    };
};




// What you can upvote: a passage 
// What you cannot upvote: a ravel, a comment
// Formula to calculate ravel-point: Each user profile shall include a user score calculated using the formula 10P + U, 
// where P = Number of passages written and U = Number of upvotes received.

/* END RAVEL ACTIONS */