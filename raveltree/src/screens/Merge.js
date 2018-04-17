// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/20/18
// Modified: 03/20/18
//
// "Merge" screen for RavelTree.
//
// We get here from the PassagePopup modal. TODO: Check Back functionality.
//
// Receives screenData object as props and splats into local state. Expects:
//  passageMetaData:
//    passageMetaData.ravel_title
//    passageMetaData.passage_index
//    passageMetaData.passage_title
//    passageMetaData.passage_body

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
import TextSans from '../components/TextSans'
import PassageStub from '../components/PassageStub'
import Button from '../components/Button'
import Tree from '../components/Tree'

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
      {passageIndex : '3-B', name: 'Random Activities', score: 150, passage: TEST_PASSAGE, parents: [{passageIndex: '2-C'}], children :[
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

const TREE_HORIZONTAL_PADDING = 20;

var scrollView = undefined;
var scrollParams = undefined;

class Merge extends Component {
  constructor (props) {
    super (props);
    var screenData = this.props.screenData;
    this.state = {
      ravel: screenData.ravel,
      passage: screenData.passage,
      passageIndex: screenData.passage.passage_index,
      showMergeButton: false,
      selectedPassage: undefined,
      //...this.props.screenData,
    };
  }

  onSelectPassage (passageMetaData) {
    // Show the merge button and store the selected passage's metadata.
    this.setState ({
      showMergeButton: true,
      selectedPassage: passageMetaData,
    });

  }

  onPressMerge () {
    // TODO: Backend call.
    var mergeData = {
      ravel_uid: this.state.ravel.ravel_uid,
      parent_passage_uid: this.state.passage.passage_uid,
      child_passage_uid: this.state.selectedPassage.passage_uid,
    };
    var screenData = {
      ravel_uid: this.state.ravel.ravel_uid,
    };
    this.props.mergeTwoPassage (mergeData)
    .then (this.props.setActiveScreen ('Ravel', screenData))
    .catch (error => { console.log (error); });


  }

  setScrollParams (params) {
    scrollParams = params;
  }

  _onScrollViewContentSizeChange = () => {
    scrollView = this._scrollView;
    scrollView.scrollTo (scrollParams);
  }

  showTree () {
    return (
      <Tree
        {...this.props}
        //tree={this.state.tree || TEST_RAVEL}
        ravel={this.state.ravel}
        ravelID={this.state.ravel.ravel_uid}
        mergeFrom={this.state.passageIndex}
        setScrollParams={(scrollParams) => this.setScrollParams (scrollParams)}
        onUpdateNodeCounts={(nodeCounts) => {;}/*this.onUpdateNodeCounts (nodeCounts)*/}
        //onAnalyzeTree={(tree) => this.setState ({ tree: tree })}
        onPressPassage={(passageMetaData) => this.onSelectPassage (passageMetaData)}
        horizontalPadding={TREE_HORIZONTAL_PADDING}
      />
    );
  }

  showMergeButton (show) {
    if (!show) { return; }

    return (
      <View style={styles.mergeButton}>
        <Button title={'Merge'} onPress={() => this.onPressMerge ()}/>
      </View>
    );
  }

  onPressBack () {
    this.props.navigateBack ();
  }

  render (){
    const {
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <LinkBack onPress={() => this.onPressBack ()} />
        <View style={styles.head}>
          <Divider />
          <View style={styles.instruction}>
            <TextSans size={14} color={'#808080'}>Choose a passage to succeed {this.state.passageIndex}.</TextSans>
          </View>
        </View>
        <ScrollView ref={(c) => (this._scrollView = c)} {...this.props} onContentSizeChange={this._onScrollViewContentSizeChange} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {this.showTree ()}
        </ScrollView>
        {this.showMergeButton (this.state.showMergeButton)}
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
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    paddingBottom: 10,
  },
  instruction: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  scroll: {
    minWidth: '100%',
    height: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    //paddingVertical: TREE_HORIZONTAL_PADDING,
    paddingHorizontal: TREE_HORIZONTAL_PADDING,
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
  mergeButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    justifyContent: 'center',
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
    currentUserProfile,
  };
}

export default connect (mapStateToProps)(Merge);
