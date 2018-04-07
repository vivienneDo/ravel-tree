// Author:   Alex Aguirre
// Created:  01/20/18
// Modified: 04/06/18 by Frank Fusco (fr@nkfus.co)
//
// "User Image" component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image
} from 'react-native';

import { connect } from 'react-redux'
import * as actions from '../actions';
import _ from 'lodash';

const DEFAULT_SIZE = 100;

const PLACEHOLDER_IMAGE = require('./img/user.png');

class UserImage extends Component {

  // Keeps track of whether the user is active or not
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.active,
      profile: this.props.profile,
      userID: this.props.userID,
      photoURL: undefined,
    };
  }

  componentWillReceiveProps (newProps) {
    var newID = newProps.userID;
    var oldID = this.props.userID;
    if (newID && newID != oldID) {
      // Get the profile associated with the user id.
      console.log ("Getting user profile for " + newID);
      this.props.getUserProfile (newID)
      .then  (userProfile => { this.setUserProfile (userProfile); })
      .catch (error => { console.log (error); });
    }
  }

  componentDidMount () {
    if (this.props.profile) {
      this.setState ({
        userID: this.props.profile.user_uid,
        photoURL: this.props.profile.photoURL,
      });
    }
    else {
      if (this.props.photoURL) {
        this.setState ({ photoURL: this.props.photoURL });
      }
      if (this.props.userID) {
        // Get the profile associated with the user id.
        console.log ("Getting user profile for " + this.props.userID);
        this.props.getUserProfile (this.props.userID)
        .then  (userProfile => { this.setUserProfile (userProfile); })
        .catch (error => { console.log (error); });
      }
    }
  }

  setUserProfile (userProfile) {
    console.log (userProfile);
    this.setState ({
      profile: userProfile,
      userID: userProfile.user_uid,
      photoURL: userProfile.photoURL,
    });
  }

  onPressImage () {
    // Navigate to user profile.
    var userID = this.state.userID;
    var screenData = Object.assign ({}, { userID });
    this.props.navigateForward ('Profile', this.props.activeScreen, screenData);
  }

  render() {

    const {
      size,
      userProfile,
      active,
      disabled,
    } = this.props;

    var image = this.state.photoURL ? (
      {uri: this.state.photoURL}
      ) : (
      PLACEHOLDER_IMAGE
    );

    const layoutStyles = [styles.layout];
    const imageStyles = [styles.image];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    layoutStyles.push ([
      this.props.size ?
        {width: size, height: size, borderRadius: size/2} :
        {width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: DEFAULT_SIZE/2},
    ]);
    imageStyles.push ([
      this.props.size ?
        {width: size, height: size, borderRadius: size/2} :
        {width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: DEFAULT_SIZE/2},
    ]);

    return (
      <Touchable style={layoutStyles} disabled={disabled} onPress={() => this.onPressImage ()}>

        <Image
          style = {[imageStyles, this.state.isActive ? styles.active : styles.inactive]}
          source = {image}
        />

      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
  },
  active: {
    borderColor: '#2E8AF7',
    borderWidth: 2,
  },
  inactive: {
    borderColor: '#95989A',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    userProfile,
  } = state.user;

  return {
    activeScreen,
    currentUserProfile,
    userProfile,
  };
}

export default connect (mapStateToProps)(UserImage);
