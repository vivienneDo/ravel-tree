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
// Ravel Card




export default class RavelCard extends Component<{}> {


    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.ravelStyle}>
                    {/* user icon */}
                    <TouchableOpacity
                    activeOpacity = {1}
                    >
                        <Image 
                        style = {styles.imageStyle} 
                        source = {require('../../greenarrow.jpg')}
                        />
                    </TouchableOpacity>

                    {/* Passage Name  */}
                    <Text style = {styles.textStyle}>
                        {pass}
                    </Text>

                    {/* here goes IconUser with participant count */}
                    <Text style = {styles.textStyle}> 
                        {part} 
                    </Text>
                    {/* Here goes IconLeaf with score */}
                    <Text style = {styles.textStyle}> 
                        score# 
                    </Text>
                </View>
                <Text style = {styles.passageStyle}>
                    Passage...
                </Text>
            </View>
        ); 
    }
}

var pass = '\tPassage Name';
var part = '\tparticipant#';

const styles = StyleSheet.create({
    container: {
        borderColor: '#8D8D8D',
        borderWidth: 2,
        borderRadius: 20,
        height: '25%',
        width: 300
    },
    imageStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'relative',
        borderColor: '#95989A',
        borderWidth: 2,
        left: '30%'
    },
    textStyle: {
        fontSize: 16,
        fontFamily: 'EBGaramond',
        alignSelf: 'center'
    },
    ravelStyle: {
     //   justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5
    },
    passageStyle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#8D8D8D',
        margin: '3%'
    }
});

AppRegistry.registerComponent('RavelCard', () => RavelCard);