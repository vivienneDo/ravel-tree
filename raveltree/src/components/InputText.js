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

    const {
      placeholder,
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
         placeholderTextColor = '#B7B7B7'/>
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
