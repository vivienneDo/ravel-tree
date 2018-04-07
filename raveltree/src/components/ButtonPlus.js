// Author:    Frank Fusco (fr@nkfus.co)
// Created:   01/31/18
// Modified:  01/31/18

// Standard "plus" button component for RavelTree. Based on the React Native Button
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

export default class ButtonPlus extends React.Component <{
  onPress: () => any,
  color?: ?string,
  size?: ?number,
  width?: ?number,
  height?: ?number,
  accessibilityLabel?: ?string,
  disabled?: ?boolean,
  testID?: ?string,
}> {
  static propTypes = {

    // Handler to be called when the user taps the button
    onPress: PropTypes.func.isRequired,

    // Color of the button
    color: PropTypes.string,

    // Size of the button (applied to both width and height)
    size: PropTypes.number,

    // Text to display for blindness accessibility features
    accessibilityLabel: PropTypes.string,

    // If true, disable all interactions for this component.
    disabled: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      onPress,
      radius,
      color,
      size,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    const buttonStyles = [styles.button];
    const layoutStyles = [styles.layout];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (radius)
      buttonStyles.push ({borderRadius: radius});
    if (color)
      buttonStyles.push ({backgroundColor: color});
    if (disabled) {
      buttonStyles.push (styles.buttonDisabled);
      accessibilityTraits.push ('disabled');
    }
    if (size)
    {
      layoutStyles.push ({width: size, height: size});
      buttonStyles.push ({width: size, height: size});
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
          <Text style={styles.text}>+</Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    width: 21,
    height: 21,
  },
  button: {
    backgroundColor: '#2E8AF7',
    borderRadius: 100,
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 23,
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    lineHeight: 23,
  },
  buttonDisabled: {
    backgroundColor: '#969696',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});
