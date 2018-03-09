// Author:   Alex Aguirre
// Created:  02/03/18
// Modified: 03/09/18 by Frank Fusco (fr@nkfus.co)
//
// "Ravel Stub" component for RavelTree.
//
// TODO: Make stub link to content.
// TODO: Align users and ravel scores (so they appear in columns when stacked).

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';
import * as actions from '../actions';

import UserImage from './UserImage'
import TextSerif from './TextSerif'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

class RavelStub extends Component<{}> {
  constructor (props) {
    super (props);
  }

  onPressStub () {
    var screenData = Object.assign ({}, {ravelID: this.props.ravelID});
    this.props.navigateForward ('Ravel', this.constructor.name, screenData);
  }

  render() {
    const {
      ravel,
      ravelID,
      users,
      score,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable onPress={() => this.onPressStub ()} style={styles.container}>
        <View style={styles.left}>
          <View style={styles.userImage}>
            <UserImage size={26} />
          </View>
          <TextSerif size={16}>{this.props.ravel}</TextSerif>
        </View>
        <View style={styles.right}>
          <View style={styles.users}>
            <View style={styles.hpad}>
              <IconUser />
            </View>
            <View style={styles.hpad}>
              <TextSerif size={16}>{this.props.users}</TextSerif>
            </View>
          </View>
          <View style={styles.score}>
            <View style={styles.hpad}>
              <IconLeaf />
            </View>
            <View style={styles.hpad}>
              <TextSerif size={16}>{this.props.score}</TextSerif>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    marginRight: 7,
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hpad :{
    paddingHorizontal: 2,
  }
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(RavelStub);
