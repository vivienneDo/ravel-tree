// Author:    Frank Fusco (fr@nkfus.co)
// Created:   04/09/18
// Modified:  04/09/18

// Linked text "save button" component for top navigation for RavelTree.

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

export default class LinkSave extends React.Component {

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
          Save
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
