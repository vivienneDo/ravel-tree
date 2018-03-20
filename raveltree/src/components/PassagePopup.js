// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  03/19/18

// Standard passage popup component for RavelTree.
//
// TODO: Make ravel, title, and ID touchable and link to respective content.
// TODO: Add VoteBar

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

import ModalContainer from './ModalContainer'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import ButtonReverse from './ButtonReverse'
import Button from './Button'
import ButtonPlus from './ButtonPlus'


export default class PassagePopup extends React.Component {
  constructor (props) {
    super (props);
  }

  componentWillReceiveProps (newProps) {

  }

  onPressMerge () {
    // TODO
  }

  onPressFork () {
    // TODO
  }

  onPressAdd () {
    this.props.onSwitchToAdd (this.props.passageMetaData);
  }

  render () {
    const {
      isActive,
      passageMetaData,
      testID,
    } = this.props;

    var ravel = passageMetaData.ravel_title;
    var passageIndex = passageMetaData.passage_index;
    var title = passageMetaData.passage_title;
    var passage = passageMetaData.passage_body;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='PassagePopup' isActive={this.props.isActive} onPressClose={() => this.props.onPressClose ()}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <TextSerif size={16}>{ravel}</TextSerif>
            <TextSans size={13} color={'#95989A'}>{passageIndex}</TextSans>
          </View>
          <View style={styles.row2}>
            <TextSans size={13} color={'#95989A'}>{title}</TextSans>
            <UserImage {...this.props} size={26}/>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            <TextSerif>
              {passage}
            </TextSerif>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <ButtonReverse title={'Merge...'} width={0.30 * width} onPress={() => this.onPressMerge ()} />
          <ButtonPlus size={36} onPress={() => this.onPressAdd ()} />
          <Button title={'Fork'} width={0.30 * width} onPress={() => this.onPressFork ()} />
        </View>
      </ModalContainer>
    )
  }
}

const styles = StyleSheet.create ({
  head: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scroll: {
    marginTop: 6,
    marginBottom: 20,
  },
  scrollContent: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 21,
    paddingRight: 21,
  },
});
