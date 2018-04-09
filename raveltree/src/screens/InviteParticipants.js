// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/23/18
// Modified: 04/09/18
//
// "Invite Participants" screen for RavelTree.
//
// - 'mode' prop denotes whether this is part of the ravel creation process or
//   later editing.
//
// TODO: onPressByLink (): Invite by link functionality (Would like to have)

import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  View, ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';
import { connect } from 'react-redux'
import _ from 'lodash';

import LinkBack from '../components/LinkBack'
import Divider from '../components/Divider'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import Button from '../components/Button'
import ButtonPlus from '../components/ButtonPlus'
import UserImage from '../components/UserImage'
import IconLeaf from '../components/IconLeaf'
import InputText from '../components/InputText'
import ModalContainer from '../components/ModalContainer'

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
var {height, width} = Dimensions.get ('window');

class InviteParticipants extends Component {
  constructor (props) {
    super (props);
    this.state = {
      participants: [],
      mode: this.props.mode,
      showModal: '',
      searchedName: '',
      userResults: {},
      userToAdd: {},
      oldUserResults: this.props.users_first_name_search,
      oldRavelMetaData: this.props.ravel_meta_data,
      readyToNavigate: false,
      ...this.props.screenData,
    };
  }

  componentWillReceiveProps (nextProps) {
    // Update the username search results.
    var userResults = nextProps.users_first_name_search;
    if (userResults && userResults != this.state.oldUserResults) {
      this.setState ({ userResults: userResults });
    }

    // When the created ravel's metadata is received, go to its Ravel screen.
    if (nextProps.ravel_meta_data && nextProps.ravel_meta_data != this.state.oldRavelMetaData) {
      const ravelMetaData = nextProps.ravel_meta_data;

      // "Accept the invite" for ourselves, the initial user...
      //this.props.acceptRavelInvite (ravelMetaData.ravel_uid);

      var screenData = Object.assign ({},
        ravelMetaData,
        {
          showModal: 'add',
          passageIndex: '1-A',
        }
      );
      if (this.state.readyToNavigate) {
        this.props.setActiveScreen ('Ravel', screenData);
      }
    }
  }

