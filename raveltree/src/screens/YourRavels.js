// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 04/03/18
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
import Loader from '../components/Loader'

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
      userCreatedRavels:   {},
      ravelsIn:            {},
      ravelsInvited:       {},
      stubs: {
        userCreatedRavels: {},
        ravelsIn:          {},
        ravelsInvited:     {},
      },
      loading: {
        userCreatedRavels: true,
        ravelsIn:          true,
        ravelsInvited:     true,
      },
    };

    this.props.loadInitialCurrentUserCreatedRavel ()
    .then (ravels => {
      var loading = this.state.loading;
      loading.userCreatedRavels = false;
      this.setState ({
        userCreatedRavels: ravels,
        loading: loading,
      });
    })
    .catch (error => { console.error (error) });

    this.props.loadNonCreatedCurrentUserRavel ()
    .then (ravels => {
      var loading = this.state.loading;
      loading.ravelsIn = false;
      this.setState ({
        ravelsIn: ravels,
        loading: loading,
      });
    })
    .catch (error => { console.error (error) });

    this.props.getPendingRavelInvite ()
    .then (ravels => {
      var loading = this.state.loading;
      loading.ravelsInvited = false;
      this.setState ({
        ravelsInvited: ravels,
        loading: loading,
      });
    })
    .catch (error => { console.error (error) });
  }

  // getMetaData (ravels) {
  //   Object.keys (ravels).map (ravel =>
  //     this.props.getRavelMetaData (ravel)
  //   );
  // }

  renderRavelStub (ravel, userID = undefined) {
    ravel.user_created = userID;
    return (
      <View key={ravel.ravel_uid} style={styles.ravel}>
        <RavelStub
          ravel={ravel}
          parentScreen={'YourRavels'}
          {...this.props}
        />
      </View>
    );
  }

  showLoader () {
    return (
      <View style={styles.loader}>
        <Loader />
      </View>
    );
  }

  getRavels () {
    if (this.state.loading.userCreatedRavels) {
      return (this.showLoader ());
    }

    if (_.size (this.state.userCreatedRavels) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t started any ravels yet.</TextSans>
        </View>
      );
    }

    return (
      Object.values (this.state.userCreatedRavels).map (ravel => {
        if (!ravel.ravel_uid) { return; }
        return this.renderRavelStub (ravel, this.props.getCurrentLoggedInUserUid ());
      })
    );
  }

  getRavelsIn () {
    if (this.state.loading.ravelsIn) {
      return (this.showLoader ());
    }

    if (_.size (this.state.ravelsIn) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You&#39;re not participating in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }

    return (
      Object.values (this.state.ravelsIn).map (ravel => {
        return this.renderRavelStub (ravel, ravel.user_created);
      })
    );
  }

  getRavelsInvited () {
    if (this.state.loading.ravelsInvited) {
      return (this.showLoader ());
    }

    if (_.size (this.state.ravelsInvited) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t been invited to participate in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }

    return (
      Object.values (this.state.ravelsInvited).map (ravel => {
        return this.renderRavelStub (ravel, ravel.user_created);
      })
    );
  }

  onPressStartARavel () {
    this.props.navigateForward ('StartARavel', 'YourRavels');
  }

  onPressExplore () {
    this.props.navigateForward ('Explore', 'YourRavels');
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
  loader: {
    marginBottom: 26,
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

  const {
    ravel_meta_data,
  } = state.ravel;

  return {
    all_user_created_ravels,
    all_non_created_user_ravel,
    get_pending_invite_ravel,
    ravel_meta_data,
  };
}

export default connect (mapStateToProps)(YourRavels);
