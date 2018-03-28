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
// Input Text

export default class InputText extends Component<{}> {
  render() {
    return (
      <View>
          <Text></Text>
         <TextInput style = {styles.inputStyle} placeholder = {inputTxt} placeholderTextColor = '#B7B7B7'/> 
      </View>
    );
  }
}

var inputTxt = 'Type a passage name (e.g., "The Reckoning").';


const styles = StyleSheet.create({
    inputStyle: {
      color: '#101010',
      textAlign: 'center',
      fontSize: 12,
      borderColor: '#B7B7B7',
      borderWidth: 1,
      paddingTop: 8,
      paddingBottom: 8
      
      /*fontFamily: 'Roboto',*/
    }
});

AppRegistry.registerComponent('InputText', () => InputText);