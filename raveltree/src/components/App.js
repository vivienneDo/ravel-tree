import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import UserImage from './screens/components/UserImage/UserImage';
import VoteBar from './screens/components/VoteBar/VoteBar';

/* moved backend work to Backend.js
  using this file to test frontend components
*/

export default class App extends Component { 
  render() {
    return (
      <View style = {styles.testStyle}>
        <VoteBar/>
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