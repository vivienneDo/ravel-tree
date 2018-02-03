import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import firebase from 'firebase';
import { connect} from 'react-redux';
import * as actions from '../actions';
import MainPage from './MainPage';
import RavelPage from './RavelPage';
import {userResetPassword, signInWithEmail, createUserWithEmail, updateUserProfile} from '../actions';


// import fbsdk and use LoginButton and AccessToken
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;


const GeneralLoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();

const GLoginButton = MKButton.coloredButton()
    .withText('Create user')
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

    signInWithEmail(email,password);
    this.onAuthSuccess.bind(this);
    this.onAuthFailed.bind(this);

  };

onGButtonPress() {

    const {email, password} = this.state;
    this.setState({error: '', loading: true });

    createUserWithEmail(email,password);

    this.onAuthSuccess.bind(this);
    this.onAuthFailed.bind(this);
    

};

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
        <LoginButton readPermissions = {['public_profile','email']}
          onLoginFinished = {
            (error, result) => {
              if (error) {
                alert("facebook login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("facebook login is cancelled.");
              } else {
                console.log("Attempting to log into firebase through facebook");
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                         const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                         firebase.auth().signInWithCredential(credential)
                          .then((user) => {
                            let accessToken = data.accessToken;
                                const responseInfoCallback = (error, results) => {
                        if (error) {
                            console.log('Error fetching data from ' + error.toString());
                        }
                        else {
                            console.log('Success fetching data' + result.toString());
                            console.log(results['first_name']);  
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/userProfile`)
                            updateUserProfile(user, {first_name:results['first_name'],last_name:results['last_name'],bio:'',photoURL:'', stat_ravel_led:'', stat_passage_written:'', stat_ravel_contributed:'', 
                                upvotes:'', ravel_points:'' });
                        }
                    }
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken: accessToken,
                            parameters: {
                                fields: {
                                    string: 'first_name, last_name'
                                }
                            }
                        },
                        responseInfoCallback
                        
                    );

                    new GraphRequestManager().addRequest(infoRequest).start();
                          })
                          .catch(this.onAuthFailed.bind(this));
  
                      console.log('Attempting log in with facebook');
        
                }, (error) => {
                    console.log(error);
                    }
                )
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



