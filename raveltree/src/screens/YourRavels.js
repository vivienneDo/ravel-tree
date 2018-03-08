// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/17/18
// Modified: 03/08/18
//
// "Your Ravels" screen for RavelTree.
//
// Pass in a "ravels" array prop like so:
//
// <YourRavels
//    ravels={[
//      {ravel: 'Shakespeare on Ice', users: 61, score: 324},
//      {ravel: 'Where's the Beef?', users: 4, score: 14},
//      {ravel: 'The Sound of Violins', users: 2, score: 10},
//      {ravel: 'Something Special', users: 19, score: 123},
//      {ravel: 'Shallow Waters', users: 1, score: 34},
//    ]}
// />
//
// TODO: Make entire card touchable and link to respective content thread.

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

class YourRavels extends Component {
  constructor (props) {
    super (props);
  }

  getRavels () {
    if (TEST_RAVELS.length == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You haven&#39;t started any ravels yet.</TextSans>
        </View>
      );
    }
    return (
      <View>
        {TEST_RAVELS.map ((ravel) =>
          <View key={ravel.ravel} style={styles.ravel}>
            <RavelStub
               ravel={ravel.ravel}
               users={ravel.users}
               score={ravel.score}
            />
          </View>
        )}
      </View>
    );
  }

  getRavelsIn () {
    if (TEST_RAVELS_IN.length == 0) {
      return (
        <View style={styles.text}>
          <TextSans size={14}>You&#39;re not participating in anyone else&#39;s ravels yet.</TextSans>
        </View>
      );
    }
  }

  onPressStartARavel () {
    this.props.navigateForward ('StartARavel', this.constructor.name);
  }

  onPressExplore () {
    this.props.setActiveScreen ('Explore');
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
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(YourRavels);
