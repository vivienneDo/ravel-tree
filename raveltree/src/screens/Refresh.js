// Author:   Frank Fusco (fr@nkfus.co)
// Created:  04/07/18
// Modified: 04/07/18
//
// "Refresh" screen for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import Loader from '../components/Loader'

class Refresh extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    this.props.setActiveScreen (this.props.screenData._targetScreen, this.props.screenData);
  }

  render (){
    return (
      <View style={styles.layout}>
        <Loader /*size={60}*/ />
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
    screenData,
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    screenData,
  };
}

export default connect (mapStateToProps)(Refresh);
