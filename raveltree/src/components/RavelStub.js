// Author:   Alex Aguirre
// Created:  02/03/18
// Modified: 02/15/18 by Frank Fusco (fr@nkfus.co)
//
// "Ravel Stub" component for RavelTree.
//
// TODO: Make entire stub touchable and link to content.

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

import UserImage from './UserImage'
import TextSerif from './TextSerif'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

export default class RavelStub extends Component<{}> {

  render() {
    const {
      ravel,
      users,
      score,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View style = {styles.container}>
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
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
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
