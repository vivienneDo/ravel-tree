import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';

// 2-5-18
// Passage Card




export default class PassageCard extends Component<{}> {


    render() {
        return (
            <View>
                <View style = {styles.container}>
                    
                </View>
            </View>
        ); 
    }
}


const styles = StyleSheet.create({
    container: {
        borderColor: '#8D8D8D',
        borderWidth: 2,
        borderRadius: 20,
        height: 300,
        width: 300
    }
});

AppRegistry.registerComponent('PassageCard', () => PassageCard);