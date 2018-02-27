// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 02/27/18
//
// "Passage Stub" component for RavelTree.
//
// TODO: Make entire stub touchable and link to content (modal).

import React, {Component} from 'react';
import {
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
import TextSans from './TextSans'
import IconLeaf from './IconLeaf'

export default class PassageStub extends Component<{}> {

  render() {
    const {
      name,
      author,
      passageID,
      score,
      active,
      testID,
    } = this.props;

    var containerStyles = [
      styles.container,
      active ? {borderColor: '#2E8AF7'} : undefined,
    ];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View style = {containerStyles}>
        <View style={styles.left}>
          <View style={styles.userImage}>
            <UserImage size={26} />
          </View>
          <TextSans size={12}>{this.props.name}</TextSans>
        </View>
        <View style={styles.right}>
          <View style={styles.passageID}>
            <TextSans size={13} color={'#95989A'}>{passageID}</TextSans>
          </View>
          <View style={styles.score}>
            <IconLeaf />
            <View style={styles.scoreText}>
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
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
    paddingVertical: 2,
    paddingRight: 6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 15,
  },
  userImage: {
    marginRight: 7,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passageID: {
    marginRight: 8,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    paddingBottom: 4,
  },
});
