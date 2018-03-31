// Author:   Alex Aguirre
// Created:  02/07/18
// Modified: 03/13/18 by Frank Fusco (fr@nkfus.co)
//
// Home screen for RavelTree.
//
// Pass in an array of passages as a prop like so:
//
// <Home
//    user={'Rebecca Bates'}
//    passages={[
//      {ravel: 'Endless Smirk', passageIndex: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageIndex: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageIndex: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//      {ravel: 'Endless Smirk', passageIndex: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I'm going to need if I'm going to fill up more space to ensure that this gets truncated after a certain number of lines', upvotes: 11, downvotes: 0},
//    ]}
// />
//
// TODO: "Newsfeed" algorithm, Firebase retrieval
// TODO: Search functionality

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import * as actions from '../actions';
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
import Loader from '../components/Loader';

const TEST_USER = 'Rebecca Bates';
const TEST_PASSAGES =[
  {ravel: 'Endless Smirk', passageIndex: '67-A', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageIndex: '67-B', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageIndex: '67-C', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
  {ravel: 'Endless Smirk', passageIndex: '67-D', title: 'The Visitor', passage: 'A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and here is some more text that I think I\'m going to need if I\'m going to fill up more space to ensure that this gets truncated after a certain number of lines.', upvotes: 11, downvotes: 0},
];

const PASSAGE_LOAD_COUNT = 10;

class Home extends Component<{}> {
  constructor (props: any, context: any) {
    super (props, context);
    this.state = {
      gotPassageIDs: false,
      //gotPassages: false,
      passages: [],
    }
    this.props.setShowNavBar (true);
    this.getPassages ();
  }

  componentWillReceiveProps (newProps) {
    var ravels = newProps.all_ravel;

    if (!this.state.gotPassageIDs && _.size (ravels) > 0) {
      var passageIds = [];
      Object.values (ravels).map (ravel => {
        if (_.size (ravel.roots || {}) > 0) {
          Object.keys (ravel.roots).map (passageID =>
            passageIds.push ({
              ravelID: ravel.ravel_uid,
              passageID: passageID,
            })
          );
        }
      });
      this.setState ({ gotPassageIDs: true });
      passageIds.map (passage =>
        // For now, just get all of them. Will have to restrict size or pick at
        // random soon. Eventually, this will be an actual algorithm.
        this.props.getPassageMetaData (passage.passageID, passage.ravelID)
      );
    }

    var passage = newProps.passage_meta_data;

    if (passage && _.size (passage) > 0) {
      var passages = this.state.passages;
      passages.push (passage);
      this.setState ({ passages: passages });
    }

    if (newProps.userProfile) {
      console.log (nextProps.userProfile);
    }
  }

  onPressExplore () {
    this.props.navigateForward ('Explore', this.constructor.name);
  }

  onPressStartARavel () {
    this.props.navigateForward ('StartARavel', this.constructor.name);
  }

  onChangeText (text) {
    // TODO: Search
  }

  getPassages () {
    // TODO: "Newsfeed" algorithm, Firebase retrieval.
    // For now, our newsfeed algorithm just gets all the passages.
    // TODO: Select a subset at random and get more on scroll end.
    this.props.loadAllRavel ();
  }

  renderPassages () {
    if (_.size (this.state.passages) == 0) {
      // Alternative message:
      // No passages to display right now. You can search for ravels using
      // Explore—or start your own ravel!
      return (
        <View style={styles.passages}>
          <Text>Loading newsfeed...</Text>
          <View style={styles.loader}><Loader /></View>
        </View>
      );
    }

    var passages = this.state.passages;

    return (
      <View style={styles.passages}>
        {passages.map ((passage) =>
          <View key={passage.ravel_uid + '_' + passage.passage_uid} style={styles.passageCard}>
            <PassageCard
              ravelID={passage.ravel_uid}
              passageID={passage.passage_uid}
              ravel={passage.ravel_title}
              passageIndex={passage.passage_index}
              title={passage.passage_title}
              passage={passage.passage_body}
              upvotes={passage.passage_upvote}
              downvotes={passage.passage_downvote}
              testID={passage.testID}
              parentScreen={this.constructor.name}
              {...this.props}
            />
          </View>
        )}
      </View>
    );
  }


  render() {
    const {
      passages,
      testID,
      currentUserProfile
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

        <Divider />

        {/* User image, profile name, search for a concept, and new ravels */}
        <View style={styles.searchBox}>
          <View style={styles.user}>
            <View style={styles.userImage}>
              <UserImage {...this.props} size={20} />
            </View>
            <TextSerif size={12}>
              {currentUserProfile.first_name + ' ' + currentUserProfile.last_name}
            </TextSerif>
          </View>
          <View style={styles.input}>
            <InputSearch
              placeholder={'Type a concept. "In a world..."'}
              onChangeText={(text) => this.onChangeText (text)}
            />
          </View>
        </View>

        {/*<Divider />*/}

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

          {/* Show the new and latest ravels for the user */}
          <View style = {styles.textHeader}>
            <TextHeader>New for You</TextHeader>
          </View>

          {this.renderPassages ()}

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
    display: 'none', // TODO: 'Would like to have' search function here...
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
  loader: {
    marginTop: 20,
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

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    showNavBar,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    all_ravel,
  } = state.master_ravel;

  const {
    passage_meta_data,
  } = state.passage

  return {
    activeScreen,
    previousScreens,
    showNavBar,
    currentUserProfile,
    all_ravel,
    passage_meta_data,
  };
}

export default connect (mapStateToProps)(Home);
