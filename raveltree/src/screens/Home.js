// Author: Alex Aguirre
// Created: 02/07/18
// Modified: 03/06/18 by Frank Fusco (fr@nkfus.co)
//
// Home screen for RavelTree.
//
// Pass in an array of passages as a prop like so:
//
// <Home
//    user={'Rebecca Bates'}
//    passages={[
//      {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//    ]}
// />

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText';
import ButtonReverse from '../components/ButtonReverse';
import Button from '../components/Button';
import Divider from '../components/Divider';
import UserImage from '../components/UserImage';
import InputSearch from '../components/InputSearch';
import TextSerif from '../components/TextSerif';
import TextHeader from '../components/TextHeader';
import PassageCard from '../components/PassageCard';

const TEST_USER = 'Rebecca Bates';
const TEST_PASSAGES =[
  {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageID: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
];


class Home extends Component<{}> {
  constructor (props: any, context: any) {
    super (props, context);
    this.props.setShowNavBar (true);
  }

  onPressExplore () {

  }

  onPressStartARavel () {

  }

  onChangeText (text) {
    // TODO: Search
  }

  getPassages () {
    return (
      <View style={styles.passages}>
        {TEST_PASSAGES.map ((passage) =>
          <View style={styles.passageCard}>
            <PassageCard
              ravel={passage.ravel}
              passageID={passage.passageID}
              title={passage.title}
              passage={passage.passage}
              upvotes={passage.upvotes}
              downvotes={passage.downvotes}
              testID={passage.testID}
            />
          </View>
        )}
      </View>
    );
  }


  render() {
    const {
      user,
      passages,
      testID,
    } = this.props;
    return (
      <View style={styles.layout}>

        {/* RavelTree logo at the top in the center */}
        <View style = {styles.logo}>
          <RTLogoText/>
        </View>

        {/* Explore and Start a Ravel Buttons */}
        <View style = {styles.buttons}>
          <ButtonReverse
            title={'Explore'}
            onPress={() => this.onPressExplore ()}
          />
          <Button
            title={'Start a Ravel'}
            onPress={() => this.onPressStartARavel ()}
          />
        </View>

        <Divider/>

        {/* User image, profile name, search for a concept, and new ravels */}
        <View style={styles.searchBox}>
          <View style={styles.user}>
            <View style={styles.userImage}>
              <UserImage size={20} />
            </View>
            <TextSerif size={12}>{user}</TextSerif>
          </View>
          <View style={styles.input}>
            <InputSearch
              placeholder={'Type a concept. "In a world..."'}
              onChangeText={(text) => this.onChangeText (text)}
            />
          </View>
        </View>

        <Divider/>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

          {/* Show the new and latest ravels for the user */}
          <View style = {styles.textHeader}>
            <TextHeader>New for You</TextHeader>
          </View>

          {this.getPassages ()}

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  searchBox: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 6,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  userImage: {
    marginRight: 5,
  },
  input: {
    width: '100%',
  },
  scroll: {
    width: '100%',
    //height: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 13,
  },
  textHeader: {
    marginBottom: 14,
  },
  passages: {
    justifyContent: 'center',
    width: '100%',
  },
  passageCard: {
    width: '100%',
    marginBottom: 20,
  },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
    showNavBar: state.showNavBar,
  };
}

export default connect (mapStateToProps)(Home);
