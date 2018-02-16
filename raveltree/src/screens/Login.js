import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from '../Loader';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import UserModel from '../models/UserModel';
import MainPage from './MainPage';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


const GeneralLoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();

const GLoginButton = MKButton.coloredButton()
    .withText('GOOGLE LOGIN')
    .build();




const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
        paddingTop: 20

    },

    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },

    loginButtonArea: {
        marginTop: 20,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
    },
    fontTest: {
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
});

export default class Login extends Component {
  state = {
      email :  '',
      password: '',
      error: '',
      loading: false,
  };

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

onGButtonPress() {
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
      } else {
          return (
          <View style={styles.form}>
          <GeneralLoginButton onPress={this.onButtonPress.bind(this)} />
          <GLoginButton onPress={this.onGButtonPress.bind(this)} />
           </View>
          );

      }
  }

  render() {

      const { form, fieldStyles, loginButtonArea, errorMessage, container, welcome } = styles;
    return (
    <ScrollView showsVerticalScrollIndicator = {false}>
      <View style={styles.form}>
        <Text> Login or create an account
        </Text>
        <MKTextField
            text={this.state.email}
            onTextChange={email => this.setState({email})}
            textInputStyle={fieldStyles}
            placeholder={'Email...'}
            tintColor={MKColor.Teal}

        />
        <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({password})}
            textInputStyle={fieldStyles}
            placeholder={'Password...'}
            tintColor={MKColor.Teal}
            password={true}
            paddingBottom = "50"

        />

        <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({password})}
            textInputStyle={fieldStyles}
            placeholder={'test'}
            tintColor={MKColor.Teal}
            password={true}
            paddingBottom = "50"

        />

        <View>
        <LoginButton readPermissions={['public_profile','email']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                console.log("Attempting to log into firebase");
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                       const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                       firebase.auth().signInWithCredential(credential)
                        .then(this.onAuthSuccess.bind(this))
                        .catch(this.onAuthFailed.bind(this));

                    console.log('Attempting log in with facebook');
                  }, (error) => {
                      console.log(error);
                  }
                )

                // Go to MainPage here
                console.log("Lol");

              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
          </View>

        <Text style={errorMessage}>
        {this.state.error}
        </Text>
        <View style={loginButtonArea}>
            {this.renderLoader()}
        </View>
      </View>
    </ScrollView>
    );
  }
}
