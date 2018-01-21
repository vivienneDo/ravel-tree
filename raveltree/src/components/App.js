import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import UserImage from './screens/components/UserImage/UserImage';

/* moved backend work to Backend.js
  using this file to test frontend components
*/

export default class App extends Component { 
  render() {
    return (
      <View style = {styles.testStyle}>
        <UserImage/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  testStyle: {
   flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});