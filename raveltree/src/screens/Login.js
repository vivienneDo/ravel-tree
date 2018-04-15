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
 * 004/07/18 - VD Do - Please take this change when resolving conflicts!! Changed Facebook button to use FBLoginComponent
 * 04/13/18 - VD Do - binded onSuccess and onFail to fb component
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback
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

// Google sign-in button design
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
      loggedIn: false,
    };

    this.onFBAuthSuccess = this.onFBAuthSuccess.bind(this);
    this.onFBAuthFailed = this.onFBAuthFailed.bind(this);
  }

  componentDidMount () {
    if (!firebase.auth ().currentUser) {
      this.props.userLogOff ();
      FBSDK.LoginManager.logOut ();
    }
  }

  componentWillReceiveProps (nextProps) {
    // If the user has a profile, just send them to the Home screen. Otherwise,
    // send them to the CreateProfile screen.
    if (nextProps.currentUserProfile) {
      this.props.setActiveScreen ('Home');
    } else {
      this.props.setActiveScreen ('CreateProfile');
    }
  }

  onGButtonPress() {
    // TODO: Google Login.
    // For now, just authenticates a test user automatically.
    this.setState({error: '', loading: true });
    this.props.signInWithEmail ('test@test.com', 'Test123!');

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

  // onFBLogin (error, result) {
  //   if (error) {
  //     alert("Login error: " + result.error);
  //   } else if (result.isCancelled) {
  //     alert("Login cancelled.");
  //   } else {
  //   console.log("Attempting to log into Firebase...");
  //   AccessToken.getCurrentAccessToken().then(
  //     (data) => {
  //       console.log('Attempting log in with Facebook...');
  //       const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  //       firebase.auth().signInWithCredential(credential)
  //       .then(this.onFBAuthSuccess.bind(this))
  //       .catch(this.onFBAuthFailed.bind(this));
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   )}
  // }

  onFBAuthSuccess() {
    this.setState({
      email :  '',
      password: '',
      error: '',
      loading: true,
      loggedIn: true,
    });

    this.props.getCurrentUserProfile ();
  }

  onFBAuthFailed() {
    this.setState({
      error: 'Authenticiation Failed',
      loading: false,
    });
  }

  renderLoader() {
    if (this.state.loading) {
      return <Loader size="large"/>;
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
                onSuccess = {this.onFBAuthSuccess}
                onFailure = {this.onFBAuthFailed}
            />
            {/* <LoginButton
              style = {styles.facebook}
              readPermissions = {['public_profile','email']}
              onLoginFinished = {
                (error, result) => {this.onFBLogin (error, result)}
              }
              onLogoutFinished={() => {
                this.props.userLogOff ();
                alert("Logged out.");
              }}
            /> */}

            {this.renderLoader()}

            {/* Google button */}
            <View style = {styles.google}>
              <GLoginButton onPress = {this.onGButtonPress.bind(this)} />
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

  const {
    currentUserProfile,
  } = state.current_user;

  return {
    activeScreen,
    showNavBar,
    currentUserProfile,
  };
}

export default connect (mapStateToProps)(Login);
