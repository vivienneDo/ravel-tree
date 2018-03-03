import firebase from 'firebase';
import _ from 'lodash';

firebase.initializeApp({
    apiKey: "AIzaSyCmt6Cq6wj2NJZ-WOCE27brxfW-kg6TUKQ",
    authDomain: "crmlinkedln2-81204.firebaseapp.com",
    databaseURL: "https://crmlinkedln2-81204.firebaseio.com",
    projectId: "crmlinkedln2-81204",
    storageBucket: "crmlinkedln2-81204.appspot.com",
    messagingSenderId: "107870538404"
  });

/* START USER FUNCTIONS */

/**
 * @param: nothing
 * @returns: the current user's uid 
 * 
 */
export const getCurrentLoggedInUserUid = () => {

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
                                stat_ravel_contributed, upvotes, ravel_points}) => {

    var user_uid = userProfile.uid;
    firebase.database().ref(`/users/${userProfile.uid}/userProfile`)
    .set({ user_uid, first_name, last_name, bio, photoURL,stat_ravel_led, stat_passage_written, 
    stat_ravel_contributed, upvotes, ravel_points })
    .catch((error) => {
    console.log(error);
    });
}


/**
 * @param: nothing
 * @returns: nothing
 * actions: logs the current user off 
 * 
 */
export const userLogOff = () => { 
    firebase.auth().signOut().then(function() {
      }, function(error) {
            console.log('Logging off Failed');
      });
};


/**
 * @param: registered user's email address 
 * @returns: nothing
 * actions: fires an email that will enable a user to reset their password
 * 
 */
export const userResetPassword = (email) => {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function() {

    }).catch(function(error) {
        console.log("Cannot send email");
    });
}


/**
 * @param: registered user's email and password
 * @returns: nothing
 * actions: attempts to log a registered user into the db. 
 * 
 */
export const signInWithEmail = (email, password) => {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else if (errorCode === 'auth/user-not-found') {
      alert('There is no user corresponding to the given email');
    } else {
      alert(errorMessage);
    }
        console.log(error);
    });
};

/**
 * @param: an email and password
 * @returns: nothing
 * actions: attempts to create a new user and sets their user profile to null 
 * 
 */
export const createUserWithEmail = (email, password) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => { 
        firebase.database().ref(`/master_user_key/${user.uid}`).set({ user_uid: true })

        updateUserProfile(user, {first_name:'',last_name:'',bio:'',photoURL:'', stat_ravel_led:0, stat_passage_written:0, stat_ravel_contributed:0, 
                                upvotes:0, ravel_points:0 });
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

/**
 * @param: nothing
 * @returns: 
 * state.all_user_keys
 *      'ALL_USER_KEY_FETCH': a list of all user uid and it's status (true/false)
 */
export const loadAllUserKey = () => {

    return (dispatch) => {
            firebase.database().ref(`master_user_key`)
            .once('value', function(snapshotRavels) {
                dispatch({ type: 'ALL_USER_KEY_FETCH', payload: snapshotRavels.val()});
            });
    };
};


/**
 * @param: nothing
 * @returns: 
 * state.master_ravel
 *      'ALL_RAVEL_KEY_FETCH': a list of all ravel uid and it's status (true/false)
 */
export const loadAllRavelKey = () => {

    return (dispatch) => {
            firebase.database().ref(`master_ravel_key`)
            .once('value', function(snapshotRavels) {
                dispatch({ type: 'ALL_RAVEL_KEY_FETCH', payload: snapshotRavels.val()});
            });
    };
};

/**
 * @param: photo url
 * @returns: 
 * state.user: 
 *      'UPDATE_CURRENT_USER_PROFILE_PICTURE' - new photo url 
 * 
 * actions: updates the currently logged in user's user profile picture
 * and updates in their user_created ravel card reference 
 * 
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
            console.log(error);
          })
                  
    }
}


/**
 * @param: user uid 
 * @returns: 
 * state.user: 
 *      'GET_USER_PROFILE' - an entire userProfile object
 * actions: gets the user profile of the passed in uid 
 * 
 */
export const getUserProfile = (uid) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${uid}/userProfile`)
        .once('value', snapshot => {
            dispatch({ type: 'GET_USER_PROFILE',
                       payload: snapshot.val() });
        });
    };
};

/**
 * @param: nothing 
 * @returns: 
 * state.user: 
 *      'GET_CURRENT_USER_PROFILE' - an entire userProfile object
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
        });
    };
};



/**
 * @param: user's { first_name, last_name, bio }
 * @returns: 
 * state.user
 *      'UPDATE_CURRENT_USER_PROFILE' : first_name, last_name, bio
 * actions: attempts to update the current logged in user's first name, last and bio and gives back the updated userProfile
 *          object
 */
export const updateCurrentUserProfile = ({ first_name, last_name, bio }) => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({ first_name, last_name, bio})
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`).once('value', snapshot => {
            dispatch({ type: 'UPDATE_CURRENT_USER_PROFILE',
                payload: snapshot.val() });
            })
            .catch((error) => {
                console.log(error);
            });

    }
};


