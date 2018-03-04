// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/13/18
// Modified:  02/13/18

// Standard "Message Stub" component for RavelTree.
//
// TODO: Make username touchable and link to respective content.

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
import UserImage from './UserImage'

export default class MessageStub extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Whether the container is active (will color the border)
    active: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

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
          <View style={styles.head}>
            <View style={styles.userImage}>
              <UserImage size={26} />
            </View>
            <TextSans bold size={14}>{this.props.user}</TextSans>
            <TextSans size={14}> says:</TextSans>
          </View>
          <View style={styles.message}>
            <Text numberOfLines={2} style={styles.messageText}>
              {this.props.message}
            </Text>
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
    height: 80,
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
    flex: 1,
    flexDirection: 'column',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    marginRight: 10,
  },
  message: {
    minHeight: 24,
  },
  messageText: {
    color: '#747474',
    fontSize: 12,
  },
});
