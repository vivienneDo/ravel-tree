// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 03/24/18
//
// Profile screen for RavelTree.
//
// Note: "isOwned" displays the active user's profile, including links to log
// out and edit content. If false, these elements will be omitted, and
// "message" and "follow" functions will be added.
//
// TODO: Align statistics.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import * as actions from '../actions';
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import TextHeader from '../components/TextHeader'
import InputText from '../components/InputText'
import Button from '../components/Button'
import UserImage from '../components/UserImage'
import IconLeaf from '../components/IconLeaf'

import ImagePicker from 'react-native-image-picker';
import SelectImage from '../utils/CameraPicker.js';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class Profile extends Component {
  constructor (props) {
    super (props);

    console.log (this.props.screenData);

    var userID = this.props.screenData.userID;

    this.state = {
      mode: 'view',
      ...this.props.screenData,
    };

    this.getUserProfile (userID);
  }

  componentWillReceiveProps (newProps) {
    console.log (newProps);
    var newID = newProps.screenData.userID;
    var oldID = this.props.screenData.userID;
    if (newID && newID != oldID) {
      this.getUserProfile (newID);
    }
  }

  getUserProfile (userID) {
    this.props.getUserProfile (userID)
    .then  (profile => {
      var isOwned = profile.user_uid == this.props.currentUserProfile.user_uid;
      console.log (profile.user_uid);
      this.setState ({
        profile: profile,
        isOwned: isOwned,
        userID: profile.user_uid,
        firstName: profile.first_name,
        lastName: profile.last_name,
        score: profile.ravel_points,
        photoURL: profile.photoURL,
        bio: profile.bio,
        bioEdit: profile.bio,
        ravelsLed: profile.stat_ravel_led,
        ravelsContributedTo: profile.stat_ravel_contributed,
        passagesWritten: profile.stat_passage_written,
        upvotesReceived: profile.upvotes,
      });
      this.props.setProfileIsOwned (isOwned);
    })
    .catch (error => { console.log (error); });
  }

  onPressChangeImage () {
    SelectImage().then((url) => {
      this.props.updateProfilePicture (url);
    })
    .catch((error) => {
      console.log(error);
    })
    .then (() => {
      this.props.getCurrentUserProfile ();
    });
  }

  onPressLogOut () {
    this.props.userLogOff ();
    FBSDK.LoginManager.logOut ();
    this.props.setActiveScreen ('Login');
  }

  onPressFollow () {
    // TODO
  }

  onPressMessage () {
    // TODO
  }

  onPressEdit () {
    this.setState ({mode: 'edit'});
  }

  onChangeBioEdit (bioEdit) {
    this.setState ({bioEdit: bioEdit});
  }

  onPressSaveChanges () {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var bioEdit = this.state.bioEdit;
    this.props.updateCurrentUserProfile ({first_name: firstName, last_name: lastName, bio: bioEdit});
  }

  render (){
    const {
      user,
      score,
      bio,
      statistics,
      testID,
    } = this.props;

    console.log (this.state.userID);

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <UserImage {...this.props} userID={this.state.userID} size={100} />

            {this.state.isOwned ? (
              <TextLink onPress={() => this.onPressChangeImage ()} size={12}>Change Image</TextLink>
            ) : (
              <View style={{display: 'none'}} />
            )}

          </View>
          <View style={styles.topRight}>
            <TextSerif size={22}>
              {this.state.firstName + ' ' + this.state.lastName}
            </TextSerif>
            <View style={styles.score}>
              <IconLeaf size={30} />
              <TextSerif size={24}>{this.state.score}</TextSerif>
            </View>

            {this.state.isOwned ? (
              <TextLink onPress={() => this.onPressLogOut ()} size={12}>Log Out</TextLink>
            ) : (
              <View>
                <View style={styles.spaceBelow}>
                  <TextLink onPress={() => this.onPressFollow ()} size={12}>Follow</TextLink>
                </View>
                <TextLink onPress={() => this.onPressMessage ()}size={12}>Message</TextLink>
              </View>
            )}

          </View>
        </View>

        {/*this.state.showCameraPicker ? (
          <CameraPicker />
        ) : (
          <View style={{display: 'none'}} />
        )*/}

        <ScrollView style={styles.scroll}>
          <View style={styles.bio}>
            <View style={styles.bioHeader}>
              <TextHeader>Bio&nbsp;&nbsp;</TextHeader>

              {this.state.isOwned ? (
                <TextLink onPress={() => this.onPressEdit ()} size={12}>Edit</TextLink>
              ) : (
                <View style={{display: 'none'}} />
              )}

            </View>

            {this.state.mode == 'edit' ? (
              <View style={styles.editBio}>
                <InputText
                  text={this.state.bioEdit}
                  placeholder={'Add your autobiography (e.g., "I was born in a log cabin in Illinois...").'}
                  onChangeText={(bioEdit) => this.onChangeBioEdit (bioEdit)}
                  multiline
                  height={200}
                />
                <View style={styles.spaceBelow} />
                <Button title={'Save Changes'} onPress={() => this.onPressSaveChanges ()} />
              </View>
            ) : (
              <TextSerif size={16}>{this.state.bio}</TextSerif>
            )}

          </View>
          <View style={styles.statistics}>
            <View style={styles.statisticsHeader}>
              <TextHeader>Statistics</TextHeader>
            </View>
            <View style={styles.statisticsContent}>
              <View style={styles.statisticsLeft}>
                <View style={styles.leftItem}>
                  <TextSans>Ravels led:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Ravels contributed to:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Passages written:</TextSans>
                </View>
                <View style={styles.leftItem}>
                  <TextSans>Upvotes received:</TextSans>
                </View>
              </View>
              <View style={styles.statisticsRight}>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{this.state.ravelsLed}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{this.state.ravelsContributedTo}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{this.state.passagesWritten}</TextSans>
                </View>
                <View style={styles.rightItem}>
                  <TextSans size={20} bold color={'#3BB54A'}>{this.state.upvotesReceived}</TextSans>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  topLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topRight: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bio: {
    marginBottom: 20,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  editBio: {
    alignItems: 'center',
  },
  statistics: {

  },
  statisticsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  statisticsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  statisticsLeft: {
    flexDirection: 'column',
     alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  statisticsRight: {
    flexDirection: 'column',
     alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  leftItem: {
    marginVertical: 6,
  },
  rightItem: {
    marginVertical: 1.8,
  },
  spaceBelow: {
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    showNavBar,
    profileIsOwned,
    screenData,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    userProfile,
  } = state.user;

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    profileIsOwned,
    screenData,
    currentUserProfile,
    userProfile,
  };
}

export default connect (mapStateToProps)(Profile);
