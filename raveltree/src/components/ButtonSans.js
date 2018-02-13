// Author:    Frank Fusco (fr@nkfus.co)
// Created:   01/31/18
// Modified:  01/31/18

// Standard "button-sans" component for RavelTree. Based on the React Native Button
// component (https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js)

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

export default class ButtonSans extends React.Component <{
  title: string,
  onPress: () => any,
  radius?: ?number,
  color?: ?string,
  width?: ?number,
  height?: ?number,
  accessibilityLabel?: ?string,
  disabled?: ?boolean,
  testID?: ?string,
}> {
  static propTypes = {

    // Text to display inside the button
    title: PropTypes.string.isRequired,

    // Handler to be called when the user taps the button
    onPress: PropTypes.func.isRequired,

    // Magnitude of curve radius for rounded rectangle
    radius: PropTypes.number,

    // Color of the button
    color: PropTypes.string,

    // Width of the button
    width: PropTypes.number,

    // Height of the button (automatically modifies text line height)
    height: PropTypes.number,

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
      width,
      height,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const layoutStylse = [styles.layout];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (radius)
      buttonStyles.push ({borderRadius: radius});
    if (color)
      buttonStyles.push ({backgroundColor: color});
    if (disabled) {
      buttonStyles.push (styles.buttonDisabled);
      textStyles.push (styles.textDisabled);
      accessibilityTraits.push ('disabled');
    }
    if (width)
    {
      layoutStyles.push ({width: width});
      buttonStyles.push ({width: width});
    }
    if (height) {
      layoutStyles.push ({height: height});
      buttonStyles.push ({height: height});
      textStyles.push ({lineHeight: height});
    }


    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        style={layoutStyles}>
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>{title}</Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    width: 120,
    height: 30,
  },
  button: {
    backgroundColor: '#2E8AF7',
    borderRadius: 10,
    width: 120,
    height: 30,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
    // TODO: Hack together Android support for letter spacing.
    letterSpacing: 1,
    lineHeight: 30,
  },
  buttonDisabled: {
    backgroundColor: '#969696',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});

AppRegistry.registerComponent('ButtonSans', () => ButtonSans);
