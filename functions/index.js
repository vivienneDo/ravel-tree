const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();
exports.upVoted = functions.database.ref('/passages/{ravelId}/{passageId}')
    .onUpdate((change, context) => {
        const before = change.before.val();
        const after = change.after.val();

        var previousUpVoteValue = before['passage_upvote'];
        var newUpVoteValue = after['passage_upvote'];

        if (newUpVoteValue !== previousUpVoteValue) {
            console.log('Handling new up vote value');

            var type = 'upvoted';
            var authorOfPassage = after['user_created'];
            var user_uid = context.auth.uid;
            var ravel_uid = after['ravel_uid'];
            var passage_title = after['passage_title'];
            var passage_uid = after['passage_uid'];
            var upvotes = after['passage_combined_vote'];

            // Future: Post notification to OneSignal. 
            // Kick off promise to create new section in notification table.
        
            return admin.database().ref('/users/' + user_uid + '/userProfile/first_name').once('value')
            .then((snapshot) => {
                return admin.database().ref('/notifications/' + authorOfPassage + '/').push({type, user_uid, first_name: snapshot.val(), ravel_uid, passage_uid, passage_title, upvotes});
            });
        } else {
            console.log('Old up vote value');
            return null;            
        }
    });

