// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/13/18
// Modified: 03/13/18
//
// Password Reset screen for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button
} from 'react-native';

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
import TextHeader from '../components/TextHeader';
import ButtonSans from '../components/ButtonSans';

class PasswordReset extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      email :  '',
      error: '',
      loading: false,
      completed: false,
    };
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  onPressReset () {
    this.props.userResetPassword (this.state.email);
    this.props.navigateBack ();
  }

  render() {
    return (
      <View style={styles.layout}>

        <LinkBack onPress={() => this.onPressBack ()}/>

        <View style={styles.logo}>
          <RTLogoText size={60} />
        </View>

        <View style={styles.content}>
          <View style={styles.instructions}>
            <TextSans size={16}>Enter your email address to reset your password:</TextSans>
          </View>

          <View style={styles.inputs}>
            <View style={styles.input}>
              <InputForm
                placeholder = {'Email'}
                placeholderTextColor = {'#939393'}
                //text = {this.state.email}
                onChangeText={email => this.setState({email: email})}
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <ButtonSans
              title={'Reset'}
              color={'#2E8AF7'}
              width={'32%'}
              disabled={this.state.email == ''}
              onPress={() => this.onPressReset ()}
            />
          </View>

          <View style={styles.bottomSpacer} />

          <TextLink size={12} onPress={() => this.onPressTermsAndPrivacy ()}>Terms and Privacy</TextLink>

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
  instructions: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginBottom: 20,
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
  bottomSpacer: {
    height: 56,
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

export default connect (mapStateToProps)(PasswordReset);
