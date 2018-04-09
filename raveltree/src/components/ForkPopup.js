// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  04/09/18

// Standard "Fork passge" popup component for RavelTree.

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


class ForkPopup extends React.Component {
  constructor (props) {
    super (props);

    // Passage metadata from existing passage.
    var existingPassage = this.props.passageMetaData;

    // Calculate the passage index for the new passage.
    var level = existingPassage.level;
    var nodeCount = this.props.ravelMetaData.nodeCount [level];

    var newPassageIndex = this.getNextPassageIndex (level, nodeCount);

    this.state = {
      title: '',
      passage: '',
      existingPassage: existingPassage,
      existingPassageIndex: existingPassage.passage_index,
      newPassageIndex: newPassageIndex,
    };
  }

  getNextPassageIndex (level = 1, nodeCount) {
    // Find next available PassageIndex at this level. E.g.: If current level is
    // 4 and there are already 3 passages at level 4, then next should be 4-D.
    var number = level;

    if (nodeCount) {
      var nextLetterIndex = nodeCount + 1;
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

      return number + '-' + nextLetters;
    } else {
      return number + '-A';
    }
  }

  onChangeTitle (text) {
    this.setState ({ title: text });
  }

  onChangePassage (text) {
    this.setState ({ passage: text });
  }

  onPressFork () {
    const ravelID = this.props.ravelID;
    const title = this.state.title;
    const passage = this.state.passage;
    const existingID = this.state.existingPassage.passage_uid;

    var forkData = {
      ravel_uid: ravelID,
      parent_passage_uid: existingID,
      passage_title: title,
      passage_body: passage,
    };
    this.props.forkPassage (forkData);
  }

  render () {

    const ravel = this.props.title;
    const forkedPassageIndex = (this.state.existingPassageIndex || '');
    const newPassageIndex = (this.state.newPassageIndex || '');

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
        <ModalContainer name='ForkPopup' isActive={isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}} onPressClose={() => this.props.onPressClose ()}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.row1}>
                <TextSerif size={16}>{ravel}</TextSerif>
                <TextSans size={13} color={'#95989A'}>{newPassageIndex}</TextSans>
              </View>
              <View style={styles.row2}>
                <InputText width={'auto'} placeholder={'Type a passage name (e.g., "The Reckoning").'} onChangeText={(text) => this.onChangeTitle (text)} />
                <UserImage {...this.props} size={26}/>
              </View>
            </View>
            <View style={styles.passage}>
              <InputText height={'100%'} multiline placeholder={'Type your passage (e.g., "It was a dark and stormy night...").'} onChangeText={(text) => this.onChangePassage (text)} />
            </View>
            <View style={styles.foot}>
              <View style={styles.footText}>
                <TextSans size={12} color={'#808080'}>When you press "Fork," you&#39;ll be creating an alternative to {forkedPassageIndex}).</TextSans>
              </View>
              <Button title={'Fork'} onPress={() => this.onPressFork ()} width={0.30 * width} />
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
  footText: {
    flex: 0.7,
  }
});

const mapStateToProps = (state) => {
  const {
    currentUserProfile,
  } = state.current_user;

  return {
    currentUserProfile
  };
}

export default connect (mapStateToProps)(ForkPopup);
