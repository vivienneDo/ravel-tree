// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/19/18
// Modified:  02/19/18

// Linked text "continue button" component for top navigation for RavelTree.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');

import TextLink from './TextLink'

export default class LinkContinue extends React.Component {

  render () {
    const {
      onPress,
      disabled,
      accessibilityLabel,
      testID,
    } = this.props;

    const textStyles = [styles.serif];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    textStyles.push ([
      this.props.disabled ? styles.disabled : null,
    ]);

    return (
      <View style={styles.layout}>
        <TextLink
          accessibilityComponentType="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={accessibilityTraits}
          testID={testID}
          disabled={disabled}
          onPress={onPress}
        >
          Continue
        </TextLink>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    zIndex: 1000,
    position: 'absolute',
    //top: 20,
    right: 20,
  },
});
