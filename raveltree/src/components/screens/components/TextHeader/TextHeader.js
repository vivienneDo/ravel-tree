import React, {Component} from 'react';
import {
  AppRegistry, 
  Platform,
  StyleSheet, 
  Text, 
  View,
  TextInput
} from 'react-native';

// 1-18-18
// Text Header

export default class TextHeader extends Component {
  render() {
    return (
      <View>
         <Text style = {styles.textStyle}> YOUR RAVELS </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    textStyle: {
      color: '#151515',
      textAlign: 'center',
      fontSize: 12,
      letterSpacing: 1,
      /*fontFamily: 'Montserrat',*/
    },
});

AppRegistry.registerComponent('TextHeader', () => TextHeader);