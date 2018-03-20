// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  03/19/18

// Standard concept popup component for RavelTree.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View, ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';
import { connect } from 'react-redux'
import _ from 'lodash';

import ModalContainer from './ModalContainer'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

export default class ConceptPopup extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {
      title,
      ravelID,
      score,
      concept,
      onPressClose,
      testID,
    } = this.props;

    const participantCount = this.props.participants.length;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='PassagePopup' isActive onPressClose={() => this.props.onPressClose ()}>
        <View style={styles.head}>
          <View style={styles.left}>
            <View style={styles.userImage}>
              <UserImage {...this.props} size={26}  />
            </View>
            <TextSerif size={16}>{title}</TextSerif>
          </View>
          <View style={styles.right}>
            <View style={styles.users}>
              <IconUser size={20} />
              <TextSerif style={styles.headText} size={20}>{participantCount}</TextSerif>
            </View>
            <View style={styles.score}>
              <IconLeaf size={20} />
              <TextSerif style={styles.headText} size={20}>{score}</TextSerif>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            <TextSans style={styles.concept} size={16}>
              {concept}
            </TextSans>
          </View>
        </ScrollView>
      </ModalContainer>
    )
  }
}

const styles = StyleSheet.create ({
  head: {
    paddingLeft: 17,
    paddingRight: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: {

  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll: {
    marginTop: 20,
    marginBottom: 14,
  },
  scrollContent: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  userImage: {
    marginRight: 10,
  },
  concept: {

  },
});
