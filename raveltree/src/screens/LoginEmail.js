// Author:   Alex Aguirre
// Created:  01/24/18
// Modified: 03/13/18 by Frank Fusco (fr@nkfus.co)
//
// Email login screen for RavelTree.
//
// TODO: Add email verification step

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button,
  BackHandler
} from 'react-native';

import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from '../Loader';
import firebase from 'firebase';

import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import LinkBack from '../components/LinkBack';
import RTLogoText from '../components/RTLogoText';
import InputForm from '../components/InputForm';
import TextSans from '../components/TextSans';
import TextLink from '../components/TextLink';
import ButtonSans from '../components/ButtonSans';

class LoginEmail extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      email :  '',
      password: '',
      error: '',
      loading: false,
    };

    this.onPressBack = this.onPressBack.bind(this);
  }

  componentWillMount() {
    console.log('Adding back handler.')
    BackHandler.addEventListener('hardwareBackPress', this.onPressBack);
  }

  componentWillUnmount() {
    console.log('Unmounting LoginEmail...')
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBack);
  }

  componentWillReceiveProps (newProps) {
    // If the user has a profile, just send them to the Home screen. Otherwise,
    // send them to the CreateProfile screen.
    if (newProps.currentUserProfile) {
      console.log('Active screen set to home')
      this.props.setActiveScreen ('Home');
      BackHandler.removeEventListener('hardwareBackPress');
    } else {
      this.props.setActiveScreen ('CreateProfile');
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  onPressLogin () {
    const {email, password} = this.state;
    this.setState({error: '', loading: true });
    this.props.signInWithEmail (email, password);
  }

  onPressRegister () {

    const {email, password} = this.state;

    // TODO: Add email verification step
   // this has been added to the "createUserWithEmail" function

    this.setState({error: '', loading: true });
    this.props.createUserWithEmail (email, password);
  }

  onPressBack () {
    this.props.navigateBack ();
    return true;
  }

  onPressTermsAndPrivacy () {
    this.props.setPreviousScreen (this.constructor.name);
    this.props.setActiveScreen ('TermsAndPrivacy');
  }

  onPressResetPassword () {
    this.props.navigateForward ('PasswordReset', this.constructor.name);
  }

  render() {
    const {
      fieldStyles
    } = styles;

    //KAViewBehavior = Platform.OS === 'android' ? ____ : 'padding';

    return (
      <KeyboardAvoidingView style={styles.layout} behavior={'padding'}>

        <LinkBack onPress={() => this.onPressBack ()}/>

        <View style={styles.logo}>
          <RTLogoText size={60} />
        </View>

        <View style={styles.content}>



          <View style={styles.inputs}>
            <View style={styles.input}>
              <InputForm
                placeholder = {'Email'}
                placeholderTextColor = {'#939393'}
                //text = {this.state.email}
                onChangeText={email => this.setState({email: email})}
              />
            </View>

            <View style={styles.input}>
              <InputForm
                placeholder = {'Password'}
                placeholderTextColor = {'#939393'}
                //text={this.state.password}
                onChangeText={password => this.setState({password: password})}
                password={true}
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <ButtonSans
              title={'Register'}
              color={'#2E8AF7'}
              width={'32%'}
              disabled={this.state.email == '' || this.state.password == ''}
              onPress={() => this.onPressRegister ()}
            />
            <View style={styles.buttonSpacer} />
            <ButtonSans
              title={'Log In'}
              color={'#3BB54A'}
              width={'32%'}
              disabled={this.state.email == '' || this.state.password == ''}
              onPress={() => this.onPressLogin ()}
            />
          </View>

          <View style={styles.forgot}>
            <TextSans size={16} color={'#969696'}>Forgot your password?</TextSans>
            <Text>&nbsp;&nbsp;</Text>
            <TextLink onPress={() => this.onPressResetPassword ()} size={16}>Reset it</TextLink>
          </View>

          <TextLink size={12} onPress={() => this.onPressTermsAndPrivacy ()}>Terms and Privacy</TextLink>

        </View>

        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
  },
  logo: {
    // zIndex: 0,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%',
    //height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
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
  inputs: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonSpacer: {
    width: 40,
  },
  forgot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    showNavBar,
  } = state.navigation;

  const {
    currentUserProfile
  } = state.current_user;

  return {
    activeScreen,
    showNavBar,
    currentUserProfile,
  };
}

export default connect (mapStateToProps)(LoginEmail);
