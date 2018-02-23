// Author: Alex Aguirre
// Created: 01/18/18
// Modified: 02/23/18 by Frank Fusco (fr@nkfus.co)
//
// Standard header text component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


export default class TextHeader extends Component<{}> {
  render() {
    const {
      color,
      size,
      testID,
    } = this.props;

    var textStyles = [styles.textStyle];

    if (this.props.color) {
      textStyles.push ({color: color});
    }
    if (this.props.size) {
      textStyles.push ({fontSize: size});
    }

    return (
      <View>
         <Text style = {textStyles}>
           {this.props.children.toUpperCase ()}
         </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    textStyle: {
      color: '#151515',
      textAlign: 'center',
      fontSize: 12,
      letterSpacing: 1, // only for iOS; TODO: Hack Android solution
      fontFamily: 'Montserrat'
    },
});
