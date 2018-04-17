const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();
exports.upVoted = functions.database.ref('/passages/{ravelId}/{passageId}/passage_upvote')
    .onUpdate((change, context) => {
        const before = change.before.val();
        const after = change.after.val();
        const user_uid = context.auth.uid;

        if (before !== after) {
            console.log('Handling new up vote value');

            // Future: Post notification to OneSignal. 
            // Kick off promise to create new section in notification table.

            return admin.database().ref('/passages/' + context.params.ravelId + '/' + context.params.passageId).once('value')
                .then((snapshot) => {
                    var passage = snapshot.val();

                    var type = 'upvoted';
                    var authorOfPassage = passage['user_created'];
                    var ravel_uid = passage['ravel_uid'];
                    var passage_title = passage['passage_title'];
                    var passage_uid = passage['passage_uid'];
                    var upvotes = passage['passage_combined_vote'];    
                    
                    return admin.database().ref('/users/' + user_uid + '/userProfile/first_name').once('value')
                    .then((snapshot) => {
                        return admin.database().ref('/notifications/' + authorOfPassage + '/').push({type, user_uid, first_name: snapshot.val(), ravel_uid, passage_uid, passage_title, upvotes});
                    });
                });

        } else {
            console.log('Old up vote value');
            return null;            
        }
    });

exports.invitation = functions.database.ref('/ravels/{ravelId}/ravel_participants')
    .onWrite((change, context) => {
        const before = change.before.val();
        const after = change.after.val();

        // If after is null, no notifications will need to be handled.
        if (after === null) {
            console.log('After is null. Returning...');
            return null;
        }

        // If before is the same as after, no notifications will need to be handled.
        if (before === after) {
            console.log('Nothing changed. Returning...');
            return null;
        }

        return admin.database().ref('/ravels/' + context.params.ravelId).once('value')
        .then((snapshot) => {
            var ravel = snapshot.val();
            var userCreated = ravel['user_created'];
            var ravel_uid = ravel['ravel_uid'];
            var passage_title = ravel['ravel_title'];
            var passage_uid = ravel_uid;
        
            var newNotifs = [];

            Object.keys(after).forEach(key => {
                var type;

                if (before !== null && before.hasOwnProperty(key) && before[key] !== after[key]) {
                    type = 'invitationAccepted';
                    console.log('Creating invitation accepted notification');
                    var invitationAcceptedNotification = createNotification(key, userCreated, type, ravel_uid, passage_uid, passage_title);
                    newNotifs.push(invitationAcceptedNotification);
                } else if (before === null || !before.hasOwnProperty(key)){
                    type = 'invitation';
                    console.log('Creating invitation notification');
                    var invitationNotification = createNotification(userCreated, key, type, ravel_uid, passage_uid, passage_title);
                    newNotifs.push(invitationNotification);
                }
            });

            return Promise.all(newNotifs);
        });
    });



function createNotification(user_uid, userCreated, type, ravel_uid, passage_uid, passage_title) {
    return admin.database().ref('/users/' + user_uid + '/userProfile/first_name').once('value')
        .then((snapshot) => {
            return admin.database().ref('/notifications/' + userCreated + '/').push({ type, user_uid, first_name: snapshot.val(), ravel_uid, passage_uid, passage_title });
        });
}

//exports.newParticipant


