// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/15/18
// Modified:  03/09/18

// Standard "Message Card" component for RavelTree.
//
// TODO: Reply function.

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

import { connect } from 'react-redux'
import _ from 'lodash';

import TextSans from './TextSans'
import TextLink from './TextLink'
import UserImage from './UserImage'

class MessageCard extends React.Component {
  constructor (props) {
    super (props);
  }

  onPressUser () {
    var screenData = Object.assign ({}, {userID: this.props.userID});
    navigateForward ('Profile', this.constructor.name, screenData);
  }

  onPressReply () {
    // TODO
  }

  render () {
    const {
      active,
      showReply,
      testID,
      message,
      user,
      userID,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.props.active) {
      layoutStyles.push (styles.active);
    }
    else {
      layoutStyles.push (styles.inactive);
    }

    return (
      <View style={layoutStyles}>
        <View style={styles.content}>
          <View style={styles.head}>
            <View style={styles.userImage}>
              <UserImage {...this.props} size={26} />
            </View>
            <Touchable onPress={() => this.onPressUser ()}>
              <TextSans bold size={14}>{this.props.user}</TextSans>
            </Touchable>
            <TextSans size={14}> says:</TextSans>
          </View>
          <View style={styles.message}>
            <TextSans size={14} color={'#282828'}>
              {this.props.message}
            </TextSans>
          </View>
          <View style={styles.replyButton}>
            <View style={this.props.showReply ? styles.replyText : {display: 'none'}}>
              <TextLink size={12} onPress={() => onPressReply ()}>Reply</TextLink>
            </View>
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
    width: '100%',
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
  },
  active: {
    borderColor: '#2E8AF7',
  },
  inactive: {
    borderColor: '#8D8D8D',
  },
  content: {
    flexDirection: 'column',
    width: '100%',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    marginRight: 10,
  },
  message: {

  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  replyText: {
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  const {
    screenData,
  } = state.navigation;

  return {
    screenData,
  };
}

export default connect (mapStateToProps)(MessageCard);
