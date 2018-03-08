// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/23/18
// Modified: 03/08/18
//
// "Invite Participants" screen for RavelTree.
//
// Pass in a "participants" prop like so:
//
// <InviteParticipants
//    participants={[
//      {name: 'Adam Jesper', score: 9821},
//      {name: 'Brad Hooper', score: 3219},
//      {name: 'Anne Jensen', score: undefined},
//    ]}
//
// - 'mode' prop denotes whether this is part of the ravel creation process or
//   later editing.


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

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


class InviteParticipants extends Component {
  constructor (props) {
    super (props);
    this.state = {
      participants: this.props.participants,
    };
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
      <View style={styles.participant}>
        <View style={styles.participantLeft}>
          <View style={styles.userImage}>
            <UserImage size={26} />
          </View>
          <View style={styles.userName}>
            <TextSans size={14}>{user.name}</TextSans>
          </View>
          <View style={[styles.iconLeaf, {display: user.score ? 'flex' : 'none'}]}>
            <IconLeaf size={21} />
          </View>
          <View style={[styles.userScore, {display: user.score ? 'flex' : 'none'}]}>
            <TextSerif size={17}>{user.score}</TextSerif>
          </View>
        </View>
        <TextLink size={14} onPress={() => {this.onRemoveUser (user)}}>
          Remove
        </TextLink>
      </View>
    );
  }


  render (){
    const {
      mode,
      participants,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack />
        <View style={styles.head}>
          <View style={styles.headText}>
            <TextHeader>Invite Participants</TextHeader>
          </View>
          <View style={styles.options}>
            <View style={styles.option}>
              <View style={styles.buttonPlus}>
                <ButtonPlus size={21} />
              </View>
              <TextLink size={21}>By Name</TextLink>
            </View>
            <View style={styles.option}>
              <View style={styles.buttonPlus}>
                <ButtonPlus size={21} />
              </View>
              <TextLink size={21}>By Link</TextLink>
            </View>
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
          <TextLink>{this.state.participants.length == 0 ? 'Skip for now' : ''}</TextLink>
          <Button
            title={mode =='add' ? 'Start Ravel' : 'Save Changes'}
            disabled={this.state.participants.length == 0}
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
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
  };
}

export default connect (mapStateToProps)(InviteParticipants);
