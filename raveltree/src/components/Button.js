// Author:    Frank Fusco (fr@nkfus.co)
// Created:   01/31/18
// Modified:  01/31/18

// Standard button component for RavelTree.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');

class Button extends React.Component <{
  title: string,
  onPress: () => any,
  radius?: ?number,
  color?: ?string,
  accessibilityLabel?: ?string,
  disabled?: ?boolean,
  testID?: ?string,
}> {
//class Button extends React.Component {
  static propTypes = {

    // Text to display inside the button
    title: PropTypes.string.isRequired,

    // Handler to be called when the user taps the button
    onPress: PropTypes.func.isRequired,

    // Magnitude of curve radius for rounded rectangle
    radius: PropTypes.number,

    // Color of the button
    color: PropTypes.string,

    // Text to display for blindness accessibility features
    accessibilityLabel: PropTypes.string,

    // If true, disable all interactions for this component.
    disabled: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      title,
      onPress,
      radius,
      color,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    // const buttonStyles = [styles.button];
    // const textStyles = [styles.text];
    const accessibilityTraits = ['button'];

    // if (color) {
    //   if (Platform.OS === 'ios') {
    //     textStyles.push ({color : color});
    //   } else {
    //     buttonStyles.push ({backgroundColor: color});
    //   }
    // }

  }
}

const styles = StyleSheet.create ({
  button: {
    backgroundColor: '#3BB54A',
    borderRadius: 20,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
  },
  buttonDisabled: {
    backgroundColor: '#969696',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});

module.exports = Button;
