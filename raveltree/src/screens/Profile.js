// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 03/13/18
//
// Profile screen for RavelTree.
//
// Pass in user data as props like so:
//
// <Profile
//    isOwned
//    user={'Rebecca Bates'}
//    score={1064}
//    bio={'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.'}
//    statistics={{
//      ravelsLed: 5,
//      ravelsContributedTo: 29,
//      passagesWritten: 213,
//      upvotesReceived: 731,
//    }}
// />
//
// Note: "isOwned" displays the active user's profile, including links to log
// out and edit content. If false, these elements will be omitted, and
// "message" and "follow" functions will be added.
//
// TODO: Set isOwned locally, checking whether the passed userID matches the
//       userID of the current user in global Redux state.
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

const TEST_USER = 'Rebecca Bates';
const TEST_SCORE = 1064;
const TEST_BIO = 'Rebecca Bates was born on a dairy farm in upstate New York. Her parents made it a point to rear her with a thorough appreciation of manual labor. She seeks to bring all that appreciation into her writing—though it usually finds its way in there pretty much on its own.\n\nRebecca earned an MFA from Georgetown in 2015. She lives in Manhattan with six pugs.';
const TEST_STATISTICS = {
  ravelsLed: 5,
  ravelsContributedTo: 29,
  passagesWritten: 213,
  upvotesReceived: 731,
}

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isOwned: this.props.isOwned,
      mode: 'view',
      //showCameraPicker: false,
      firstName: this.props.currentUserProfile.first_name,
      lastName: this.props.currentUserProfile.last_name,
      score: this.props.currentUserProfile.ravel_points,
      photoURL: this.props.currentUserProfile.photoURL,
      bio: this.props.currentUserProfile.bio,
      bioEdit: this.props.currentUserProfile.bio,
      ravelsLed: this.props.currentUserProfile.stat_ravel_led,
      ravelsContributedTo: this.props.currentUserProfile.stat_ravel_contributed,
      passagesWritten: this.props.currentUserProfile.stat_passage_written,
      upvotesReceived: this.props.currentUserProfile.upvotes,
      ...this.props.screenData,
    };
  }

  componentWillReceiveProps (newProps) {
    console.log (newProps);
    if (newProps.currentUserProfile) {
      this.setState ({
        bio: newProps.currentUserProfile.bio,
        photoURL: newProps.currentUserProfile.photoURL,
        mode: 'view',
      });
    }
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
      //isOwned,
      user,
      score,
      bio,
      statistics,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <UserImage {...this.props} size={100} />

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
    screenData,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    screenData,
    currentUserProfile,
  };
}

export default connect (mapStateToProps)(Profile);
