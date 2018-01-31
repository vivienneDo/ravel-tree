import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  StatusBar
} from 'react-native';
import { Button } from './Button';

export default class Login extends Component {
  render (){
    return (
      <View style={StatusBar}>
        <StatusBar></StatusBar>
        <View>
          <Text>Test</Text>
        </View>
      </View>
    );
  }
}
