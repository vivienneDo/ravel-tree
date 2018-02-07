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
// 2-3-18
// Ravel Stub

export default class RavelStub extends Component<{}> {


    render() {
        return (
            <View style = {styles.testStyle}>
                <View style = {styles.container}>
                    
                    {/* user icon */}
                    <TouchableOpacity
                    activeOpacity = {1}>
                        <Image 
                        style = {styles.imageStyle} 
                        source = {require('../../greenarrow.jpg')}
                        />
                    </TouchableOpacity>
                    {/* passagravel name */}
                    <Text style = {styles.textStyle}>
                        {pass}
                    </Text>
                    {/* here goes IconUser with participant count */}
                    <Text style = {styles.textStyle}> {part} </Text>
                    {/* Here goes IconLeaf with score */}
                    <Text style = {styles.textStyle}> score # </Text>
                </View>
            </View>
        ); 
    }
}

var pass = '\tPassageName';
var part = '\tparticipant #';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: '#8D8D8D',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    imageStyle: {
        width: 26,
        height: 26,
        borderRadius: 13,
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
      testStyle: {
        flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
       }
});

AppRegistry.registerComponent('RavelStub', () => RavelStub);