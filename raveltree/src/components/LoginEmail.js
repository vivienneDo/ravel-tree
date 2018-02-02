import React, {Component} from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import UserModel from '../models/UserModel';
import MainPage from './MainPage';
import InputForm from './screens/components/InputForm/InputForm';

// 1-24-18
// Email Login Screen

export default class LoginEmail extends Component<{}> {

    state = {
        email :  '',
        password: '',  
        error: '',
        loading: false,    
    };

    /* take in and store the user info on Firebase */
    onButtonPress() {
        const {email, password} = this.state;
        this.setState({error: '', loading: true });
  
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess.bind(this))
          .catch(() => {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then(this.onAuthSuccess.bind(this))
                  .catch(this.onAuthFailed.bind(this));
          });
    }

    onAuthSuccess() {
        this.setState({
          email :  '',
          password: '',  
          error: '',
          loading: false, 
        });
    }
  
    onAuthFailed() {
        this.setState({
            error: 'Authenticiation Failed',
            loading: false,
        });
    }

    renderLoader() {
        if (this.state.loading) {
            return <Loader size="large"/>;
        } 
        else {
            return (
            <View style = {styles.gStyle}> 
            <GeneralLoginButton 
               onPress = {this.onButtonPress.bind(this)} 
          /> 
             </View> 
            );
        }
    }

    render() {
        const { 
            fieldStyles
          } = styles;

        return (
            <ScrollView showsVerticalScrollIndicator = {false}>

                 {/* Logo */}
                <Text style = {{alignSelf: 'center', paddingBottom: 50, paddingTop: 300}}>
                    <Text style = {styles.logoStyleBlue}>
                        ravel
                    </Text>
                    <Text style = {styles.logoStyleGreen}>
                        tree
                    </Text>
                </Text>

                {/* placeholders for email */}
                <TextInput 
                style = {styles.inputStyle} 
                placeholder = {'\tEmail'} 
                text = {this.state.email}
                onTextChange={email => this.setState({email})}
                placeholderTextColor = '#939393'/> 

                {/* placeholders for email */}
                <TextInput 
                style = {styles.inputStyle} 
                placeholder = {'\tPassword'} 
                text={this.state.password}
                onTextChange={password => this.setState({password})}
                password={true}
                placeholderTextColor = '#939393'/> 

                {/* buttons for register and login */}
                <View style = {{flexDirection: 'row', margin: 15, justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.buttonStyleBlue}>
                        <Text style = {styles.textStyle}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.buttonStyleGreen}>
                        <Text style = {styles.textStyle}>Log In</Text>
                    </TouchableOpacity>
                </View>
                
                {/* rest password text and button */}
                <View style = {{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style = {styles.forgotStyle}>
                        Forgot your password? 
                    </Text>
                    <Button title = 'Reset it.'/>
                </View>

                {/* the terms and privacy */}
        <TouchableOpacity 
        style = {{alignItems: 'center'}}>
            <Text style = {{fontSize: 12, color: '#2e8af7', margin: 10}}>
                Terms and Privacy
            </Text>
        </TouchableOpacity>
            </ScrollView>
        ); 
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        alignSelf: 'center',
        color: '#101010',
        textAlign: 'auto',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#F0F0F0',
        paddingTop: 8,
        paddingBottom: 8,
        height: 40,
        width: '80%',
        margin: 5,
        /*fontFamily: 'Roboto',*/
    },
      logoStyleBlue: {
        color: '#2e8af7',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Iowan Old Style',
    },
    logoStyleGreen: {
        color: '#3bb54a',
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Iowan Old Style',
    },
    buttonStyleBlue: {
        alignItems: 'center',
        backgroundColor: '#2e8af7',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10,
        width: '35%',
        right: '80%',
    },
    textStyle: {
        color: 'white'
    },
    buttonStyleGreen: {
        alignItems: 'center',
        backgroundColor: '#3bb54a',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10,
        width: '35%',
        left: '80%',
    },
    forgotStyle: {
     //   alignSelf: 'center',
        color: '#969696',
        fontSize: 16
    }
});

AppRegistry.registerComponent('LoginEmail', () => LoginEmail);