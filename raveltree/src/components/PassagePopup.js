// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  04/09/18
//
// Standard passage popup component for RavelTree.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View, ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import ModalContainer from './ModalContainer'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import ButtonReverse from './ButtonReverse'
import Button from './Button'
import ButtonPlus from './ButtonPlus'
import VoteBar from './VoteBar'
import ButtonComment from './ButtonComment'

class PassagePopup extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      loading: !this.props.passageMetaData,
      passageMetaData: this.props.passageMetaData || {},
      ravelMetaData: this.props.ravelMetaData || {},
      mode: this.props.mode || '',
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.passageMetaData) {
      console.log (newProps.passageMetaData);
      this.setState ({
        loading: false,
        passageMetaData: newProps.passageMetaData,
      });
    }
  }

  checkIfOnLastLevel () {
    var levels = this.state.ravelMetaData.level_count;
    var level = this.state.passageMetaData.level;
    return level >= levels;
  }

  onPressMerge () {
    // We have to navigate from the parent 'Ravel' screen.
    var screenData = Object.assign({}, {
      passage: this.state.passageMetaData,
      ravel:   this.state.ravelMetaData
    });
    this.props.onNavigateToMerge ('Merge', screenData);
  }

  onPressFork () {
    this.props.onSwitchToFork (this.props.passageMetaData);
  }

  onPressAdd () {
    this.props.onSwitchToAdd (this.props.passageMetaData);
  }

  onPressComment () {
    var ravel = this.state.ravelMetaData;
    var passage = this.state.passageMetaData;
    var commentData = {
      ravelID: ravel.ravel_uid,
      ravelTitle: ravel.ravel_title,
      passageID: passage.passage_uid,
      passageIndex: passage.passage_index,
      passageTitle: passage.passage_title,
      author: passage.user_created,
    }
    this.props.onPressComment (commentData);
  }

  onPressEllipsis () {
    var title = this.props.passageMetaData.passage_title;
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
    var passageTitle = this.props.passageMetaData.passage_title;
    var title = 'Confirm Report';
    var message = 'Are you sure you want to report ' + passageTitle + ' for violating RavelTree\'s Terms of Use? You can\'t undo this.';
    var buttons = [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Report', onPress: () => this.onPressConfirmReport ()},
    ]
    var options = { cancelable: false };
    Alert.alert (title, message, buttons, options);
  }

  onPressConfirmReport () {
    var passageTitle = this.props.passageMetaData.passage_title;
    var ravelID = this.props.passageMetaData.ravel_uid;
    var passageID = this.props.passageMetaData.passage_uid;
    var comment = '';
    console.log ('Reporting ' + passageTitle + '...');
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
    var passageTitle = this.props.passageMetaData.passage_title;
    console.log ('Opening share menu for ' + passageTitle);
  }

  checkIfCanEdit () {
    const mode = this.state.mode;
    return (mode == 'participant') || (mode == 'owned')
  }

  showCommentButton () {
    if (this.state.ravelMetaData.enable_comment) {
      return (
        <View style={styles.buttonComment}>
          <ButtonComment onPress={() => this.onPressComment ()}/>
        </View>
      );
    }
  }

  render () {
    var passageMetaData = this.state.passageMetaData || {};

    isActive = passageMetaData.optimal || this.props.isActive;

    var ravel = passageMetaData.ravel_title;
    var passageIndex = passageMetaData.passage_index;
    var title = passageMetaData.passage_title;
    var passage = passageMetaData.passage_body;
    var author = passageMetaData.user_created;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='PassagePopup' isActive={isActive} onPressClose={() => this.props.onPressClose ()}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <TextSerif size={16}>{ravel}</TextSerif>
            <TextSans size={13} color={'#95989A'}>{passageIndex}</TextSans>
          </View>
          <View style={styles.row2}>
            <TextSans size={13} color={'#95989A'}>{title}</TextSans>
            <UserImage {...this.props} userID={author} size={26}/>
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
          <ButtonReverse title={'Merge...'} width={0.30 * width} disabled={this.checkIfOnLastLevel () || !this.checkIfCanEdit ()} onPress={() => this.onPressMerge ()} />
          <ButtonPlus size={36} disabled={!this.checkIfCanEdit ()} onPress={() => this.onPressAdd ()} />
          <Button title={'Fork'} width={0.30 * width} disabled={!this.checkIfCanEdit ()} onPress={() => this.onPressFork ()} />
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Touchable onPress={() => this.onPressEllipsis ()}>
              <View>
                <TextSans size={40} color={'#95989A'}>...</TextSans>
              </View>
            </Touchable>
            {this.showCommentButton ()}
          </View>
          <View style={styles.voteBar}>
            <VoteBar
              {...this.props}
              ravelID={passageMetaData.ravel_uid}
              passageID={passageMetaData.passage_uid}
              upvotes={passageMetaData.passage_upvote}
              downvotes={passageMetaData.passage_downvote}
              votes={passageMetaData.passage_combined_vote}
              disabled={!this.checkIfCanEdit ()}
            />
          </View>
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
    paddingBottom: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 7,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonComment: {
    marginLeft: 10,
  },
  voteBar: {
    top: 10,
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

export default connect (mapStateToProps)(PassagePopup);
