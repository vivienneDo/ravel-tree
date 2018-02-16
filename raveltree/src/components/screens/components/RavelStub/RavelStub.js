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

import IconLeaf from '../IconLeaf';
import IconUser from '../IconUser';
import UserImage from '../UserImage/UserImage';

export default class RavelStub extends Component<{}> {

    render() {
        return (
            <View style = {styles.testStyle}>
                <View style = {styles.container}>
                    
                    {/* user icon */}
                    <View style = {{left: '30%'}}>
                        <UserImage/>
                    </View>

                    {/* passagravel name */}
                    <Text style = {styles.textStyle}>
                        {pass}
                    </Text>

                    <Text>
                        {tab}
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
                        {space}
                    </Text>
                </View>
            </View>
        ); 
    }
}

var pass = '\tPassageName';
var tab = '\t';
var space = '  ';

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