// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/15/18
// Modified:  02/15/18

// Standard "Notification Card" component for RavelTree.
//
// Pass in a "notification" object as a prop like so:
//
//    <NotificationCard
//      notification={{type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37}}
//      active
//    />
//
// Possible notification object types:
//
//    {type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37}
//    {type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'}
//    {type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'}
//    {type: 'message', user: 'Clint Lane Clover'}
//    {type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'}
//
// TODO: Make entire card touchable and link to respective content.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const Dimensions = require('Dimensions');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const ScrollView = require('ScrollView');

import TextSans from './TextSans'

export default class NotificationCard extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Whether the container is active (will color the border)
    active: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  displayNotification (notification) {
    switch (notification.type) {
      case ('upvoted'):
        return (
          <TextSans size={14}>
            Your passage&nbsp;
            <TextSans size={14} bold>
              {notification.passage}&nbsp;
            </TextSans>
            was upvoted&nbsp;
            <TextSans size={14} bold>
              {notification.upvotes}&nbsp;{notification.upvotes > 1 ? 'times' : 'time'}
            </TextSans>
            .
          </TextSans>
        );
      case ('invitation'):
        return (
          <TextSans size={14}>
            <TextSans size={14} bold>
              {notification.user}&nbsp;
            </TextSans>
            invited you to participate in&nbsp;
            <TextSans size={14} bold>
              {notification.passage}
            </TextSans>
            .
          </TextSans>
        );
      case ('invitationAccepted'):
        return (
          <TextSans size={14}>
            <TextSans size={14} bold>
              {notification.user}&nbsp;
            </TextSans>
            accepted your invitation to participate in&nbsp;
            <TextSans size={14} bold>
              {notification.passage}
            </TextSans>
            .
          </TextSans>
        );
      case ('newParticipant'):
        return (
          <TextSans size={14}>
            <TextSans size={14} bold>
              {notification.user}&nbsp;
            </TextSans>
            started participating in&nbsp;
            <TextSans size={14} bold>
              {notification.passage}
            </TextSans>
            .
          </TextSans>
        );
      case ('message'):
        return (
          <TextSans size={14}>
            <TextSans size={14} bold>
              {notification.user}&nbsp;
            </TextSans>
            sent you a message.
          </TextSans>
        );
      default:
        return (
          <TextSans />
        );
    }
  }

  render () {
    const {
      active,
      testID,
      message,
      user,
    } = this.props;

    const layoutStyles = [styles.layout];
    const dotStyles = [styles.dot];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.props.active) {
      layoutStyles.push (styles.active);
      dotStyles.push (styles.dot);
    }
    else {
      layoutStyles.push (styles.inactive);
      dotStyles.push (styles.dotInactive);
    }

    return (
      <View style={layoutStyles}>
        <View style={dotStyles} />
        <View style={styles.content}>
          <View style={styles.notification}>
              {this.displayNotification (this.props.notification)}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    minHeight: 80,
    borderRadius: 20,
    borderWidth: 2,
  },
  active: {
    borderColor: '#2E8AF7',
  },
  inactive: {
    borderColor: '#8D8D8D',
  },
  dot: {
    backgroundColor: '#2E8AF7',
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 25,
  },
  dotInactive: {
    height: 0,
  },
  content: {
    flex: 0.90,
    flexDirection: 'column',
  },
  notification: {
    flexDirection: 'row',
  },
});
