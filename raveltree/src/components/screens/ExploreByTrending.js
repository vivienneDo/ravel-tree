import React, {Component} from 'react';
import {
    AppRegistry, 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableOpacity
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
import TextHeader from './components/TextHeader/TextHeader';

export default class ExploreByCategory extends Component<{}> {

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator = {false}>

                <TouchableOpacity style = {{marginTop: 30, marginLeft: 17}}>
                    <Text style = {{color: '#2E8AF7'}}>
                        Back
                    </Text>
                </TouchableOpacity>

                {/* RavelTree logo at the top in the center */}
                <View style = {styles.logoStyle}>
                    <RTLogoText/>
                </View>

                {/* Explore Section */}
                <View style = {{marginLeft: 17}}>
                    <TextHeader title = "Explore"/>
                </View>

                {/* need to get working radioset and optionset here */}
                

                {/* related ravel cards will pop up here */}
                <View style = {styles.cardStyle}>
                    <RavelCard/>
                </View>

                {/* NavBar will go here */}

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
        //marginTop: 20,
        marginBottom: 15,
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20
    },
    inputStyle: {
        marginLeft: 17, 
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