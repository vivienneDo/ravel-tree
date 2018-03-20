// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  03/19/18

// Standard "Fork passge" popup component for RavelTree.
//
// TODO: onPressFork ()

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


export default class ForkPopup extends React.Component {
  constructor (props) {
    super (props);
  }

  getNextPassageIndex (current) {
    if (!current) { return ''; }

    var split = current.split ('-');
    var number = split [0];
    var letters = split [1];

    var u = letters.toUpperCase ();
    if (this.same (u,'Z')) {
      var txt = '';
      var i = u.length;
      while (i--) {
        txt += 'A';
      }
      return (txt+'A');
    } else {
      var p = "";
      var q = "";
      if (u.length > 1) {
        p = u.substring (0, u.length - 1);
        q = String.fromCharCode (p.slice(-1).charCodeAt (0));
      }
      var l = u.slice (-1).charCodeAt (0);
      var z = this.nextLetter (l);
      if (z === 'A') {
        return p.slice (0,-1) + this.nextLetter (q.slice (-1).charCodeAt (0)) + z;
      } else {
        return p + z;
      }
    }
  }

  nextLetter (l) {
    if (l<90) {
      return String.fromCharCode (l + 1);
    }
    else {
      return 'A';
    }
  }

  same (str,char) {
    var i = str.length;
    while (i--) {
      if (str [i] !== char){
        return false;
      }
    }
    return true;
  }

  onPressFork () {
    // TODO
  }

  render () {
    const {
      isActive,
      testID,
    } = this.props;

    const ravel = this.props.title;
    const forkedPassageIndex = (this.props.passageIndex || '');
    const newPassageIndex = this.getNextPassageIndex (forkedPassageIndex);

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
        <ModalContainer name='PassagePopup' isActive={isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}} onPressClose={() => this.props.onPressClose ()}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.row1}>
                <TextSerif size={16}>{ravel}</TextSerif>
                <TextSans size={13} color={'#95989A'}>{newPassageIndex}</TextSans>
              </View>
              <View style={styles.row2}>
                <InputText width={'auto'} placeholder={'Type a passage name (e.g., "The Reckoning").'} />
                <UserImage {...this.props} size={26}/>
              </View>
            </View>
            <View style={styles.passage}>
              <InputText height={'100%'} multiline placeholder={'Type your passage (e.g., "It was a dark and stormy night...").'} />
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
