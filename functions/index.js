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

            // var type = 'upvoted';
            // var authorOfPassage = after['user_created'];
            // var user_uid = context.auth.uid;
            // var ravel_uid = after['ravel_uid'];
            // var passage_title = after['passage_title'];
            // var passage_uid = after['passage_uid'];
            // var upvotes = after['passage_combined_vote'];


        

        } else {
            console.log('Old up vote value');
            return null;            
        }
    });

