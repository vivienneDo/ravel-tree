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
// Text Header

export default class TextHeader extends Component<{}> {
  render() {
    const {
      title
    } = this.props;

    return (
      <View>
         <Text style = {styles.textStyle}> 
          {title.toUpperCase()} 
         </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    textStyle: {
      color: '#151515',
    //  textAlign: 'center',
      fontSize: 12,
      letterSpacing: 1, // only for iOS
      fontFamily: 'Montserrat'
    },
});

AppRegistry.registerComponent('TextHeader', () => TextHeader);