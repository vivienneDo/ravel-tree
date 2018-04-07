// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  03/28/18

// Standard "Add passge" popup component for RavelTree.
//
// TODO: onPressAdd ()

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
import Button from './Button'
import InputText from './InputText'

class AddPopup extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      title: '',
      passage: '',
    };
  }

  switchToPassage (passageMetaData) {
    // Triggered after Add button is pressed and the passage is ready.
    if (passageMetaData) {
      this.props.onSwitchToPassage (passageMetaData);
    }
  }

  onPressAdd () {
    const ravelID = this.props.ravelID;
    const title = this.state.title;
    const passage = this.state.passage;

    if (this.props.passageIndex == '1-A' || !this.props.passageIndex) {
        this.props.addInitialPassage ({
          ravel_uid: ravelID,
          passage_title: title,
          passage_body: passage,
        })
      .then (passageMetaData => {
        this.props.onAdd ();
        this.switchToPassage (passageMetaData);
      })
      .catch (error => { console.log (error); });
    } else {
      this.props.addPassage ({
        ravel_uid: ravelID,
        parent_passage_uid: this.props.passageMetaData.passage_uid,
        passage_title: title,
        passage_body: passage,
      })
      .then (passageMetaData => { this.switchToPassage (passageMetaData) })
      .catch (error => { console.log (error); });
    }
  }

  onChangeTitle (text) {
    this.setState ({ title: text });
  }

  onChangePassage (text) {
    this.setState ({ passage: text });
  }

  getNextPassageIndex (current) {
    // Find next available PassageIndex at the next level. E.g.: If current is
    // 4-B and there are already 3 passages at level 5, then next should be 5-D.
    split = current.split ('-');
    number = parseInt (split [0]);
    nextNumber = number + 1;

    if ((this.props.nodeCounts || {}) [nextNumber]) {
      var nodesAtNextLevel = this.props.nodeCounts [number];
      var nextLetterIndex = nodesAtNextLevel + 1;
      var nextLetters = '';

      // Converts the numeric index to base 26.
      while (nextLetterIndex > 0) {
        nextLetterIndex--; // 1 -> a, not 0 -> a
        var remainder = nextLetterIndex % 26;
        var digit = String.fromCharCode (remainder + 97);
        nextLetters = nextLetters + digit;
        nextLetterIndex = (nextLetterIndex - remainder) / 26;
      }
      // Reverse the string (because we constructed it backwards).
      nextLetters = nextLetters.split ("").reverse ().join ("");

      // Make sure the letters are uppercase.
      nextLetters = nextLetters.toUpperCase ();

      return nextNumber + '-' + nextLetters;
    } else {
      return nextNumber + '-A';
    }
  }

  render () {
    var {
      isActive,
      passageIndex,
      nodeCounts,
      passageMetaData,
      testID,
    } = this.props;

    // If we haven't been passed the passage index for the new passage...
    if (!passageIndex) {
      // Check whether we've recieved the metadata from the parent passage.
      if (passageMetaData) {
        // If so, generate the next available passage index (for display purposes only).
        passageIndex = this.getNextPassageIndex (passageMetaData.passage_index);
      } else {
        // If not, assume this is 1-A.
        passageIndex = '1-A';
      }
    }

    const ravel = this.props.title;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
        <ModalContainer name='PassagePopup' isActive={isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}} onPressClose={() => this.props.onPressClose ()}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.row1}>
                <TextSerif size={16}>{ravel}</TextSerif>
                <TextSans size={13} color={'#95989A'}>{passageIndex}</TextSans>
              </View>
              <View style={styles.row2}>
                <InputText width={'auto'} placeholder={'Type a passage name (e.g., "The Reckoning").'} onChangeText={(text) => this.onChangeTitle (text)} />
                <UserImage {...this.props} userID={this.props.currentUserProfile.user_uid} size={26}/>
              </View>
            </View>
            <View style={styles.passage}>
              <InputText height={'100%'} multiline placeholder={'Type your passage (e.g., "It was a dark and stormy night...").'} onChangeText={(text) => this.onChangePassage (text)}/>
            </View>
            <View style={styles.foot}>
              <View style={styles.footText}>
                <TextSans size={12} color={'#808080'}>This will be passage {passageIndex}</TextSans>
                <TextSans size={12} color={'#808080'}>(Number {passageIndex.split ('-') [0]}, Version {passageIndex.split ('-') [1]}).</TextSans>
              </View>
              <Button
                title={'Add'}
                width={0.30 * width}
                disabled={!this.state.title || !this.state.passage}
                onPress={() => this.onPressAdd ()}
              />
            </View>
          </View>
        </ModalContainer>
    )
  }
}

const styles = StyleSheet.create ({
  container : {
    //height: '100%',
    flex: 1,
  },
  head: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passage: {
    flex: 1,
    marginTop: 6,
    marginBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 21,
    paddingRight: 21,
  },
});

const mapStateToProps = (state) => {
  const {
    currentUserProfile,
  } = state.current_user;

  const {
    passage,
    passage_meta_data,
  } = state.passage;

  return {
    currentUserProfile,
    passage,
    passage_meta_data,
  };
}

export default connect (mapStateToProps)(AddPopup);
