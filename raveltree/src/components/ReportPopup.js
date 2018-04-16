// Author:    Frank Fusco (fr@nkfus.co)
// Created:   04/11/18
// Modified:  04/11/18

// Standard "Report" popup component for RavelTree.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View, ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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

class ReportPopup extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      user: this.props.user || {},
      comment: '',
      loading: false,
      complete: false,
    };
  }

  onChangeComment (text) {
    this.setState ({ comment: text });
  }

  onPressReport () {
    var userID = this.state.user.user_uid;
    var comment = this.state.comment;
    this.setState ({
      comment: '',
      loading: true,
    });
    this.props.reportUser (userID, comment)
    .then (() => {
      this.setState ({
        loading: false,
        complete: true,
      });
    })
    .catch ((error) => { console.error (error); });
  }

  onPressDismiss () {
    this.props.onPressClose ();
  }

  render () {
    var user = this.state.user;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    if (!this.state.complete) {

      return (
        <ModalContainer name='ReportPopup' isActive={this.props.isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}} onPressClose={() => this.props.onPressClose ()}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
              <View style={styles.head}>
                <View style={styles.row1}>
                  <View style={styles.header}>
                    <TextSerif size={16}>Report for {user.first_name} {user.last_name}</TextSerif>
                  </View>
                  <TextSans size={13} color={'#95989A'}>Please indicate why you feel {user.first_name} {user.last_name} has violated RavelTree&#39;s Terms of Use.</TextSans>
                </View>
              </View>
              <View style={styles.passage}>
                <InputText height={'100%'} multiline placeholder={'Type your comment here.'} text={this.state.comment} onChangeText={(text) => this.onChangeComment (text)}/>
              </View>
              <View style={styles.foot}>
                <View style={styles.footText}>
                  <TextSans size={12} color={'#808080'}>We&#39;ll review your report and take the appropriate action.</TextSans>
                </View>
                <Button
                  title={'Report User'}
                  color={'#FF0000'}
                  width={0.40 * width}
                  disabled={!this.state.comment}
                  onPress={() => this.onPressReport ()}
                />
              </View>
            </View>

          </TouchableWithoutFeedback>
        </ModalContainer>
      );
    }

    else {

      return (
        <ModalContainer name='ReportPopup' isActive={this.props.isActive} style={{flex: 1, flexDirection: 'column', backgroundColor: '#000000'}} onPressClose={() => this.props.onPressClose ()}>
          <View style={styles.container2}>
            <View style={styles.header}>
              <TextSerif size={18}>Thank you.</TextSerif>
            </View>
            <View style={styles.header}>
              <TextSans size={13} color={'#95989A'}>Thanks for reporting a violation of RavelTree&#39;s Terms of Use.</TextSans>
            </View>
            <Button
              title={'Dismiss'}
              width={0.40 * width}
              onPress={() => this.onPressDismiss ()}
            />
          </View>
        </ModalContainer>
      );

    }
  }
}

const styles = StyleSheet.create ({
  container: {
    //height: '100%',
    flex: 1,
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 17,
    paddingRight: 17,
  },
  head: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  header: {
    marginBottom: 10,
  },
  row1: {
    flexDirection: 'column',
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
    width: '40%',
  },
});

const mapStateToProps = (state) => {
  const {
    currentUserProfile,
  } = state.current_user;

  return {
    currentUserProfile
  };
}

export default connect (mapStateToProps)(ReportPopup);
