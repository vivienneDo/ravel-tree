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

export default class InputSearch extends Component<{}> {
  render() {
    return (
      <View>
          <Text></Text>
         <TextInput style = {styles.inputStyle} placeholder = {inputTxt} placeholderTextColor = '#95989A'/> 
      </View>
    );
  }
}

var inputTxt = 'Type a concept. "In a world..."';


const styles = StyleSheet.create({
    inputStyle: {
      color: '#101010',
      textAlign: 'center',
      fontSize: 20,
      borderColor: '#B7B7B7',
      /*fontFamily: 'EB Garamond',*/
    }
});

AppRegistry.registerComponent('InputSearch', () => InputSearch);