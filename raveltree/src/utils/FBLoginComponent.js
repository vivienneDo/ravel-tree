/* 
Name: FB Login component
Instructions to use: import FBLoginComponent from '../utils/FBLoginComponent'; into parent
Then, use the component as any other component 
ex: <FBLoginComponent/> 
*/ 

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity
  } from 'react-native';

import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions/backend';
import { updateUserProfile } from '../actions/backend';
import RTLogoText from '../components/RTLogoText';
import TextLink from '../components/TextLink';
import TextHeader from '../components/TextHeader'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

class FBLoginComponent extends Component {

    render = () => {
        const {
            form,
            fieldStyles,
            loginButtonArea,
            errorMessage,
            container,
            welcome,
            loginTest,
            gStyle,
            logoStyle
          } = styles;

        return (
            <LoginButton style = {styles.facebook} readPermissions = {['public_profile','email']}
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
                                // Check first time logging in, set the user profile infomation to null 
                                // along with FB first name, last name 
                                if ((snapshot.val() === null)) {
                                    console.log('Success fetching data' + result.toString());  
                                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/userProfile`)
                                    updateUserProfile(user, {first_name:results['first_name'],last_name:results['last_name'],bio:'',photoURL:'', stat_ravel_led:0, stat_passage_written:0, stat_ravel_contributed:0, 
                                        upvotes:0, ravel_points:0 });
                                        console.log('NEW UPDATE')
                                        firebase.database().ref(`/master_user_key/${user.uid}`).set({
                                            user_uid: true})
                                            .then(() => {
                                                firebase.database().ref(`notification_list/${user.uid}`).push({ type:'CREATE USER SUCCESS', passage: '', user: '', upvotes: 0})
                                            })
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
const styles = StyleSheet.create({

  facebook: {
    height: 35,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
  },

});


export default FBLoginComponent;