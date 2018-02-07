import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View

} from 'react-native';

// author: Alex Aguirre
// 2-7-18
// Home Screen

export default class Home extends Component<{}> {

    render() {
        return (
            <View>
                
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    
});

AppRegistry.registerComponent('Home', () => Home);