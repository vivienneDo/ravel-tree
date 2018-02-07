import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

// 1-18-18
// Input Text

export default class InputForm extends Component<{}> {
  render() {

    const {
      placeholder,
      //text,
    } = this.props;

    return (
      <View style={styles.layout}>
        <TextInput
          style = {styles.input}
          placeholder = {placeholder}
          placeholderTextColor = '#939393'
          autoCapitalize = 'none'
          //value = {text}
        />
      </View>
    );
  }
}

var inputTxt = 'Email';


const styles = StyleSheet.create({
  layout: {
    width: '80%',
    height: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  input: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('InputForm', () => InputForm);
