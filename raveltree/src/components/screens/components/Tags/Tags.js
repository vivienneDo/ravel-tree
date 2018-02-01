import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TouchableHighlight,
  
} from 'react-native';

// 1-20-18
// Vote Bar

export default class Tags extends Component<{}> {

    // keeps track of whether the tag is active (pressed) or not
    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
     }

    

    render() {
        return (
            <View>
                {/* if the tag is pressed (active)
                    change the style to active and the pressStatus to true */}
                <TouchableOpacity
                style = {this.state.pressStatus ? styles.activeStyle : styles.inactiveStyle}
                onPress = {()=> this.setState({pressStatus: !this.state.pressStatus})}
                >
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
        borderRadius: 30
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