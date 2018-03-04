// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/03/18
// Modified:  02/03/18

// Standard toggle switch component for RavelTree.

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


export default class Toggle extends React.Component {
  constructor (props) {
    super (props);
    this.state = {isOn: false};
    this.handleToggle = this.handleToggle.bind (this);
  }

  static propTypes = {

    // Name of the toggle (used by parents and/or event listeners)
    name: PropTypes.string.isRequired,

    // Text to display for blindness accessibility features
    accessibilityLabel: PropTypes.string,

    // If true, disable all interactions for this component.
    disabled: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  handleToggle () {
    var newState = !this.state.isOn;
    this.setState ({isOn: newState});
    this.props.onChange (newState);
  }

  render () {
    const {
      name,
      onChange,
      accessibilityLabel,
      disabled,
      testID,
    } = this.props;

    const backgroundStyles = [styles.background];
    const switchStyles = [styles.switch];
    const accessibilityTraits = ['button'];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.state.isOn) {
      backgroundStyles.push (styles.backgroundOn);
      switchStyles.push (styles.switchOn);
      accessibilityTraits.push ('selected');
    }
    else {
      backgroundStyles.push (styles.background);
      switchStyles.push (styles.switch);
      accessibilityTraits.push ('button');
    }

    if (disabled) {
      backgroundStyles.push (styles.backgroundDisabled);
      accessibilityTraits.push ('disabled');
    }

    return (
      <Touchable
        accessibilityComponentType={'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        name={name}
        testID={testID}
        disabled={disabled}
        onPress={this.handleToggle}
        style={styles.layout}>
        <View style={backgroundStyles}>
          <View style={switchStyles} />
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    height: 22,
    width: 45,
    flexDirection: 'row',
  },
  background: {
    borderRadius: 50,
    backgroundColor: '#B1B1B1',
    height: 22,
    width: 45,
    justifyContent: 'center',
  },
  switch: {
    borderRadius: 10,
    height: 20,
    width: 20,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: '#FFFFFF',
  },
  switchOn: {
    borderRadius: 10,
    height: 20,
    width: 20,
    marginLeft: 1,
    marginRight: 1,
    left: '50%',
    backgroundColor: '#FFFFFF',
  },
  backgroundOn: {
    backgroundColor: '#3BB54A',
  },
  backgroundDisabled: {
    borderColor: '#F0F0F0',
  },
  switchDisabled: {
    color: '#F0F0F0',
  },
});
