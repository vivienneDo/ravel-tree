import firebase from 'firebase';

// When using these functions, you have to import the functions into your page
// You also have to import the correct Reducer.js. 

/* START USER FUNCTIONS */

// Will get the currently logged in user's uid 
export const getCurrentLoggedInUserUid = () => {

    return firebase.auth().currentUser.uid;
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

    return (dispatch) => {
        firebase.database().ref(`/users/${uid}/userProfile`)
        .on('value', snapshot => {
            console.log(snapshot.val());
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

export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
                                ravel_concept, ravel_number_participants, ravel_participants, ravel_tags }) => {

    console.log('creating ravel');
    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_status = true;
    var ravel_create_date = new Date().toLocaleTimeString();
    var user_created_photoURL = '';
    // TODO: Calculate ravel points dynamically 
    var ravel_points = '';

    return (dispatch) => {
        firebase.database().ref(`/ravels`)
            .push({ user_created, user_created_photoURL, ravel_title, ravel_category, passage_length,
                visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_number_participants,
                ravel_participants, ravel_create_date, ravel_tags, ravel_points })
            .then(returnKey => {
                // Push to ravels node and to user's created ravel node 
                // for Your Ravels card view 
                var ravel_uid = returnKey.getKey();
                firebase.database().ref(`/ravels/${ravel_uid}/ravel_uid`).set(ravel_uid);
                firebase.database().ref(`/users/${currentUser.uid}/ravel_created`).push({ravel_uid, user_created_photoURL, ravel_title, ravel_number_participants, ravel_points});     
                dispatch({ type: 'CREATE_RAVEL',
                           payload: { user_created, user_created_photoURL, ravel_title, ravel_category, passage_length,
                            visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_number_participants,
                            ravel_participants, ravel_create_date, ravel_tags, ravel_points }});
            })
            .catch((error) => {
                console.log('Failed creating ravel');
            });
        
    };

};

export const getAllUserCreatedRavel = (user) => {
    console.log('Getting all ravels');
    return (dispatch) => {
        // var allRavels = firebase.database().ref(`/users/${user.uid}/ravel_created`);
        firebase.database()
        .ref(`/users/${user.uid}/ravel_created`)
        .orderByKey()
        .limitToLast(10)
        .on('value', (snapshot) => {
            setTimeout(() => {
                const ravels = snapshot.val() || [];

                console.log("ravel objectL" + ravels);              
                dispatch(receiveRavels(ravels))
            }, 0);
        });
    };


};

export const addRavel = (rav) => ({
    type: 'ADD_USER_CREATED_RAVEL',
    ...rav
});

export const receiveRavels = (ravels) => {
    return function (dispatch) {
        Object.values(ravels).forEach(rav => dispatch(addRavel(rav)));
    }
};

// What you can upvote: a passage 
// What you cannot upvote: a ravel, a comment
// Formula to calculate ravel-point: Each user profile shall include a user score calculated using the formula 10P + U, 
// where P = Number of passages written and U = Number of upvotes received.

/* END RAVEL ACTIONS */