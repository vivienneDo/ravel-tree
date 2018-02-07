import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View

} from 'react-native';

// author: Alex Aguirre
// 1-24-18
// Splash Screen

export default class Splash extends Component<{}> {

    render() {
        return (
            <View style = {styles.viewStyle}>
            
                <Text style = {styles.headerBlue}>
                ravel
                    <Text style = {styles.headerGreen}>
                    tree
                    </Text>
                </Text>
        
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    headerBlue: {
        color: '#2e8af7',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'EB Garamond',
    },
    headerGreen : {
        color: '#3bb54a',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'EB Garamond',
    },
    viewStyle : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '85%',
        paddingBottom: '85%',
    }
});

AppRegistry.registerComponent('Splash', () => Splash);