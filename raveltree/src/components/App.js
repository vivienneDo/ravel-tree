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
import RavelStub from './screens/components/RavelStub/RavelStub';
import Home from './screens/Home';
import Splash from './screens/Splash';
import ExploreByTags from './screens/ExploreByTags';
import Tags from './screens/components/Tags/Tags';
import ExploreByCategory from './screens/ExploreByCategory';

/* moved backend work to Backend.js
  using this file to test frontend components
*/

export default class App extends Component { 
  render() {
    return (
      //<View style = {styles.testStyle}>
      <View>
        <ExploreByCategory/>
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