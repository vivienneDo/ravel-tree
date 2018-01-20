import firebase from 'firebase';

export const getUserProfile = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .on('value', snapshot => {
            dispatch({ type: 'GET_USER_PROFILE', payload: snapshot.val() });
        });
    };
};

export const updateUserProfile = ({ first_name, last_name, bio, photoURL}) => {
    const { currentUser } = firebase.auth();

    console.log(first_name);
    console.log(last_name);
    console.log(bio);
    console.log(photoURL);
    console.log(currentUser.uid);

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

    // return (dispatch) => {
        
    // };
};

export const updateUserStat = ({ stat_ravel_led, stat_ravel_contributed, stat_passage_written }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .push({ stat_ravel_led, stat_ravel_contributed, stat_passage_written })
        .then(() => {
            dispath({type: 'UPDATE_USER_STAT'});
        });
    };
};

export const updateUserUpVote = (upvotes) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        .push(upvotes)
        .then(() => {
            dispath({type: 'UPDATE_USER_STAT'});
        });
    };
};

export const updateUserRavelPoint = (ravel_points) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/userProfile`)
        push(ravel_points)
        .then(() => {
            dispatch({type: 'UPDATE_USER_RAVEL_POINT'});
        });
    };
};


