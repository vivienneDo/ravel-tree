// Author:   Alex Aguirre
// Created:  01/18/18
// Modified: 03/08/18 by Frank Fusco (fr@nkfus.co)

// Standard "Input Text" component for RavelTree

import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';


export default class InputText extends Component {
  constructor (props) {
    super (props);
    this.state = {text: this.props.text};
  }

  componentWillReceiveProps (newProps)
  {
    this.setState ({text: newProps.text})
  }

  render() {

    const {
      placeholder,
      onChangeText,
      //text,
      height,
      width,
      multiline,
    } = this.props;

    const layoutStyles = [styles.layout];

    layoutStyles.push ([
      this.props.height ? {height: height} : {height: 35},
      this.props.width ? {width: width} : {width: '100%'},
    ]);

    return (
      <View style={layoutStyles}>
         <TextInput
           multiline = {multiline}
           style = {styles.inputStyle}
           placeholder = {placeholder}
           value = {this.state.text}
           placeholderTextColor = '#B7B7B7'
           underlineColorAndroid='transparent'
           onChangeText={(text) => {this.props.onChangeText (text)}}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    color: '#101010',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Roboto',
  }
});
