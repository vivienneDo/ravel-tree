// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 03/20/18
//
// "Ravel" screen for RavelTree.
//
// TODO: Invitation mode.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
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
import UserImage from '../components/UserImage'
import IconLeaf from '../components/IconLeaf'
import PassageStub from '../components/PassageStub'
import Button from '../components/Button'
import ButtonPlus from '../components/ButtonPlus'
import Tree from '../components/Tree'
import ConceptPopup from '../components/ConceptPopup'
import AddPopup from '../components/AddPopup'
import ForkPopup from '../components/ForkPopup'
import PassagePopup from '../components/PassagePopup'

const TEST_PASSAGE = 'Now this is a story all about how my life got flipped, turned upside down. And I\'d like to take a minute, just sit right there, I\'ll tell you how I became the prince of a town called Bel-Air.\n\nIn West Philadelphia, born and raised, on the playground is where I spent most of my days. Chillin\' out, maxin\', relaxin\' all cool, and all shootin\' some b-ball outside of the school, when a couple of guys who were up to no good started makin\' trouble in my neighborhood. I got in one little fight, and my mom got scared, and said "You\'re movin\' with your auntie and uncle in Bel-Air!"\n\nI begged and pleaded with her day after day, but she packed my suitcase and sent me on my way. She gave me a kiss and then she gave me my ticket. I put my Walkman on and said "I might as well kick it." First class, yo, this is bad. Drinkin\' orange juice out of a champagne glass. Is this what the people of Bel-Air livin\' like? Hmmm, this might be all right.';

// Test data structure in the form of a tree.
const DATA = [
  {passageIndex: '1-A', name: 'The Big Wave', score: 140, passage: TEST_PASSAGE, children: [
    {passageIndex: '2-A', name: 'Rip Current', score: 40, passage: TEST_PASSAGE, children: [
      {passageIndex: '3-A', name: 'Crashing Down', score: 20, passage: TEST_PASSAGE, children: [
        {passageIndex: '4-A', name: 'The Comeback', score: 170, passage: TEST_PASSAGE, children: [
          {passageIndex: '5-A', name: 'Riptide', score: 100, passage: TEST_PASSAGE, children: []},
        ]},
        {passageIndex: '4-B', name: 'A Shore Thing', score: 150, passage: TEST_PASSAGE, children: []},
      ]},
    ]},
    {passageIndex: '2-B', name: 'The Bite', score: -20, passage: TEST_PASSAGE, children: []},
    {passageIndex: '2-C', name: 'Blue Skies', score: 60, passage: TEST_PASSAGE, children: [
      {passageIndex : '3-B', name: 'Random Activities', score: 150, passage: TEST_PASSAGE, children :[
        {passageIndex : '4-C', name: 'The Longshoreman', score: 10, passage: TEST_PASSAGE, children: []},
        {passageIndex : '4-D', name: 'Without a Paddle', score: 20, passage: TEST_PASSAGE, children: []},
      ]},
    ]},
    {passageIndex: '2-D', name: 'Under the Sea', score: 20, passage: TEST_PASSAGE, children: []},
  ]},
  {passageIndex: '1-B', name: 'Didn\'t See It Coming', score: 30, passage: TEST_PASSAGE, children: [
    {passageIndex: '2-E', name: 'The Ultimate Adventure', score: 10, passage: TEST_PASSAGE, children: []},
  ]},
  {passageIndex: '1-C', name: 'The First Test', score: 100, passage: TEST_PASSAGE, children: []},
];

const TEST_RAVEL = {
  title: 'Cassius in Rome',
  author: 'Rebecca Bates',
  participants: ['Adam Jesper', 'Brad Hooper', 'Anne Jensen',],
  concept: 'Now this is a story all about how my life got flipped, turned upside down. And I\'d like to take a minute, just sit right there, I\'ll tell you how I became the prince of a town called Bel-Air. In West Philadelphia, born and raised, on the playground is where I spent most of my days. Chillin\' out, maxin\', relaxin\' all cool, and all shootin\' some b-ball outside of the school, when a couple of guys who were up to no good started makin\' trouble in my neighborhood. I got in one little fight, and my mom got scared, and said "You\'re movin\' with your auntie and uncle in Bel-Air!" I begged and pleaded with her day after day, but she packed my suitcase and sent me on my way. She gave me a kiss and then she gave me my ticket. I put my Walkman on and said "I might as well kick it." First class, yo, this is bad. Drinkin\' orange juice out of a champagne glass. Is this what the people of Bel-Air livin\' like? Hmmm, this might be all right.',
  score: 318,
  mode: 'owned',
  roots: DATA,
}

const TEST_PASSAGE_METADATA = {
  ravel_title:   TEST_RAVEL.title,
  passage_index: TEST_RAVEL.roots [0].passageIndex,
  passage_title: TEST_RAVEL.roots [0].name,
  passage_body:  TEST_RAVEL.roots [0].passage,
}

TREE_HORIZONTAL_PADDING = 20;

var nodeCounts = [];

class Ravel extends Component {
  constructor (props) {
    super (props);
    var screenData = this.props.screenData;
    this.state = {
      //ravel: screenData.ravel_uid || TEST_RAVEL || [],
      tree: TEST_RAVEL || [],
      ravelID: screenData.ravel_uid || '',
      title: screenData.ravel_title || TEST_RAVEL.title || '',
      author: screenData.user_created || '',
      participants: screenData.m_ravel_participants || TEST_RAVEL.participants || [],
      score: screenData.ravel_points || TEST_RAVEL.score || '',
      concept: screenData.ravel_concept || TEST_RAVEL.concept || '',
      mode: firebase.auth ().currentUser == screenData.user_created ? 'owned' : '',
      showModal: screenData.showModal || '',
      passageIndex: screenData.passageIndex || '',
      passageMetaData: TEST_PASSAGE_METADATA || '',
    };
  }

