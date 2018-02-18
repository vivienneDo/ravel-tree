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
// Explore By Concept Screen

import RTLogoText from './components/RTLogoText';
import ButtonReverse from './components/ButtonReverse';
import Button from './components/Button';
import Divider from './components/Divider';
import InputSearch from './components/InputSearch/InputSearch';
import TextSerif from './components/TextSerif';
import TextHeader from './components/TextHeader/TextHeader';
import RadioSet from './components/RadioSet';
import RadioItem from './components/RadioItem';

export default class ExploreByConcept extends Component<{}> {

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

                <Divider/>
                
                <RadioSet/>

                <View style = {styles.inputStyle}>
                    <InputSearch placeHolder = {inputTxt}/>
                </View>
                
                <Divider/>

                {/* show the new and latest ravels for the user */}
                <View style = {styles.txtHStyle}>
                    <TextHeader title = "NEW FOR YOU"/>
                </View>

                <View style = {styles.cardStyle}>
                    
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

AppRegistry.registerComponent('ExploreByConcept', () => ExploreByConcept);