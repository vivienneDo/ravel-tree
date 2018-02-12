/* 

FB Login component
Instructions:
import FBLoginComponent from '../utils/FBLoginComponent'; 
in parent view to use 

*/ 
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import { updateUserProfile } from '../actions';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

class FBLoginComponent extends Component {

    render = () => {
        return (
            <LoginButton readPermissions = {['public_profile','email']}
            onLoginFinished = {
            (error, result) => {
                if (error) {
                alert("facebook login has error: " + result.error);
                } else if (result.isCancelled) {
                alert("facebook login is cancelled.");
                } else {
                console.log("Attempting to log into firebase through facebook");
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                        firebase.auth().signInWithCredential(credential)
                            .then((user) => {
                            let accessToken = data.accessToken;
                                const responseInfoCallback = (error, results) => {
                        if (error) {
                            console.log('Error fetching data from ' + error.toString());
                        }

                        else {
                            firebase.database().ref(`/users`).child(user.uid).once('value', function(snapshot) {
                                // Check null values if first time logging in with FB
                                if ((snapshot.val() === null)) {
                                    console.log('Success fetching data' + result.toString());
                                    console.log(results['first_name']);  
                                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/userProfile`)
                                    updateUserProfile(user, {first_name:results['first_name'],last_name:results['last_name'],bio:'',photoURL:'', stat_ravel_led:'', stat_passage_written:'', stat_ravel_contributed:'', 
                                        upvotes:'', ravel_points:'' });
                                }
                            });
                            
                        }
                    }
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken: accessToken,
                            parameters: {
                                fields: {
                                    string: 'first_name, last_name'
                                }
                            }
                        },
                        responseInfoCallback
                        
                    );

                    new GraphRequestManager().addRequest(infoRequest).start();
                            })
                            .catch(this.onAuthFailed.bind(this));

                        console.log('Attempting log in with facebook');
        
                }, (error) => {
                    console.log(error);
                    }
                )
                }
            }
            }
            onLogoutFinished={() => alert("logout.")}/>
        )

      }

}

export default FBLoginComponent;