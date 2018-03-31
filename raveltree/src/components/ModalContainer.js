// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/04/18
// Modified:  02/04/18

// Standard modal container component for RavelTree.

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
const ScrollView = require('ScrollView');


export default class ModalContainer extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Name of the toggle (used by parents and/or event listeners)
    name: PropTypes.string.isRequired,

    // Whether the container is active (will color the border)
    isActive: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      name,
      isActive,
      testID,
    } = this.props;

    const containerStyles = [styles.container];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.props.isActive) {
      containerStyles.push (styles.active);
    }
    else {
      containerStyles.push (styles.inactive);
    }

    return (
      <View style={containerStyles}>
        {this.props.children}
        <View style={styles.bottomButtons}>
          <Touchable
            accessibilityComponentType={'button'}
            accessibilityLabel={"Close window"}
            accessibilityTraits={'button'}
            name={name}
            testID={testID}
            style={styles.xButton}>
            <Text style={styles.x}>&#215;</Text>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 0.95,
    borderRadius: 20,
    borderColor: '#7E7E7E',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    margin: 'auto',
    paddingTop: 10,
    paddingBottom: 34,
  },
  active: {
    borderColor: '#2E8AF7',
  },
  inactive: {
    borderColor: '#7E7E7E',
  },
  content: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  xButton: {
    alignSelf: 'center',
  },
  x: {
    fontFamily: 'Roboto-Thin',
    fontWeight: '100',
    fontSize: 36,
    color: '#2E8AF7',
  },
});
