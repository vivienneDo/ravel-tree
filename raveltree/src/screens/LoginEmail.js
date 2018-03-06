// Author: Alex Aguirre
// Created: 01/24/18
// Modified: 03/05/18 by Frank Fusco (fr@nkfus.co)
//
// Email login screen for RavelTree.
//
// TODO: Password reset function.

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from '../Loader';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import LinkBack from '../components/LinkBack';
import RTLogoText from '../components/RTLogoText';
import InputForm from '../components/InputForm';
import TextSans from '../components/TextSans';
import TextLink from '../components/TextLink';
import ButtonSans from '../components/ButtonSans';

class LoginEmail extends Component {
  state = {
    email :  '',
    password: '',
    error: '',
    loading: false,
  };

  onPressRegister () {

  }

  onPressBack () {
    this.props.setActiveScreen ('Login');
  }

  onPressTermsAndPrivacy () {
    this.props.setPreviousScreen (this.constructor.name);
    this.props.setActiveScreen ('TermsAndPrivacy');
  }

  /* take in and store the user info on Firebase */
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


  render() {
    const {
      fieldStyles
    } = styles;

    return (
      <View style={styles.layout}>

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
            <TextLink size={16}>Reset it</TextLink>
          </View>

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

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
    showNavBar: state.showNavBar,
  };
}

export default connect (mapStateToProps)(LoginEmail);