  showModal (modalToShow) {
    var Popup;
    switch (modalToShow) {
      case 'concept':
        Popup = ConceptPopup;
        break;
      case 'add':
        Popup = AddPopup;
        break;
      case 'fork':
        Popup = ForkPopup;
        break;
      case 'passage':
        Popup = PassagePopup;
        break;
      default:
        return;
    }

    return (
      <View style={styles.modal}>
        <Popup
          onPressClose={() => this.setState ({ showModal: '' })}
          onSwitchToPassage={(passageMetaData) => this.onSwitchToPassage (passageMetaData)}
          onSwitchToAdd={(passageMetaData) => this.onSwitchToAdd (passageMetaData)}
          onNavigate={(screen, screenData) => this.onNavigate (screen, screenData)}
          {...this.props}
          {...this.state}
        />
      </View>
    );
  }

  onSwitchToPassage (passageMetaData) {
    this.setState ({
      passageMetaData: passageMetaData,
      showModal: 'passage',
    });
  }

  onSwitchToAdd (passageMetaData) {
    this.setState ({
      passageMetaData: passageMetaData,
      nodeCounts: nodeCounts,
      showModal: 'add',
    });
  }

  onNavigate (screen, screenData) {
    console.log ('Trying to navigate...');
    // TODO: What do we need to navigate back properly? var screenData = ...
    this.props.navigateForward ('Merge', screenData);
  }

  onUpdateNodeCounts (newNodeCounts) {
    // We can't use state for this because it would trigger a render race.
    // Just going to use a global variable instead. Don't judge me.
    nodeCounts = newNodeCounts;
  }

  showUsers () {
    return (
      <View style={styles.users}>
        <View style={styles.user}>
          <UserImage {...this.props} size={40} />
        </View>
        {this.state.participants.map ((user) =>
          <View key={user} style={styles.user}>
            <UserImage {...this.props} size={30} />
          </View>
        )}
      </View>
    );
  }

  showAdminLinks (show) {
    if (!show) {return}
    return (
      <View style={styles.links2}>
        <TextLink size={14}>Edit Tags</TextLink>
        <TextLink size={14}>Invite Participants</TextLink>
      </View>
    )
  }

  showButton (show) {
    if (!show) {return}
    return (
      <View style={styles.button}>
        <Button
          title={'Accept Invitation'}
          onPress={() => this.onPressAcceptInvitation ()}
        />
        <Button
          title={'Decline Invitation'}
          onPress={() => this.onPressDeclineInvitation ()}
        />
      </View>
    )
  }

  showPlus (show) {
    if (!show) {return}
    return (
      <ButtonPlus size={26} />
    );
  }


  showTree () {
    return (
      <Tree
        tree={this.state.tree}
        mode={this.state.mode}
        onUpdateNodeCounts={(nodeCounts) => this.onUpdateNodeCounts (nodeCounts)}
        onAnalyzeTree={(tree) => this.setState ({ tree: tree })}
        onPressPassage={(passageMetaData) => this.onSwitchToPassage (passageMetaData)}
        horizontalPadding={TREE_HORIZONTAL_PADDING}
      />
    );
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  onPressAcceptInvitation () {
    // TODO
  }

  onPressDeclineInvitation () {
    // TODO
  }

  onPressConcept () {
    this.setState ({ showModal: 'concept' });
  }

  onPressShare () {
    // TODO
  }

  render (){
    const {
      title,
      author,
      participants,
      score,
      mode,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
      {this.showModal (this.state.showModal)}
        <LinkBack onPress={() => this.onPressBack ()} />
        <View style={styles.head}>
          <Divider />
          <View style={styles.title}>
            <TextSerif size={30}>{this.state.title}</TextSerif>
          </View>
          <View style={styles.by}>
            <TextHeader size={12} color={'#6A6A6A'}>By</TextHeader>
          </View>
          {this.showUsers ()}
          <View style={styles.score}>
            <IconLeaf size={37} />
            <View style={styles.scoreText}>
              <TextSerif size={28}>{this.state.score}</TextSerif>
            </View>
          </View>
          <View style={styles.links1}>
            <TextLink size={14} onPress={() => this.onPressConcept ()}>Concept</TextLink>
            <TextLink size={14} onPress={() => this.onPressShare ()}>Share...</TextLink>
          </View>
          <Divider />
          {this.showAdminLinks (mode == 'owned')}
          {this.showButton (mode == 'invitation')}
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {this.showTree ()}
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
  },
  modal: {
    position: 'absolute',
    zIndex: 10,
    top: 25,
    width: '100%',
    height: '100%',
  },
  divider : {
    width: '100%',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    paddingBottom: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 7,
  },
  by: {
    marginBottom: 9,
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 13,
  },
  user: {
    marginHorizontal: 6,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    paddingLeft: 2,
    paddingBottom: 15,
  },
  links1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  links2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button :{
    marginTop: 20,
  },
  scroll: {
    // width: '100%',
    // height: '100%',
    minWidth: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
  },
  tree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passageStub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
    screenData,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  return {
    activeScreen,
    previousScreens,
    screenData,
    currentUserProfile
  };
}

export default connect (mapStateToProps)(Ravel);
