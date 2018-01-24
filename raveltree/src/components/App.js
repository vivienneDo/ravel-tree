import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import UserImage from './screens/components/UserImage/UserImage';
import VoteBar from './screens/components/VoteBar/VoteBar';
import Tags from './screens/components/Tags/Tags';
import InputForm from './screens/components/InputForm/InputForm';
import InputSearch from './screens/components/InputSearch/InputSearch';
import InputText from './screens/components/InputText/InputText';
import TextHeader from './screens/components/TextHeader/TextHeader';
import Splash from './screens/Splash';

/* moved backend work to Backend.js
  using this file to test frontend components
*/

export default class App extends Component { 
  render() {
    return (
    //  <View style = {styles.testStyle}>
      <View>
        <Splash/>
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