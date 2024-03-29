// Author:    Alex Aguirre
// Created:   02/5/18
// Modified:  04/14/18 by Frank Fusco (fr@nkfus.co)

// Standard passage card component for RavelTree.
//
// TODO: 'Report passage' functionality on backend.
// TODO: Limit voting power to 1 per user per passage.

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import VoteBar from './VoteBar'
import ButtonComment from './ButtonComment'

// Number of characters of passage text to display on the card.
PASSAGE_TRUNCATION = 330;

class PassageCard extends React.Component {
  constructor (props, context) {
    super (props, context);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.ravel_report_success) {
      Alert.alert ('Reported', 'Thank you for reporting a violation of RavelTree\'s Terms of Use. We\'ll review your report and take action as necessary.');
    }
  }

  onPressComment () {
    var commentData = {
      ravelID: this.props.ravelID,
      ravelTitle: this.props.ravel,
      passageID: this.props.passageID,
      passageIndex: this.props.passageIndex,
      passageTitle: this.props.passage,
      author: this.props.author,
    }
    this.props.onPressComment (commentData);
  }

  onPressRavel () {
    this.navigateToRavel (this.props.ravelID);
  }

  onPressPassageID () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  onPressTitle () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  onPressPassage () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  navigateToRavel (id) {
    var screenData = Object.assign ({}, {ravel_uid: id});
    this.props.navigateForward ('Ravel', this.props.parentScreen, screenData);
  }

  navigateToPassage (ravelID, passageID) {
    // var screenData = Object.assign ({}, {ravel_uid: ravelID, passage_uid: passageID, loadPassage: true});
    var screenData = Object.assign ({}, {ravel_uid: ravelID, passage_uid: passageID, loadPassage: passageID});
    this.props.navigateForward ('Ravel', this.props.parentScreen, screenData);
  }

  onPressEllipsis () {
    var title = this.props.title;
    var message = 'Choose an action:';
    var buttons = [
      {text: 'Report', onPress: () => this.onPressReport ()},
      /*{text: 'Share...', onPress: () => this.onPressShare ()},*/
      {text: 'Cancel', style: 'cancel'},
    ];
    var options = { cancelable: false };
    Alert.alert (title, message, buttons, options);
  }

  onPressReport () {
    var title = 'Confirm Report';
    var message = 'Are you sure you want to report ' + this.props.title + ' for violating RavelTree\'s Terms of Use? You can\'t undo this.';
    var buttons = [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Report', onPress: () => this.onPressConfirmReport ()},
    ]
    var options = { cancelable: false };
    Alert.alert (title, message, buttons, options);
  }

  onPressConfirmReport () {
    console.log ('Reporting ' + this.props.title + '...');
    var ravelID = this.props.ravelID;
    var passageID = this.props.passageID;
    var comment = '';
    this.props.reportPassage (ravelID, passageID, comment)
    .then (() => {
      var title = 'Thank You';
      var message = 'Thanks for reporting a violation of RavelTree\'s Terms of Use.';
      var buttons = [
        {text: 'OK'},
      ];
      var options = { cancelable: false };
      Alert.alert (title, message, buttons, options);
    })
    .catch ((error) => { console.error (error); });
  }

  onPressShare () {
    console.log ('Opening share menu for ' + this.props.title);
  }

  showCommentButton () {
    if (this.props.enableComments) {
      return (
        <View style={styles.buttonComment}>
          <ButtonComment onPress={() => this.onPressComment ()}/>
        </View>
      );
    }
  }

  shorten (str, maxLen, separator = ' ') {
    if (!str || str.length <= maxLen) { return str; }
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }

  render () {
    const {
      ravel,
      ravelID,
      passageIndex,
      passageID,
      title,
      author,
      photoURL,
      passage,
      upvotes,
      downvotes,
      votes,
      enableComments,
      parentScreen,
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var truncatedPassage = (passage.length >= PASSAGE_TRUNCATION) ? (
      this.shorten (passage, PASSAGE_TRUNCATION) + '...'
    ) : (
      passage
    );

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <Touchable onPress={() => this.onPressRavel ()}>
              <View>
                <TextSerif size={16}>{this.props.ravel}</TextSerif>
              </View>
            </Touchable>
            <Touchable onPress={() => this.onPressPassageID ()}>
              <View>
                <TextSans size={13} color={'#95989A'}>{this.props.passageIndex}</TextSans>
              </View>
            </Touchable>
          </View>
          <View style={styles.row2}>
            <Touchable onPress={() => this.onPressTitle ()}>
              <View>
                <TextSans size={13} color={'#95989A'}>{this.props.title}</TextSans>
              </View>
            </Touchable>
            <UserImage {...this.props} userID={author} photoURL={photoURL} size={26}/>
          </View>
        </View>
        <Touchable onPress={() => this.onPressPassage ()} style={styles.passage}>
          <View>
            <TextSerif>
              {truncatedPassage}
            </TextSerif>
          </View>
        </Touchable>
        <View style={styles.buttons}>
          <View style={styles.buttonsLeft}>
            <Touchable onPress={() => this.onPressEllipsis ()}>
              <View>
                <TextSans size={40} color={'#95989A'}>...</TextSans>
              </View>
            </Touchable>
            {this.showCommentButton ()}
          </View>
          <View style={styles.voteBar}>
            <VoteBar
              ravelID={ravelID}
              passageID={passageID}
              votes={votes}
              {...this.props}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    borderColor: '#8D8D8D',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 17,
  },
  head: {
    // paddingLeft: 17,
    // paddingRight: 17,
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
  passage: {
    marginTop: 6,
  },
  passageIndex: {
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  buttonsLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonComment: {
    marginLeft: 10,
  },
  voteBar: {
    marginBottom: 6,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
  } = state.navigation;

  const {
    ravel_report_success,
  } = state.report_status;

  return {
    activeScreen,
    previousScreens,
  };
}

export default connect (mapStateToProps)(PassageCard);
