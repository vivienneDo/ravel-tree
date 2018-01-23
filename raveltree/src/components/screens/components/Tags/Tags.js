import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

// 1-20-18
// Vote Bar


export default class Tags extends Component<{}> {

    render() {
        return (
            <View>
                <TouchableOpacity style = {styles.inactiveStyle}>
                    <Text style = {styles.textStyle}>
                        StoryTags
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.activeStyle}>
                    <Text style = {styles.textStyle}>
                        StoryTags
                    </Text>
                </TouchableOpacity>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
   inactiveStyle: {
        backgroundColor: '#B1B1B1',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
   },
   textStyle: {
    color: 'white',
    textAlign: 'center',
   },
   activeStyle: {
    backgroundColor: '#2E8AF7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
   },
});

AppRegistry.registerComponent('Tags', () => Tags);