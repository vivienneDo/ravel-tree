import firebase from 'firebase';


// Will get the currently logged in user's uid 
export const getCurrentLoggedInUserUid = () => {

    return firebase.auth().currentUser.uid;
}

// Params: user uid 
// Action: Gets the meta-data for a user profile 
export const getUserProfile = (uid) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${uid}/userProfile`)
        .on('value', snapshot => {
            dispatch({ type: 'GET_USER_PROFILE',
                       payload: snapshot.val() });
        });
    };
};

// Params: first name, last name, bio, photoURL 
// Action: Updates the currently logged in user's first name, last name, bio and photo
export const updateUserProfile = ({ first_name, last_name, bio, photoURL}) => {

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
    var loading = false;

    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({ type: 'ON_AUTH_SUCCESS',
                        payload: { loading }});
        })
        .catch((error) => {
            console.log("Authenticiation Failed");
        });
    };
};

// Params: Takes a user's email and password
// Actions: Creates a new user with the email and password 
export const signUpWithEmail = (email, password) => {
    var loading = false;

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({ type: 'CREATE_NEW_USER',
                        payload: { loading }});
        })
        .catch((error) => {
            console.log("Cannot create user");
        });
    };
};


// Helper Functions 

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

// This should be a get function 
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

// export const getUserUpVote = (uid, upvotes) => {
//     const { currentUser } = firebase.auth(uid);
// }

// Ask how to calculate this
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


// Params: Takes meta-date from the ravel. This starts a ravel creation. 
// Action: Writes the the db the meta-data and sets the current user logged in 
// as the creator. ravel_status: 

export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility,enable_voting,enable_comment, ravel_concept }) => {

    console.log('creating ravel');
    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_status = false;
    var ravel_create_time = new Date().toLocaleTimeString();;

    return (dispatch) => {
        firebase.database().ref(`/ravels`)
            .push({ user_created, ravel_title, ravel_category, passage_length,
                visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_create_time
                })
            .then(() => {
                console.log('Success');
                dispatch({ type: 'CREATE_RAVEL',
                           payload: {user_created, ravel_title, ravel_category, passage_length,
                            visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_create_time
                            }});
            })
            .catch((error) => {
                console.log('failed creating ravel');
            });
    };

};




