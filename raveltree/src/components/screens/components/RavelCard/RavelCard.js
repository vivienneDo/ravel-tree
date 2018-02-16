import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity
} from 'react-native';

// author: Alex Aguirre
// 2-5-18
// Ravel Card

import IconLeaf from '../IconLeaf';
import IconUser from '../IconUser';
import UserImage from '../UserImage/UserImage';

export default class RavelCard extends Component<{}> {

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.ravelStyle}>
                    <View style = {{left: '30%'}}>
                        <UserImage/>
                    </View>

                    {/* Passage Name  */}
                    <Text style = {styles.textStyle}>
                        {pass}
                    </Text>

                    <Text>
                        {tab}
                        {space}
                    </Text>

                    {/* here goes IconUser with participant count */}
                    <IconUser/>
                    <Text style = {styles.textStyle}> 
                        {space}
                        #
                    </Text>

                    <Text>
                        {tab}
                    </Text>

                    {/* Here goes IconLeaf with score */}
                    <IconLeaf/>
                    <Text style = {styles.textStyle}> 
                        {space}
                        # 
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
var tab = '\t';
var space = '  ';

const styles = StyleSheet.create({
    container: {
        borderColor: '#8D8D8D',
        borderWidth: 2,
        borderRadius: 20,
        height: '25%',
        width: 300
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