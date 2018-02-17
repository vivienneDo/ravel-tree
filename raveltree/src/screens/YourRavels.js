// Author: Frank Fusco (fr@nkfus.co)
// Created: 02/17/18
// Modified: 02/17/18
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

import RTLogoText from '../components/RTLogoText'
import TextHeader from '../components/TextHeader'
import RavelStub from '../components/RavelStub'
import Button from '../components/Button'
import ButtonReverse from '../components/ButtonReverse'

export default class YourRavels extends Component {
  constructor (props) {
    super (props);
  }

  getRavels () {
    return (
      <View>
        {this.props.ravels.map ((ravel) =>
          <View style={styles.ravel}>
            <RavelStub
               ravel={ravel.ravel}
               users={ravel.users}
               score={ravel.score}
            />
          </View>
        )}
      </View>
    )
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
        <View style={styles.header}>
          <TextHeader>Your Ravels</TextHeader>
        </View>
        <View style={styles.ravels}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {this.getRavels ()}
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button title={'Start a Ravel'} />
              </View>
              <View style={styles.button}>
                <ButtonReverse title={'Explore'} />
              </View>
            </View>
          </ScrollView>
        </View>
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
    marginBottom: 20,
  },
  ravels: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    //height: '100%',
  },
  scroll: {
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
});
