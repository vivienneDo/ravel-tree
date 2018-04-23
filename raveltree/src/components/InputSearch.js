// Author: Alex Aguirre
// Created: 01/18/18
// Modified: 02/26/18 by Frank Fusco (fr@nkfus.co)
//
// "Input Search" component for RavelTree.

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


export default class InputSearch extends Component {

  constructor (props) {
    super (props);
    this.state = {text: ''};
  }

  componentWillReceiveProps (newProps)
  {
    this.setState ({text: newProps.text})
  }

  render() {

    const {
      placeholder,
      autoCapitalize,
      onChangeText,
      text,
    } = this.props;

    return (
      <View style={styles.layout}>
         <TextInput
            style = {styles.input}
            placeholder = {placeholder}
            placeholderTextColor = '#95989A'
            autoCapitalize={autoCapitalize}
            value = {text}
            underlineColorAndroid='transparent'
            onChangeText={(text) => {this.props.onChangeText (text)}}
         />
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
