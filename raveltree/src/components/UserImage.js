// Author:   Alex Aguirre
// Created:  01/20/18
// Modified: 03/13/18 by Frank Fusco (fr@nkfus.co)
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

class UserImage extends Component<{}> {

  // Keeps track of whether the user is active or not
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.active,
      photoURL: this.props.currentUserProfile.photoURL,
    };
  }

  componentWillMount () {
    //TODO: Extend for other user images! this.props.getCurrentUserProfile ();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentUserProfile) {
      this.setState ({
        isActive: newProps.active,
        photoURL: newProps.currentUserProfile.photoURL
      });
    }
}

  render() {

    const {
      size,
      active,
      disabled,
    } = this.props;

    // Uses a test image for now – will update later to dynamic image stored
    // in Firebase.
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
      <Touchable style={layoutStyles} disabled={disabled} >

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
    currentUserProfile,
  } = state.current_user;

  return {
    currentUserProfile,
  };
}

export default connect (mapStateToProps)(UserImage);
