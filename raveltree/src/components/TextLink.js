// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/06/18
// Modified:  02/06/18

// Standard linked text component for RavelTree.

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

export default class TextLink extends React.Component {

  render () {
    const {
      size,
      color,
      onPress,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    const textStyles = [styles.serif];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    textStyles.push ([
      this.props.size ? {fontSize: size} : {fontSize: 16},
      this.props.color ? {color: color} : {color: '#2E8AF7'},
      this.props.disabled ? styles.disabled : null,
    ]);

    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
      >
        <View>
          <Text style={textStyles}>
            {this.props.children}
          </Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create ({
  serif: {
    fontFamily: 'Roboto',
  },
  disabled: {
    color: '#969696',
  },
});
