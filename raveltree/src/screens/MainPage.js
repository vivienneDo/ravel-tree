import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform, Button } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import {MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
import { loadInitialUserCreatedRavel, getCurrentLoggedInUser, getAllUserCreatedRavel, userLogOff, updateUserProfile, getUserProfile, getCurrentLoggedInUserUid, startCreateRavel} from '../actions';
import { connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';

import ImagePicker from 'react-native-image-picker';
import SelectImage from '../utils/CameraPicker.js';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const theme = getTheme();

const CameraPickerButton = MKButton.coloredButton()
    .withText('Camera Picker')
    .build();

const LogoutButton = MKButton.coloredButton()
    .withText('Log Off')
    .build();


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF', 
  },
  imageContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width:150,
    borderRadius: 150/2,
    backgroundColor: 'black',
  },
  avatarSource: {
    height: 150,
    width:150,
    borderRadius: 150/2,
  },
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
      top: 10,
      left: 80,
      fontSize: 24,
  },
  title2: {
      top: 35,
      left: 82,
      fontSize: 18,
  },
  image: {
      flex: 0,
      height: 100,
      width: 333,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  closeIcon: {
      position: 'absolute',
      top: 5,
      left: 295,
      color: 'rgba(233,166,154,0.8)',
      backgroundColor: 'rgba(255,255,255,0)',
  },  
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  textIcons: {
      color: '#26a69a',
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },

  editIcon: {
      color: '#26a6e4',
    },

  sections: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 10, 
      width: 100, 
  },

  deleteIcon: {
    color: '#e9a69a',

  },

  editDeleteArea: {

    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211,0.3)',
    marginBottom: 10,

  },
});

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.onCameraPickPress = this.onCameraPickPress.bind(this);
    }

    onCameraPickPress() {
        SelectImage().then((url) => {
          this.props.updateProfilePicture(url);
        })
        .catch((error) => {
          console.log(error);
        })

    }

    onLogOutButtonPress() {
        userLogOff();
    }

    componentWillMount() {

        this.props.getCurrentUserProfile();
    };


  renderImage() {
    if (!this.props.currentUserProfile.photoURL || this.props.currentUserProfile.photoURL.length === 0){
        console.log('Showing text');
        return <Text style = {{color:'white'}}>Hello</Text>
    } else {
        console.log('Showing Image');
        return <Image style = {styles.avatarSource} source={{uri:this.props.currentUserProfile.photoURL}}/>;
    }    
  }
    
  render() {
    return (  
      <View style={styles.container}>
        <View style ={styles.imageContainer}>
            {this.renderImage()}
        </View>
        <Text>{this.props.last_name}</Text>
        <Text>{this.props.first_name}</Text>
        <Text>{this.props.bio}</Text>
        <CameraPickerButton onPress={this.onCameraPickPress}/> 
        <LogoutButton onPress = {this.onLogOutButtonPress}/>
      </View>
    );
  }
}

const mapStateToProps = state => {

    console.log(state);
    const {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed, 
        stat_passage_written, upvotes, ravel_points, currentUserProfile} = state.current_user;
    return {first_name, last_name, bio, photoURL, stat_ravel_led, stat_ravel_contributed, 
        stat_passage_written, upvotes, ravel_points, currentUserProfile };
};
  
  export default connect(mapStateToProps, actions) (MainPage);


