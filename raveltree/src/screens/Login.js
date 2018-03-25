// Author: Alex Aguirre and Vivienne Do
// Created: ?
// 
//
// Login screen for RavelTree.
//
// TODO: Facebook authentication ->
//       Set global user data via Redux function ->
//       Navigate to Home screen
/**
 * LOGS
 * 03/05/18 - Modified by Frank Fusco (fr@nkfus.co) 
 * 03/25/18 - VD Do - Changed Facebook button to use FBLoginComponent 
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
import Loader from '../Loader';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText';
import TextLink from '../components/TextLink';
import TextHeader from '../components/TextHeader'
import FBLoginComponent from '../utils/FBLoginComponent';

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


class Login extends Component {
  constructor (props: any, context: any) {
    super (props, context);
    this.state = {
        email :  '',
        password: '',
        error: '',
        loading: false,
    };
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
    // TODO: Google Login.
    // For now, just pretends the user is authenticated.
    this.props.setActiveScreen ('Home');

    // const {email, password} = this.state;
    // this.setState({error: '', loading: true });
    //
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(this.onAuthSuccess.bind(this))
    //   .catch(() => {
    //       firebase.auth().createUserWithEmailAndPassword(email, password)
    //           .then(this.onAuthSuccess.bind(this))
    //           .catch(this.onAuthFailed.bind(this));
    //   });
  }

  onPressSignInWithAnEmailAddress () {
    this.props.setPreviousScreen (this.constructor.name);
    this.props.setActiveScreen ('LoginEmail');
  }

  onPressTermsAndPrivacy () {
    this.props.setPreviousScreen (this.constructor.name);
    this.props.setActiveScreen ('TermsAndPrivacy');
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

  onLoginFinished (error, result) {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
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

  renderLoader() {
      if (this.state.loading) {
          return <Loader size="large"/>;
      }
      else {
          return (
          <View style = {styles.google}>
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
      <View style={styles.layout}>
        <Text style={styles.debug}>{this.state.error}</Text>
        <View style={styles.logo}>
          <RTLogoText size={60} />
        </View>
        <View style={styles.content}>
          <View style = {styles.buttons}>
            {/* Facebook button */}
            <FBLoginComponent
              // style = {styles.facebook}
              // readPermissions = {['public_profile','email']}
              // onLoginFinished = {
              //   (error, result) => {this.onLoginFinished (error, result)}
              // }
              // onLogoutFinished={() => alert("logout.")}
            />
            {/* Google button */}
            <View>
              {this.renderLoader()}
            </View>
          </View>
          <View style={styles.or}>
            <TextHeader color={'#969696'}>Or</TextHeader>
          </View>
          <View style={styles.emailLink}>
            {/* Takes the user to the email login page */}
            <TextLink size={18} onPress={() => this.onPressSignInWithAnEmailAddress ()}>Sign in with an email address</TextLink>
          </View>
          {/* Terms and Privacy */}
          <TextLink size={12} color={'#2e8af7'} onPress={() => this.onPressTermsAndPrivacy ()}>
            Terms and Privacy
          </TextLink>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
  },
  debug: {
      position: 'absolute',
      top: 10,
      fontSize: 15,
      color: 'red',
      alignSelf: 'center',
  },
  logo: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  buttons : {
    alignItems: 'center',
  },
  facebook: {
    height: 35,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
  },
  google: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 330,
  },
  or: {
    marginBottom: 10,
  },
  emailLink: {
    marginBottom: '10%',
  },


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
     //marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    showNavBar,
  } = state.navigation;

  return {
    activeScreen,
    showNavBar,
  };
}

export default connect (mapStateToProps)(Login);
