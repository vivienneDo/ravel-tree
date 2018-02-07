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

import VoteBar from '../VoteBar/VoteBar';


export default class PassageCard extends Component<{}> {


    render() {
        return (
            <View style = {styles.container}>

                <View style = {styles.cardStyle}>

                    {/* Ravel Name  */}
                    <Text style = {styles.textSerif}>
                        {rav}
                    </Text>
                    {/* ravel code */}
                    <Text 
                    style = {{marginRight: '4%',fontSize: 13, fontFamily: 'Roboto',
                    alignSelf: 'center', color: '#95989A'}}>
                        {code}
                    </Text>

                </View>

                <View style = {styles.passageName}>

                    {/* passage name */}
                    <Text style = {styles.textSans}>
                        {pass}
                    </Text>
                    
                    {/* user icon */}
                    <TouchableOpacity
                    activeOpacity = {1}
                    >
                        <Image 
                        style = {styles.imageStyle} 
                        source = {require('../../greenarrow.jpg')}
                        />
                    </TouchableOpacity>
                </View>

                
                <View style = {styles.cardStyle}>

                    {/* passage text */}
                    <Text style = {styles.textSerif}>
                        {pText}
                    </Text>

                </View>

                <View style = {styles.bottomStyle}>
                    {/* click to read more of the passage */}
                    <TouchableOpacity
                    activeOpacity = {1}> 
                        <Text style = {styles.moreButton}>
                            ...
                        </Text>
                    </TouchableOpacity>

                    <VoteBar/>
                </View>

            </View>
        ); 
    }
}

var pass = 'Passage Name';
var rav = 'Ravel Name';
var code = '##';
var pText = 'Passage Text...\n\n\n\n\n\n\n'

const styles = StyleSheet.create({
    container: {
        borderColor: '#8D8D8D',
        borderWidth: 2,
        borderRadius: 20,
        height: 300,
        width: 300
    },
    imageStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'relative',
        borderColor: '#95989A',
        borderWidth: 2,
        marginRight: '3%'
      },
      cardStyle: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 9,
          marginRight: 10
      },
      textSerif: {
        fontSize: 16,
        fontFamily: 'EBGaramond',
        alignSelf: 'center',
        color: '#101010',
        marginLeft: 17
    },
    textSans: {
        fontSize: 13,
        fontFamily: 'Roboto',
        alignSelf: 'center',
        color: '#95989A',
        marginLeft: 17
    },
    passageName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginRight: 10
    },
    moreButton: {
        fontSize: 35,
        fontFamily: 'Roboto',
        alignSelf: 'baseline',
        color: '#95989A',
        marginLeft: 17,
        textAlign: 'center'
    },
    bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginRight: 10,
        alignItems: 'center'
    },
});

AppRegistry.registerComponent('PassageCard', () => PassageCard);