  showModal (modalToShow) {
    if (modalToShow == 'name') {
      return (
        <View style={styles.modal}>
          <ModalContainer
            name="NamePopup"
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#000000'
            }}
            onPressClose={() => this.setState ({ showModal: '' })}
          >
            <View style={styles.modalContainer}>
              <View style={styles.head}>
                <View style={styles.modalRow1}>
                  <TextHeader>Invite by Name</TextHeader>
                </View>
                <View style={styles.modalRow2}>
                  <InputText width={'100%'} placeholder={'Type a user\'s name (e.g., "Charles Dickens").'} onChangeText={(text) => this.onChangeName (text)} />
                </View>
              </View>
              <ScrollView style={styles.userResults}>
                {this.showUserResults ()}
              </ScrollView>
              {/*<View style={styles.modalFoot}>
                <View style={styles.modalFootText}>
                  <TextSans size={12} color={'#808080'}>These ravelers will be able to create new passages, comment on passages, and upvote passages in your ravel.</TextSans>
                </View>
                <Button title={'Add'} width={0.30 * width} disabled={!this.state.usersToAdd} />
              </View>*/}
            </View>
          </ModalContainer>
        </View>
      );
    }
  }

  showUserResults () {
    var userResultsToShow = [];
    var results = Object.values (this.state.userResults);
    results.map (userResult => {
      var user = userResult.userProfile;

      // If the result is a user we've already added to the list or the current
      // user, don't show it here. Also omit blank results.
      var show = true;
      var currentUid = firebase.auth().currentUser.uid;
      if (user.user_uid == currentUid) { show = false; }
      if (user.first_name == '') { show = false; }
      this.state.participants.map (participant => {
        if (user.user_uid == participant.user_uid) { show = false; }
      });

      if (show) {
        userResultsToShow.push (
            <View key={user.user_uid} style={styles.participant}>
              <View style={styles.participantLeft}>
                <View style={styles.userImage}>
                  <UserImage profile={user} disabled {...this.props} size={26} />
                </View>
                <View style={styles.userName}>
                  <TextSans size={14}>{user.first_name} {user.last_name}</TextSans>
                </View>
                <View style={[styles.iconLeaf, {display: user.ravel_points ? 'flex' : 'none'}]}>
                  <IconLeaf size={21} />
                </View>
                <View style={[styles.userScore, {display: user.ravel_points ? 'flex' : 'none'}]}>
                  <TextSerif size={17}>{user.ravel_points}</TextSerif>
                </View>
              </View>
              <View>
                <Button title='Add' width={80} onPress={() => this.onPressUserResult (user)} />
              </View>
            </View>
        );
      }
    });

    return (
      <View style={{width: '100%'}}>
        {userResultsToShow}
      </View>
    );
  }

  onPressUserResult (user) {
    var participants = this.state.participants;
    var oldUserResults = this.state.userResults;
    var oldRavelMetaData = this.state.ravelMetaData;
    participants.push (user);
    this.setState ({
      participants: participants,
      searchedName: '',
      userResults: {},
      showModal : '',
      oldUserResults: oldUserResults,
      oldRavelMetaData: oldRavelMetaData,
    });
  }

  onChangeName (text) {
    this.setState ({ searchedName: text });
    this.props.searchUserByName (text);
  }

  onAddUser (user) {
    // When a user is added, add it to the list...
    var participants = this.state.participants;
    participants.push (user);
    this.setState ({participants: participants});
  }

  onRemoveUser (user) {
    // When a user is removed, remove it from the array of participants...
    var participants = this.state.participants;
    participants.splice (participants.indexOf(user), 1);
    this.setState ({participants: participants});
  }

  displayParticipant (user) {
    return (
      <View key={user.user_uid} style={styles.participant}>
        <View style={styles.participantLeft}>
          <View style={styles.userImage}>
            <UserImage profile={user} {...this.props} size={26} />
          </View>
          <View style={styles.userName}>
            <TextSans size={14}>{user.first_name} {user.last_name}</TextSans>
          </View>
          <View style={[styles.iconLeaf, {display: user.ravel_points ? 'flex' : 'none'}]}>
            <IconLeaf size={21} />
          </View>
          <View style={[styles.userScore, {display: user.ravel_points ? 'flex' : 'none'}]}>
            <TextSerif size={17}>{user.ravel_points}</TextSerif>
          </View>
        </View>
        <TextLink size={14} onPress={() => {this.onRemoveUser (user)}}>
          Remove
        </TextLink>
      </View>
    );
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  onPressStartRavel () {
    // Get the array of participants, convert it to an array of userIDs only,
    // and push the current user's ID to it.
    var participants = this.state.participants.map (participant => participant.user_uid);

    this.setState ({ readyToNavigate: true });

    this.props.createStartRavel ({
      ravel_title: this.state.ravelName,
      ravel_category: this.state.category,
      passage_length: this.state.passageLength,
      visibility: this.state.visibility == 'public' ? true : false,
      enable_voting: !this.state.restrictVotingToParticipants,
      enable_comment: this.state.enablePassageComments,
      ravel_concept: this.state.concept,
      m_ravel_participants: participants,
      ravel_tags: this.state.tagsSelected,
    });
  }

  onPressByName () {
    this.setState ({ showModal: 'name' });
  }

  onPressByLink () {
    // TODO: Invite by link functionality.
    //this.setState ({ showModal: 'link' });
  }

  render (){
    const {
      participants,
      testID,
    } = this.props;

    const mode = this.state.mode;

    return (
      <View style={styles.layout}>
        {this.showModal (this.state.showModal)}
        <LinkBack onPress={() => this.onPressBack ()}/>
        <View style={styles.head}>
          <View style={styles.headText}>
            <TextHeader>Invite Participants</TextHeader>
          </View>
          <View style={styles.options}>
            <View style={styles.option}>
              <View style={styles.buttonPlus}>
                <ButtonPlus onPress={() => this.onPressByName ()} size={21} />
              </View>
              <TextLink onPress={() => this.onPressByName ()} size={21}>By Name</TextLink>
            </View>
            {/*<View style={styles.option}>
              <View style={styles.buttonPlus}>
                <ButtonPlus onPress={() => this.onPressByLink ()} size={21} />
              </View>
              <TextLink onPress={() => this.onPressByLink ()} size={21}>By Link</TextLink>
            </View>*/}
          </View>
        </View>
        <Divider />
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.participants}>
            {this.state.participants.map (user => this.displayParticipant (user))}
          </View>
        </ScrollView>
        <Divider />
        <View style={styles.buttons}>
          <TextLink onPress={() => this.onPressStartRavel ()}>{this.state.participants.length == 0 ? 'Skip for now' : ''}</TextLink>
          <Button
            title={mode =='add' ? 'Start Ravel' : 'Save Changes'}
            disabled={this.state.participants.length == 0}
            onPress={() => this.onPressStartRavel ()}
          />
        </View>
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
  },
  modal: {
    position: 'absolute',
    zIndex: 10,
    top: 25,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
  },
  modalRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
  },
  modalRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
  },
  userResults: {
    flex: 1,
    marginTop: 6,
    marginBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
  },
  modalFoot: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 21,
    paddingRight: 21,
    marginBottom: 10,
  },
  modalFootText: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  divider : {
    width: '100%',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  headText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  options: {
    paddingHorizontal: 17,
    paddingTop: 10,
    //paddingBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonPlus: {
    marginRight: 10,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  participants: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    width: '100%',
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  participantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconLeaf: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    screenData,
  } = state.navigation;

  const {
    ravel_meta_data,
  } = state.ravel;

  const {
    users_first_name_search,
  } = state.search;

  return {
    activeScreen,
    previousScreens,
    screenData,
    ravel_meta_data,
    users_first_name_search,
  };
}

export default connect (mapStateToProps)(InviteParticipants);
