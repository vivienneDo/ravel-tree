// Author: Alex Aguirre
// Created: 01/24/18
// Modified: 02/17/18 by Frank Fusco (fr@nkfus.co)
//
// Splash screen for RavelTree.
//
// TODO: Make sure the status bar doesn't show when this screen does.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'

class Splash extends Component {
  constructor (props) {
    super (props);
  }

  render (){
    const {
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <RTLogoText size={60} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    showNavBar,
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
    showNavBar,
  };
}

export default connect (mapStateToProps)(Splash);