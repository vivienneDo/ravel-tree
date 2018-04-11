// Author:    Frank Fusco (fr@nkfus.co)
// Created:   04/10/18
// Modified:  04/10/18
//
// Comment popup component for RavelTree.

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
import InputText from './InputText'
import ButtonReverse from './ButtonReverse'
import Loader from './Loader'

class CommentPopup extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      loading: true,
      comments: {},
      comment: '',
      ravelID: this.props.ravelID || '',
      ravelTitle: this.props.ravelTitle || '',
      passageID: this.props.passageID || '',
      passageIndex: this.props.passageIndex || '',
      passageTitle: this.props.passageTitle || '',
      author: this.props.author || '',
    };
  }

  componentDidMount () {
    this.getComments ();
  }

  getComments () {
    var ravelID = this.state.ravelID;
    var passageID = this.state.passageID;
    this.props.getPassageComment (ravelID, passageID)
    .then ((comments) => {
      console.log (comments);
      this.setState ({
        comments: comments,
        loading: false,
      });
    })
    .catch ((error) => {
      console.error (error);
    })
  }

  onChangeComment (text) {
    this.setState ({ comment: text });
  }

  onPressComment () {
    var ravelID = this.state.ravelID;
    var passageID = this.state.passageID;
    var comment = this.state.comment;
    this.setState ({
      loading: true,
      comment: '',
    });
    this.props.writePassageComment (ravelID, passageID, comment)
    .then ((comments) => {
      console.log (comments);
      this.setState ({
        comments: comments,
        loading: false,
      });
    })
    .catch ((error) => {
      console.error (error);
    })
  }

  onPressEllipsis () {
    var title = this.state.ravelTitle;
    var message = this.state.passageTitle;
    var buttons = [
      {text: 'Report', onPress: () => this.onPressReport ()},
      {text: 'Share...', onPress: () => this.onPressShare ()},
      {text: 'Cancel', style: 'cancel'},
    ];
    var options = { cancelable: false };
    Alert.alert (title, message, buttons, options);
  }

  onPressReport () {
    // TODO: Adapt to report user.
    // var passageTitle = this.props.passageMetaData.passage_title;
    // var title = 'Confirm Report';
    // var message = 'Are you sure you want to report ' + passageTitle + ' for violating RavelTree\'s Terms of Use? You can\'t undo this.';
    // var buttons = [
    //   {text: 'Cancel', style: 'cancel'},
    //   {text: 'Report', onPress: () => this.onPressConfirmReport ()},
    // ]
    // var options = { cancelable: false };
    // Alert.alert (title, message, buttons, options);
  }

  onPressConfirmReport () {
    // TODO: Adapt to report user.
    // var passageTitle = this.props.passageMetaData.passage_title;
    // var ravelID = this.props.passageMetaData.ravel_uid;
    // console.log ('Reporting ' + passageTitle + '...');
    // this.props.reportRavel (ravelID); // TODO: 'Report passage' functionality on backend.
  }

  onPressShare () {
    console.log ('Opening share menu for ' + this.state.passageTitle);
  }

  showComments () {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <Loader />
        </View>
      );
    }

    if (_.size (this.state.comments) == 0) {
      return (
        <View style={styles.noComments}>
          <TextSans size={14}>No comments yet – leave one!</TextSans>
        </View>
      );
    }

    return (
      <View style={styles.comments}>
        {Object.values (this.state.comments).map (comment => {
          return (
            <View key={comment.key} style={styles.comment}>
              <View style={styles.commentLeft}>
                <UserImage {...this.props} size={26} userID={comment.user_uid} />
              </View>
              <View style={styles.commentRight}>
                <View style={styles.commentRightTop}>
                  <TextSans size={14} bold={true}>{comment.user_first_name}&nbsp;</TextSans>
                </View>
              <TextSans size={13}>{comment.comment_body}</TextSans>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  checkIfCanComment () {
    return true; // TODO
  }

  render () {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    var {height, width} = Dimensions.get ('window');

    return (
      <ModalContainer name='CommentPopup' isActive={this.props.isActive} onPressClose={() => this.props.onPressClose ()}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <TextSerif size={16}>{this.state.ravelTitle}</TextSerif>
            <TextSans size={13} color={'#95989A'}>{this.state.passageIndex}</TextSans>
          </View>
          <View style={styles.row2}>
            <TextSans size={13} color={'#95989A'}>{this.state.passageTitle}</TextSans>
            <UserImage {...this.props} userID={this.state.author} size={26}/>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContent}>
            {this.showComments ()}
          </View>
        </ScrollView>
        <View style={styles.commentInput}>
          <InputText height={'100%'} multiline placeholder={'Type your comment (e.g., "I think...").'} text={this.state.comment} onChangeText={(text) => this.onChangeComment (text)}/>
        </View>
        <View style={styles.buttons}>
          <ButtonReverse title={'Leave a Comment'} width={0.50 * width} disabled={!this.checkIfCanComment () || this.state.comment == ''} onPress={() => this.onPressComment ()} />
        </View>
        <View style={styles.bottom}>
          <Touchable onPress={() => this.onPressEllipsis ()}>
            <View>
              <TextSans size={40} color={'#95989A'}>...</TextSans>
            </View>
          </Touchable>
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
  loader: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  comments: {
    paddingRight: 34,
  },
  comment: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
  },
  commentLeft: {
    marginRight: 10,
  },
  commentRight: {

  },
  commentRightTop: {
    flexDirection: 'row',
  },
  commentInput: {
    marginHorizontal: 17,
    marginBottom: 10,
    height: 100,

  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

export default connect (mapStateToProps)(CommentPopup);
