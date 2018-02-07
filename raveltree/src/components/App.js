import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Backend from './Backend';
import PassageCard from './screens/components/PassageCard/PassageCard';
import RavelCard from './screens/components/RavelCard/RavelCard';

/* moved backend work to Backend.js
  using this file to test frontend components
*/

export default class App extends Component { 
  render() {
    return (
      <View style = {styles.testStyle}>
        <PassageCard/>
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