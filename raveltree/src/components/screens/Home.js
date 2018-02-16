import React, {Component} from 'react';
import {
    AppRegistry, 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native';

// author: Alex Aguirre
// 2-7-18
// Home Screen

import RTLogoText from './components/RTLogoText';
import ButtonReverse from './components/ButtonReverse';
import Button from './components/Button';
import Divider from './components/Divider';
import UserImage from './components/UserImage/UserImage';
import InputSearch from './components/InputSearch/InputSearch';
import TextSerif from './components/TextSerif';
import TextHeader from './components/TextHeader/TextHeader';
import PassageCard from './components/PassageCard/PassageCard';

export default class Home extends Component<{}> {

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator = {false}>
                {/* RavelTree logo at the top in the center */}
                <View style = {styles.logoStyle}>
                    <RTLogoText/>
                </View>

                {/* Explore and Start a Ravel Buttons */}
                <View style = {styles.buttonStyle}>
                    <ButtonReverse title = "EXPLORE"/>
                    <Button title = "START A RAVEL"/>
                </View>

                {/* user image, profile name, search for a concept, and new ravels */}
                <Divider/>
                <View style = {styles.userStyle}>
                    <UserImage/>
                    <Text 
                    style = {{alignText: 'center', left: 10, fontSize: 10, 
                    fontFamily: 'EB Garamond'}}>
                        USERNAME
                    </Text>
                </View>

                <View style = {styles.inputStyle}>
                    <InputSearch placeHolder = {inputTxt}/>
                </View>
                
                <Divider/>

                {/* show the new and latest ravels for the user */}
                <View style = {styles.txtHStyle}>
                    <TextHeader title = "NEW FOR YOU"/>
                </View>

                <View style = {styles.cardStyle}>
                    <PassageCard/>
                </View>

            </ScrollView>
        ); 
    }
}

var inputTxt = 'Type a concept. "In a world..."';

const styles = StyleSheet.create({
    logoStyle: {
       // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        paddingBottom: 15,
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20
    },
    userStyle: {
        marginTop: 15,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        marginLeft: 20, 
        paddingBottom: 20, 
        marginTop: 10,
    },
    txtHStyle: {
        marginLeft: 20, 
        paddingBottom: 20, 
        marginTop: 13
    },
    cardStyle: {
        alignItems: 'center'
       // marginLeft: 20, 
        //paddingBottom: 20,
      //  marginTop: 13
    }
});

AppRegistry.registerComponent('Home', () => Home);