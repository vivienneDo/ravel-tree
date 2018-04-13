// Author: Alex Aguirre and Vivienne Do
// Created: ?
// Modified: 02/23/18 by Frank Fusco (fr@nkfus.co)
//
// Login screen for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import MainPage from './MainPage';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


const GeneralLoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();

    // google sign in button design
const GLoginButton = MKButton.coloredButton()
    .withText('Sign in with Google')
    .withTextStyle({
        color: 'white',
        fontWeight: 'bold'
    })
    .withBackgroundColor('#1E88E5')
    .build();

export default class Login extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      email :  '',
      password: '',
      error: '',
      loading: false,
    };

    console.log ('Test');

  }

  onButtonPress() {
      const {email, password} = this.state;
      this.setState({error: '', loading: true });

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onAuthSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onAuthSuccess.bind(this))
                .catch(this.onAuthFailed.bind(this));
        });
  }

onGButtonPress() {
    const {email, password} = this.state;
    this.setState({error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(this.onAuthSuccess.bind(this))
              .catch(this.onAuthFailed.bind(this));
      });
}

  onAuthSuccess() {
      this.setState({
        email :  '',
        password: '',
        error: '',
        loading: false,
      });
  }

  onAuthFailed() {
      this.setState({
          error: 'Authenticiation Failed',
          loading: false,
      });
  }

  renderLoader() {
      if (this.state.loading) {
          return <Loader size="large"/>;
      }
      else {
          return (
          <View style = {styles.gStyle}>
        {/*  <GeneralLoginButton
             onPress = {this.onButtonPress.bind(this)}
        /> */}
          <GLoginButton
            onPress = {this.onGButtonPress.bind(this)}
          />
           </View>
          );
      }
  }

  render() {
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
    <ScrollView showsVerticalScrollIndicator = {false}>

    <Text></Text>
      <View >

        <Text></Text>

        {/* Logo */}
        <Text style = {{alignSelf: 'center', paddingBottom: 50, paddingTop: 250}}>
            <Text style = {styles.logoStyleBlue}>
                ravel
            </Text>
            <Text style = {styles.logoStyleGreen}>
                tree
            </Text>
        </Text>

        {/* login buttons */}
        <View style = {styles.loginTest}>

            {/* Facebook Login */}
            <LoginButton
            style = {styles.fbStyle}
            readPermissions = {['public_profile','email']}

            onLoginFinished = {
            (error, result) => {
                if (error)
                {
                alert("login has error: " + result.error);
                }
                else if (result.isCancelled) {
                alert("login is cancelled.");
                }
                else {
                console.log("Attempting to log into firebase");
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                        firebase.auth().signInWithCredential(credential)
                        .then(this.onAuthSuccess.bind(this))
                        .catch(this.onAuthFailed.bind(this));

                        console.log('Attempting log in with facebook');
                    }, (error) => {
                        console.log(error);
                    }
                )
                    // Go to MainPage here
                    console.log("Lol");
                }
                }
            }
            onLogoutFinished={() => alert("logout.")}/>

            {/* moved the google login to be with the facebook login  */}
            <View>
                {this.renderLoader()}
            </View>

          </View>

          <Text
          style = {{alignSelf: 'center',
          color: '#969696', fontWeight: 'bold'}}>
                OR
            </Text>

        {/* takes the user to the email login page */}
        <Button
            title = "Sign in with an email address"
        />

        {/* the terms and privacy */}
        <TouchableOpacity
        style = {{alignItems: 'center', paddingTop: 80}}>
            <Text style = {{fontSize: 12, color: '#2e8af7'}}>
                Terms and Privacy
            </Text>
        </TouchableOpacity>

        <Text style={errorMessage}>
            {this.state.error}
        </Text>

      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
        paddingTop: 20
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
       // marginTop: 20,
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
    },
    loginTest : {
        alignItems: 'center',
    },
    gStyle: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 330
    },
    logoStyleBlue: {
        color: '#2e8af7',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Iowan Old Style',
    },
    logoStyleGreen: {
        color: '#3bb54a',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Iowan Old Style',
    },
    fbStyle: {
        height: 35,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 300
    }
});
