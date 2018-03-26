// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 03/23/18
//
// "Your Ravels" screen for RavelTree.


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import RavelStub from '../components/RavelStub'
import Button from '../components/Button'
import ButtonReverse from '../components/ButtonReverse'

const TEST_RAVELS = [
  {ravel: 'Shakespeare on Ice', users: 61, score: 324},
  {ravel: 'Where\'s the Beef?', users: 4, score: 14},
  {ravel: 'The Sound of Violins', users: 2, score: 10},
  {ravel: 'Something Special', users: 19, score: 123},
  {ravel: 'Shallow Waters', users: 1, score: 34},
];
const TEST_RAVELS_IN = [];
const TEST_RAVELS_INVITED = [];

class YourRavels extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      userCreatedRavels: {},
      ravelsIn:          {},
      ravelsInvited:     {},
    };

    this.props.loadInitialCurrentUserCreatedRavel ();
    this.props.loadNonCreatedCurrentUserRavel ();
    this.props.getPendingRavelInvite ();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.all_user_created_ravels) {
      this.setState ({ userCreatedRavels: newProps.all_user_created_ravels });
    }
    if (newProps.all_non_created_user_ravel) {
      this.setState ({ ravelsIn: newProps.all_non_created_user_ravel });
    }
    if (newProps.get_pending_invite_ravel) {
      this.setState ({ ravelsInvited: newProps.get_pending_invite_ravel });
    }
  }

  renderRavelStubs (ravels) {
    console.log (ravels);
    return (
      <View>
        {ravels.map ((ravel) =>
          <View key={ravel.ravel_uid} style={styles.ravel}>
            <RavelStub
               ravel={ravel.ravel_title}
               ravelID={ravel.ravel_uid}
               users={ravel.ravel_number_participants + 1}
               score={ravel.ravel_points}
               //author={ravel.user_created} // TODO: Get userID?
               parentScreen={this.constructor.name}
               {...this.props}
            />
          </View>
        )}
      </View>
    );
  }

  getRavels () {
    var userCreatedRavels = Object.values (this.state.userCreatedRavels);

    if (userCreatedRavels.length == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t started any ravels yet.</TextSans>
        </View>
      );
    }
    return (this.renderRavelStubs (userCreatedRavels));
  }

  getRavelsIn () {
    var ravelsIn = Object.values (this.state.ravelsIn);

    if (ravelsIn.length == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You&#39;re not participating in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }
    return (this.renderRavelStubs (ravelsIn));
  }

  getRavelsInvited () {
    var ravelsInvited = Object.values (this.state.ravelsInvited);

    if (ravelsInvited.length == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t been invited to participate in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }
    return (this.renderRavelStubs (ravelsInvited));
  }

  onPressStartARavel () {
    this.props.navigateForward ('StartARavel', this.constructor.name);
  }

  onPressExplore () {
    this.props.navigateForward ('Explore', this.constructor.name);
  }

  render (){
    const {
      ravels,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TextHeader>Your Ravels</TextHeader>
          </View>
          <View style={styles.ravels}>
              {this.getRavels ()}
          </View>
          <View style={styles.header}>
            <TextHeader>Ravels You&#39;re Participating In</TextHeader>
          </View>
          <View style={styles.ravels}>
              {this.getRavelsIn ()}
          </View>
          <View style={styles.header}>
            <TextHeader>Ravel Invitations</TextHeader>
          </View>
          <View style={styles.ravels}>
              {this.getRavelsInvited ()}
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title={'Start a Ravel'} onPress={() => this.onPressStartARavel ()} />
            </View>
            <View style={styles.button}>
              <ButtonReverse title={'Explore'} onPress={() => this.onPressExplore ()} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 17,
  },
  logo: {
    alignSelf: 'center',
  },
  header: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  ravels: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    //height: '100%',
  },
  scroll: {
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    width: '100%',
  },
  ravel: {
    width: '100%',
    paddingBottom: 20,
  },
  buttons: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
});

function mapStateToProps (state) {

  const {
    all_user_created_ravels,
    all_non_created_user_ravel,
    get_pending_invite_ravel,
  } = state.current_user_ravel;

  return {
    all_user_created_ravels,
    all_non_created_user_ravel,
    get_pending_invite_ravel,
  };
}

export default connect (mapStateToProps)(YourRavels);
