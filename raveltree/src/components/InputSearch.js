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

    const {
      placeholder,
      //text,
    } = this.props;

    return (
      <View style={styles.layout}>
         <TextInput
         style = {styles.input}
         placeholder = {placeholder}
         placeholderTextColor = '#95989A'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    layout: {
      width: '90%',
      height: 40,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    input: {
      color: '#101010',
      textAlign: 'left',
      fontSize: 20,
      borderColor: '#B7B7B7',
      fontFamily: 'EB Garamond',
    }
});

AppRegistry.registerComponent('InputSearch', () => InputSearch);
