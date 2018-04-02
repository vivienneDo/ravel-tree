// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 03/27/18
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
      retrieved: {
        userCreatedRavels: false,
        ravelsIn:          false,
        ravelsInvited:     false,
      },
    };

    this.props.loadInitialCurrentUserCreatedRavel ();
  }

  componentWillReceiveProps (newProps) {
    var retrieved = this.state.retrieved;
    var stubs = this.state.stubs;
    var loading = this.state.loading;
    var metaData = newProps.ravel_meta_data;

    console.log (newProps);

    // User-Created Ravels
    if (!retrieved.userCreatedRavels) {
      console.log ('User created ravels not yet retrieved.')
      if (newProps.all_user_created_ravels) {
        console.log ("User created ravels retrieved.")
        retrieved.userCreatedRavels = true;
        this.setState ({
          userCreatedRavels: newProps.all_user_created_ravels,
          retrieved: retrieved,
        });
        if (_.size (newProps.all_user_created_ravels) > 0) { // Compare this to the size we expect...
          console.log ('Getting user-created ravel metadata...');
          this.getMetaData (newProps.all_user_created_ravels);
        } else {
          loading.userCreatedRavels = false;
          this.setState ({ loading: loading });
          this.props.loadNonCreatedCurrentUserRavel ();
        }
        return;
      }
    }

    // User-Created Ravel Metadata
    if (loading.userCreatedRavels) {
      if ((newProps.ravel_meta_data || []).length != 0) {
        console.log ('Metadata retrieved.');
        stubs.userCreatedRavels [metaData.ravel_uid] = this.renderRavelStub (metaData);
        this.setState ({ stubs: stubs });
        if (_.size (stubs.userCreatedRavels) == _.size (this.state.userCreatedRavels)) {
          loading.userCreatedRavels = false;
          this.setState ({ loading: loading });
          this.props.loadNonCreatedCurrentUserRavel ();
        }
        return;
      }
    }

    // Ravels In
    if (!retrieved.ravelsIn) {
      if (newProps.all_non_created_user_ravel) {
        retrieved.ravelsIn = true;
        this.setState ({
          ravelsIn: newProps.all_non_created_user_ravel,
          retrieved: retrieved,
        });
        if (_.size (newProps.all_non_created_user_ravel) > 0) {
          this.getMetaData (newProps.all_non_created_user_ravel);
        } else {
          loading.ravelsIn = false;
          this.setState ({ loading: loading });
          this.props.getPendingRavelInvite ();
        }
      }
    }

    // Ravels In Metadata
    if (loading.ravelsIn) {
      if ((newProps.ravel_meta_data || []).length != 0) {
        stubs.ravelsIn [metaData.ravel_uid] = this.renderRavelStub (metaData);
        this.setState ({ stubs: stubs });
        if (_.size (stubs.ravelsIn) == _.size (this.state.ravelsIn)) {
          loading.ravelsIn = false;
          this.setState ({ loading: loading });
          this.props.getPendingRavelInvite ();
        }
        return;
      }
    }

    // Ravels Invited
    if (!retrieved.ravelsInvited) {
      if (newProps.get_pending_invite_ravel) {
        retrieved.ravelsInvited = true;
        this.setState ({
          ravelsInvited: newProps.get_pending_invite_ravel,
          retrieved: retrieved,
        });
        if (_.size (newProps.get_pending_invite_ravel) > 0) {
          this.getMetaData (newProps.get_pending_invite_ravel);
        } else {
          loading.ravelsInvited = false;
          this.setState ({ loading: loading });
        }
      }
    }

    // Ravels Invited Metadata
    if (loading.ravelsInvited) {
      stubs.ravelsInvited [metaData.ravel_uid] = this.renderRavelStub (metaData);
      this.setState ({ stubs: stubs });
      if (_.size (stubs.ravelsInvited) == _.size (this.state.ravelsInvited)) {
        loading.ravelsInvited = false;
        this.setState ({ loading: loading });
      }
      return;
    }
  }

  getMetaData (ravels) {
    Object.keys (ravels).map (ravel =>
      this.props.getRavelMetaData (ravel)
    );
  }

  renderRavelStub (ravel) {
    return (
      <View key={ravel.ravel_uid} style={styles.ravel}>
        <RavelStub
          ravel={ravel}
          parentScreen={this.constructor.name}
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

    var userCreatedRavels = Object.values (this.state.userCreatedRavels);

    if (_.size (userCreatedRavels) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t started any ravels yet.</TextSans>
        </View>
      );
    }
    return (Object.values (this.state.stubs.userCreatedRavels));
  }

  getRavelsIn () {
    if (this.state.loading.ravelsIn) {
      return (this.showLoader ());
    }

    var ravelsIn = Object.values (this.state.ravelsIn);

    if (_.size (ravelsIn) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You&#39;re not participating in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }
    return (Object.values (this.state.stubs.ravelsIn));
  }

  getRavelsInvited () {
    if (this.state.loading.ravelsInvited) {
      return (this.showLoader ());
    }

    var ravelsInvited = Object.values (this.state.ravelsInvited);

    if (_.size (ravelsInvited) == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t been invited to participate in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }
    return (Object.values (this.state.stubs.ravelsInvited));
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
