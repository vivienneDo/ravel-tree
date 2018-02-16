import React, {Component} from 'react';
import {
  AppRegistry, 
  Platform,
  StyleSheet, 
  Text, 
  View,
  TextInput
} from 'react-native';

// author: Alex Aguirre
// 1-18-18
// Input Text

export default class InputSearch extends Component<{}> {
  render() {

    const {
      placeHolder
    } = this.props;

    return (
      <View>
 
         <TextInput 
         style = {styles.inputStyle} 
         placeholder = {placeHolder} 
         placeholderTextColor = '#95989A'
         /> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputStyle: {
      color: '#101010',
    //  textAlign: 'center',
      fontSize: 20,
      borderColor: '#B7B7B7',
      fontFamily: 'EB Garamond',
    }
});

AppRegistry.registerComponent('InputSearch', () => InputSearch);