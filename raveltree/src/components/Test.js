import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import Button from './Button';
import ButtonReverse from './ButtonReverse';

export default class Test extends Component {
  onPressTest () {

  }

  render (){
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Button title="Start a Ravel" onPress={this.onPressTest ()} />
        <ButtonReverse title="Explore" onPress={this.onPressTest ()} />
      </View>
    );
  }
}
