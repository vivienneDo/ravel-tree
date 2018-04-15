// Author:    Frank Fusco (fr@nkfus.co)
// Created:   01/31/18
// Modified:  04/10/18

// Standard comment button component for RavelTree.

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
const Image = require('Image');

// Props:
// -----
// onPress: () => any,
// color?: ?string,
// size?: ?number,
// width?: ?number,
// height?: ?number,
// accessibilityLabel?: ?string,
// disabled?: ?boolean,
// testID?: ?string,

export default class ButtonComment extends React.Component {
  constructor (props) {
    super (props);

  }

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
          <Image style={styles.image} source={require('./img/comment.png')} />
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
    //backgroundColor: '#2E8AF7',
    //borderRadius: 100,
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#969696',
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});
