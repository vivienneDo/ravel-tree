// Author:  Alex Aguirre
// Created:  01/20/18
// Modified: 02/20/18 by Frank Fusco (fr@nkfus.co)
//
// Standard "tag" component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';

const HEIGHT = 25;
const HEIGHT_SMALL = 20;
const MARGIN_VERTICAL = 3;

export default class Tag extends Component {

  static get HEIGHT () {
    return HEIGHT;
  }

  static get HEIGHT_SMALL () {
    return HEIGHT_SMALL;
  }

  static get MARGIN_VERTICAL () {
    return MARGIN_VERTICAL;
  }

  // Keeps track of whether the tag is active (pressed) or not
    constructor(props) {
    super(props);
    this.state = {active: this.props.active};
  }

  componentWillReceiveProps (newProps) {
    this.setState ({active: newProps.active});
  }

  onTagLayout = (e) => {
    if (!this.props.onTagLayout) { return; }
    this.props.onTagLayout (e.nativeEvent.layout.width, e.nativeEvent.layout.height, this.props.name);
  }

  render() {

    const {
      name,
      size,
      mode,
      accessibilityLabel,
      onTagLayout,
      //onPassDimensions,
      toggleFormState,
      active,
      disabled,
      testID,
    } = this.props;

    const layoutStyles = [styles.layout];
    const textStyles = [styles.text];

    // If in "display only" mode, encapsulate in a view instead of a Touchable.
    const Touchable = mode === 'displayOnly' ? View :
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (this.props.size == 'small') {
      layoutStyles.push ({height: 20});
      textStyles.push ({fontSize: 10});
    }

    layoutStyles.push (this.state.active ? styles.active : styles.inactive);

    return (
      <View
        style={layoutStyles}
        onLayout={this.onTagLayout}
      >
        <Touchable
          onPress={() => {this.props.toggleFormState(this.props.name)}}
        >
          <View>
            <Text style = {textStyles}>
                {this.props.children}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    height: HEIGHT,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: MARGIN_VERTICAL,
    alignSelf: 'flex-start',
  },
  active: {
   backgroundColor: '#2E8AF7',
  },
  inactive: {
    backgroundColor: '#B1B1B1',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});