/** TODO
 * @param: 
 * @returns: 
 * 
 */
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


/** TODO 
 * @param: 
 * @returns: 
 * 
 * 
 */
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


/** TODO
 * @param: 
 * @returns: 
 * 
 * 
 */
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


/**
 * @param: { ravel_title, ravel_category, passage_length, visibility (true/false), enable_voting (true/false), enable_comment (true/false),
           ravel_concept, m_ravel_participants [ARRAY], ravel_tags [ARRAY] }
 * @returns: 
 * state.ravel
 *      <1>'CREATE_RAVEL' - a new ravel uid
 *      <2>'GET_RAVEL_META_DATA' - entire ravel object
 * actions: attempts to create a new ravel and set all of the metadata. 
 * 
 * 
 */
export const createStartRavel = ({ ravel_title, ravel_category, passage_length, visibility, enable_voting, enable_comment,
                                ravel_concept, m_ravel_participants, ravel_tags }) => {

    const { currentUser } = firebase.auth();
    var user_created = currentUser.uid;
    var ravel_status = true;
    var ravel_create_date = new Date().toLocaleTimeString();
    var user_created_photoURL = '';   

    firebase.database().ref(`/users/${user_created}/userProfile/photoURL`).once('value', snapshotPhoto => {
        if (snapshotPhoto != null) {
            user_created_photoURL = snapshotPhoto.val();
        } else {
            user_created_photoURL = '';
        }
    })
    .catch((error) => {
        console.log(error)
    })                            
    
    var ravel_points = 0;
    var ravel_number_participants = m_ravel_participants.length;
    var ravel_participants = {};
    m_ravel_participants.forEach(function(elm) { ravel_participants[elm] = false })
    
    // Update the user's ravel created count
    var ravel_led_stat;                               
    var ravel_counter = 1; 
    
    // Must be able to filter by: title, category, tag 
    // public_title: true, public_fiction: true, public_nonfiction: true, pubic_other:true ,
    // public_tag_set: tag_set 
    // these fields are for filter purpose only to improve speed you must create new fields 
    // since firebase only supports one filter param... 
    var public_tag_set = {};
    ravel_tags.forEach(function(elm) { public_tag_set["public_" + elm] = false })
    var public_ravel_title = '';
    // category 
    var public_cat_fiction = false; 
    var public_cat_nonfiction = false;
    var public_cat_other = false;

    if (visibility === true) {

        // tags
        ravel_tags.forEach(function(elm) { public_tag_set["public_" + elm] = true })

        // title 
        public_ravel_title = "public_" + ravel_title;
        
        // category
        switch (ravel_category) {
            case 'fiction': {
                public_cat_fiction = true 
            }
            case 'non_fiction': {
                public_cat_nonfiction = true
            }
            case 'other': {
                pubic_cat_other = true
            }
            default: {
                public_cat_other = true 
            }
        }

    }
    
    return (dispatch) => {
        var ravel_uid;
        firebase.database().ref(`/ravels`)
            .push({ user_created, user_created_photoURL, ravel_title, ravel_category, passage_length,
                visibility, enable_voting, enable_comment, ravel_concept, ravel_status,ravel_number_participants,
                ravel_participants, m_ravel_participants, ravel_create_date, public_tag_set, ravel_points, public_ravel_title,
                public_cat_fiction, public_cat_nonfiction, public_cat_other })
            .then(returnKey => {
                ravel_uid = returnKey.getKey();
                firebase.database().ref(`/ravels/${ravel_uid}/ravel_uid`).set(ravel_uid);
                firebase.database().ref(`/users/${currentUser.uid}/ravel_created`).push({ravel_uid, user_created_photoURL, ravel_title, ravel_number_participants, ravel_points});                         
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
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/userProfile/stat_ravel_led`).once('value', (snapshot) => {

                        ravel_led_stat = snapshot.val();   
                })
                .then(() => {
                    firebase.database().ref(`/users/${currentUser.uid}/userProfile`).update({
                        stat_ravel_led : ravel_led_stat + ravel_counter,
                      })
                })
            })     
            .then(() => {
                // Add to master_ravel_key
                firebase.database().ref(`/master_ravel_key/${ravel_uid}`).set({
                    ravel_uid: true
                })
            })          
    
            .catch((error) => {
                console.log('Failed creating ravel');
            });
        
    };

};


/**
 * @param: a first name search 
 * @returns: 
 * state.search
 *      'SEARCH_USER_FIRST_NAME': a list of userProfile object with the same first name
 * actions: filters all user profiles by first name attribute 
 * 
 */
export const searchUserByName = (first_name) => {
    return (dispatch) => {
        firebase.database().ref(`/users`).orderByChild("userProfile/first_name").equalTo(first_name).once('value', function(snapshot) {
            dispatch({type : 'SEARCH_USER_FIRST_NAME', payload: snapshot.val()});
        });       
    } 
}

/**
 * @param: tag [ARRAY]
 * @returns: 
 * state.search
 *      'SEARCH_RAVEL_BY_TAG': a list of ravel objects with associated tags 
 * actions: attempts to filter all ravels by tag. function will loop through 
 * all tags in tag[] and return all ravels with a match.
 * 
 */
export const searchRavelByTag = (tag) => {

    return (dispatch) => {

        tag.forEach((tag) => { 
            firebase.database().ref(`/ravels/`).orderByChild(`public_tag_set/${'public_' + tag}`).equalTo(true).once('value', function(snapshot) {
                dispatch({type : 'SEARCH_RAVEL_BY_TAG', payload: snapshot.val()});
            });   
        })
            
    } 
}

/**
 * @param: title
 * @returns: 
 * state.search 
 *      'SEARCH_RAVEL_BY_TITLE': a list of ravels with the same title param
 * actions: attempts to filter ravels by title
 * 
 * 
 */
export const searchRavelByTitle = (title) => {

    var public_title = 'public_' + title; 

    return (dispatch) => {
        firebase.database().ref(`/ravels/`).orderByChild("public_ravel_title").equalTo(public_title).once('value', snapshot => {
            dispatch({type: 'SEARCH_RAVEL_BY_TITLE', payload: snapshot.val()})
        });
    }
}

/**
 * @param: category
 * @returns: 
 * state.search
 *      'SEARCH_RAVEL_BY_CATEGORY': a list of ravels with the same category
 * actions: attempts to filter ravels by category
 * 
 */
export const searchRavelByCategory = (category) => {

    return (dispatch) => {
        switch (ravel_category) {
            case 'fiction': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_fiction").equalTo(true).once('value', snapshot => {
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                });
            }
            case 'non_fiction': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_nonfiction").equalTo(true).once('value', snapshot => {
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                });
            }
            case 'other': {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_other").equalTo(true).once('value', snapshot => {
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                });
            }
            default: {
                firebase.database().ref(`/ravels/`).orderByChild("public_cat_other").equalTo(true).once('value', snapshot => {
                    dispatch({type: 'SEARCH_RAVEL_BY_CATEGORY', payload: snapshot.val()})
                });
            }
        }     
    }
}

/** ADMIN 
 * @param: ravel uid (unique id)
 * @returns: 
 * state.ravel
 *      'GET_RAVEL_META_DATA': a particular ravel object that contains its metadata 
 * actions: attempts to get a particular ravel object's metadata (public/private)
 */
export const getRavelMetaData = (ravel_uid) => {
    return (dispatch) => {
        firebase.database().ref(`/ravels/${ravel_uid}`).once('value', function (snapshot) {
            dispatch({ type: 'GET_RAVEL_META_DATA', payload: snapshot.val()})
        });
    }
}


/**
 * @param: ravel_uid
 * @returns: 
 * state.ravel
 *      'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE': an array of userProfile objects of all participants for a particular ravel
 * actions: attempts to get an array of userProfile objects of all participants for a particular ravel
 * 
 */
export const getAllRavelParticipantUserProfile = (ravel_uid) => {
    
    var all_participant_of_a_ravel = [];
    return (dispatch) => {    
        firebase.database().ref(`ravels/${ravel_uid}/ravel_participants`).orderByKey().once('value', function(snapshot) {
            console.log('snapshot value:' + snapshot.val());
            snapshot.forEach((childSnapShot) => {
                            if(childSnapShot.val() === true){
                                
                                firebase.database().ref(`/users/${childSnapShot.key}/userProfile`).once('value', function (snapshotChild){
                                    all_participant_of_a_ravel.push(snapshotChild.val());
                                    dispatch( {type: 'GET_ALL_RAVEL_PARTICIPANT_USER_PROFILE', payload: all_participant_of_a_ravel})                   
                                })
                            }})
            
        });  
    }

     
    
}

/**
 * @param: nothing
 * @returns: 
 * state.master_ravel 
 *      'ALL_RAVEL_FETCH': a list of all ravel objects 
 * actions: attempts to get a list of all ravel objects 
 */
export const loadAllRavel = () => {

    return (dispatch) => {
            firebase.database().ref(`/ravels/`)
            .once('value', function(snapshotRavels) {
                dispatch({ type: 'ALL_RAVEL_FETCH', payload: snapshotRavels.val()});
            });
    };
};


/**
 * @param: nothing
 * @returns: 
 * state.master_ravel 
 *      'ALL_PUBLIC_RAVEL_FETCH': a list of all public ravel objects 
 * actions: attempts to get a list of all public ravel objects 
 */
export const loadAllPublicRavel = () => {

    return (dispatch) => {

            firebase.database().ref(`ravels`).orderByChild(`visibility`).equalTo(true).once('value', (snapshotPublicRavel) => {
                dispatch({ type: 'ALL_PUBLIC_RAVEL_FETCH', payload: snapshotPublicRavel.val()});
            });           
    };
};

/**
 * @param: nothing
 * @returns: 
 * state.current_user_ravel:
 *      'ALL_NON_CREATED_CURR_USER_RAVEL' : a list of ravels that the current user is particpating in (but did not create) 
 * actions: gets the current user's participating ravels 
 * 
 */
export const loadNonCreatedCurrentUserRavel = () => {
    var currentUid = firebase.auth().currentUser.uid;

    return (dispatch) => {

        firebase.database().ref(`ravels`).orderByChild(`ravel_participants/${currentUid}`).equalTo(true).once('value', (snapshot) => {
            dispatch({ type: 'ALL_NON_CREATED_CURR_USER_RAVEL', payload: snapshot.val()})
        })

    }

   
}

/**
 * @param: nothing
 * @returns: 
 * state.current_user_ravel:
 *      'INITIAL_USER_RAVEL_FETCH' : a list of ravels that the current user created   
 * actions: gets the current user's created ravels 
 * 
 */
export const loadInitialUserCreatedRavel = () => {

    var currentUserUid = firebase.auth().currentUser.uid;

    return (dispatch) => {
            firebase.database().ref(`/users/${currentUserUid}/ravel_created`)
            firebase.database().ref(`/users`).orderByChild(`/${currentUserUid}/ravel_created`).once('value', (snapshot) => {

                snapshot.forEach((childSnapShot) => {
                    var uid_child = childSnapShot.key; 
                })
            })       
            .then(() => {              
                firebase.database().ref(`/users/${currentUserUid}/ravel_created`)                 
                .once('value', function(snapshotRavels) {
                    dispatch({ type: 'INITIAL_CREATED_CURR_USER_RAVEL_FETCH', payload:  snapshotRavels.val()});
                });
            })          
    };
};




/**
 * @param: ravel uid, a new set of ravel_tags[ARRAY]
 * @returns: 
 * state.ravel
 *      'UPDATE_RAVEL_TAG': returns true if successful 
 * actions: attempts to adds the new tags to the list of existing tags for a particular ravel
 */
export const updateRavelTag = (ravel_uid, ravel_tags) => {

    var get_curr_tags = {}; 

    return (dispatch) => {
     
        firebase.database().ref(`ravels/${ravel_uid}/public_tag_set`).once('value', (snapshot) => {
        get_current_tags = snapshot.val();

        })
        .then(() => {
            var m_tag_set = {};
            ravel_tags.forEach((elm) => { m_tag_set['public_' + elm] = true } );  
            var master = {...get_current_tags, ...m_tag_set};
            firebase.database().ref(`ravels/${ravel_uid}`).update({ public_tag_set : master });
            dispatch({ type: 'UPDATE_RAVEL_TAG', payload: true})
        })
        
    };

}

/**
 * @param: ravel uid, a new set of ravel participants[ARRAY]
 * @returns: 
 * state.ravel
 *      'UPDATE_RAVEL_PARTICIPANTS': returns true if successful, false if not.
 * actions: attempts to adds the new participants to the list of existing participants for a particular ravel
 *          if the ravel_par_number <= 4
 */
export const updateRavelParticipant = (ravel_uid, ravel_tags) => {

    var get_curr_tags = {}; 
    var get_curr_tags2 = [];

    return (dispatch) => {
        
        // Currently only checks if the ravel_number_participant is greater than 4. If I have time, I will add
        // error check on adding the same uid.
        firebase.database().ref(`ravels/${ravel_uid}/ravel_number_participants`).once('value', (snapshot) => {

            if (snapshot.val() >= 4) {
                
                    alert('Max number of ravel participant is 4.')
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
                        dispatch({ type: 'UPDATE_RAVEL_PARTICIPANTS', payload: true})
                    })
                    .then(() => {
            
                        firebase.database().ref(`ravels/${ravel_uid}/m_ravel_participants`).once('value', (snapshot) => {
                        get_curr_tags2 = snapshot.val();
                        var master_set = arrayUnique(get_curr_tags2.concat(ravel_tags));
                        firebase.database().ref(`ravels/${ravel_uid}`).update({m_ravel_participants : master_set})
                        })
            
                    })
    
            }
            
        }) 
       
    };

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

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: 
 * @returns: 
 * 
 */
export const insertTermsOfService = (terms_of_service) => {

    firebase.database().ref(`terms_of_service`).set({terms_of_service : terms_of_service});
    
}

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: 
 * @returns: 
 * 
 */
export const updateTermsOfService = (terms_of_service) => {

    firebase.database().ref(`terms_of_service`).update({terms_of_service : terms_of_service});
    
}

/** ADMIN RIGHTS: TODO: CHANGE THE FIREBASE RULES 
 * @param: nothing 
 * @returns: the current terms of service 
 * 
 */
export const readTermsOfService = () => {

    return (dispatch) => {
        firebase.database().ref(`terms_of_service`).once('value', (snapshot) => {
            dispatch({ type: 'GET_TERMS_OF_SERVICE', payload: snapshot.val()})
        });
    }
   
}

/**
 * 
 * @param {*} ravel_uid 
 * @returns: state.notification
 *      'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE' - sets 'true' if accepts, 'false' if does not accept 
 * actions: sets the ravel participant to 'true' if a user accepts the ravel invite. Updates the ravel_number_participant 
 *          field. 
 * 
 */
export const acceptRavelInvite = (ravel_uid) => {

    var currentUid = firebase.auth().currentUser.uid;                           
    var ravel_counter = 1;
    
    return (dispatch) => {

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
                        firebase.database().ref(`/users/${currentUid}/ravel_created/${ravel_uid}`).update({
                            ravel_number_participants: m_ravel_number_participants + ravel_counter
                        })
                    })

                })
                
                dispatch({type: 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE', payload: true})

            } else {
                dispatch({type: 'NOTIFICATION_RAVEL_PARTICIPANT_RESPONSE', payload: false})
            }
        })
    }
}

/**
 * 
 */
export const addAdminUser = (uid) => {

    return (dispatch) => {
        firebase.database().ref(`/admin`).push({uid:true});
    }
}

/**
 * 
 */
export const deleteUser = (user) => {


}