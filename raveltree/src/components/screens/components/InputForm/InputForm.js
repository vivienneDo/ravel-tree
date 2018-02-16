import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TextInput
} from 'react-native';

// author: Alex Aguirre
// 1-18-18
// Input Text

export default class InputForm extends Component<{}> {
  render() {
    return (
      <View>
        {/* used for proper spacing */}
          <Text></Text>

         <TextInput 
         style = {styles.inputStyle} 
         placeholder = {inputTxt}
         placeholderTextColor = '#939393'/> 
      </View>
    );
  }
}

var inputTxt = 'Email';


const styles = StyleSheet.create({
    inputStyle: {
      color: '#101010',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: '#F0F0F0',
      paddingTop: 8,
      paddingBottom: 8,
      fontFamily: 'Roboto',
    }
});

AppRegistry.registerComponent('InputForm', () => InputForm);