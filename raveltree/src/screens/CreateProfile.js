// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/10/18
// Modified: 04/19/18
//
// "Create Profile" screen for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import firebase from 'firebase';

import { connect } from 'react-redux'
import * as actions from '../actions';
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import TextHeader from '../components/TextHeader'
import UserImage from '../components/UserImage'
import InputText from '../components/InputText'
import Button from '../components/Button'

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      imageURL: '',
      firstName: '',
      lastName: '',
      bio: '',
      ...this.props.screenData,
    };
  }

   componentWillReceiveProps (newProps) {
     if (newProps.currentUserProfile) {
       this.props.setActiveScreen ('Home');
     }
   }

  onPressAddImage () {
    // TODO
  }

  onChangeFirstName (firstName) {
    this.setState ({
      firstName: firstName,
    });
  }

  onChangeLastName (lastName) {
    this.setState ({
      lastName: lastName,
    });
  }

  onChangeBio (bio) {
    this.setState ({
      bio: bio,
    });
  }

  onPressCreateProfile () {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var bio = this.state.bio;
    var photoURL = this.state.photoURL;
    // TODO: photoURL

    this.props.createUser (firstName, lastName, bio, photoURL);
    this.props.getCurrentUserProfile ();
  }

  render (){
    const {
      testID,
    } = this.props;

    return (
      <KeyboardAvoidingView style={styles.layout} behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.layout}>

            <View style={styles.logo}>
              <RTLogoText />
            </View>
            <TextHeader>Create your Profile</TextHeader>
            <View style={styles.top}>
              <View style={styles.topLeft}>
                {/* <UserImage {...this.props} size={100} /> */}
                <TextLink onPress={() => this.onPressAddImage ()} size={12}>Add Image</TextLink>
              </View>
              <View style={styles.topRight}>
                <InputText
                  placeholder={'First name'}
                  onChangeText={(firstName) => this.onChangeFirstName (firstName)}
                />
                <View style={styles.formSpacer} />
                <InputText
                  placeholder={'Last name'}
                  onChangeText={(lastName) => this.onChangeLastName (lastName)}
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <View style={styles.bio}>
                <InputText
                  placeholder={'Add your autobiography (e.g., "I was born in a log cabin in Illinois...").'}
                  onChangeText={(bio) => this.onChangeBio (bio)}
                  multiline
                  height={200}
                />
              </View>
              <Button
                disabled={this.state.firstName == '' || this.state.lastName == '' || this.state.bio == ''}
                onPress={() => this.onPressCreateProfile ()}
                title={'Create Profile'}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  topRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  },
  formSpacer: {
    height: 10,
  },
  bottom: {
    alignItems: 'center',
  },
  bio: {
    marginBottom: 20,
  },
  leftItem: {
    marginVertical: 6,
  },
  rightItem: {
    marginVertical: 1.8,
  },
  spaceBelow: {
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    showNavBar,
    screenData,
  } = state.navigation;

  const {
    currentUserProfile
  } = state.current_user;

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    currentUserProfile,
    screenData,
  };
}

export default connect (mapStateToProps)(Profile);
