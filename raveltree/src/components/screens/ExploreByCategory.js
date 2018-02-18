import React, {Component} from 'react';
import {
    AppRegistry, 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native';

// author: Alex Aguirre
// 2-17-18
// Explore By Category Screen

import RTLogoText from './components/RTLogoText';
import ButtonReverse from './components/ButtonReverse';
import Button from './components/Button';
import Divider from './components/Divider';
import InputSearch from './components/InputSearch/InputSearch';
import RavelCard from './components/RavelCard/RavelCard';
import RadioSet from './components/RadioSet';
import OptionSet from './components/OptionSet';

export default class ExploreByCategory extends Component<{}> {

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
                
                {/* need to get working radioset and optionset here */}

                <View style = {styles.inputStyle}>
                    <InputSearch placeHolder = {inputTxt}/>
                </View>
                
                <Divider/>

                <View style = {styles.cardStyle}>
                    <RavelCard/>
                </View>

            </ScrollView>
        ); 
    }
}

var inputTxt = 'Search a category';

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
    cardStyle: {
        alignItems: 'center',
       // marginLeft: 20, 
        //paddingBottom: 20,
        marginTop: 17
    }
});