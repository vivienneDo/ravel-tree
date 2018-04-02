// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/02/18
// Modified:  02/02/18

// Standard radio button component for RavelTree.

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


export default class RadioItem extends React.Component {
  constructor (props) {
    super (props);
    this.state = {active: this.props.active};
  }

  static propTypes = {

    // Text to display inside the button
    title: PropTypes.string.isRequired,

    // Name of the button (used by RadioSet and/or event listeners)
    name: PropTypes.string.isRequired,

    // Text to display for blindness accessibility features
    accessibilityLabel: PropTypes.string,

    // If true, disable all interactions for this component.
    disabled: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  componentWillReceiveProps (newProps)
  {
    this.setState ({active: newProps.active});
  }


  render () {
    const {
      title,
      name,
      setFormState,
      active,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.state.active) {
      buttonStyles.push (styles.buttonSelected);
      textStyles.push (styles.textSelected);
      accessibilityTraits.push ('selected');
    }
    else {
      accessibilityTraits.push ('button');
    }

    if (disabled) {
      buttonStyles.push (styles.buttonDisabled);
      textStyles.push (styles.textDisabled);
      accessibilityTraits.push ('disabled');
    }


    return (
      <Touchable
        accessibilityComponentType={this.state.active ? 'radiobutton_checked' : 'radiobutton_unchecked'}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        name={name}
        testID={testID}
        disabled={disabled}
        onPress={() => {this.props.setFormState({active: name})}}
        style={styles.layout}
      >
        <View style={styles.inner}>
          <View style={buttonStyles}>
            <View style={this.state.active ? styles.dot : null} />
          </View>
          <Text style={textStyles} disabled={disabled}>{title}</Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    height: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    height: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5F5F5F',
    height: 10,
    width: 10,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#5F5F5F',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 13,
  },
  dot: {
    borderRadius: 5,
    height: '50%',
    width: '50%',
    backgroundColor: '#2E8AF7',
  },
  buttonSelected: {
    borderColor: '#2E8AF7',
  },
  textSelected: {
    color: '#5F5F5F',
  },
  buttonDisabled: {
    borderColor: '#F0F0F0',
  },
  textDisabled: {
    color: '#F0F0F0',
  },
});
