// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/13/18
// Modified: 03/13/18
//
// Test screen for ravel-related graphics for RavelTree.

import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  ART,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import LinkBack from '../components/LinkBack'
import Divider from '../components/Divider'
import TextHeader from '../components/TextHeader'
import TextSans from '../components/TextSans'
import TextSerif from '../components/TextSerif'
import TextLink from '../components/TextLink'
import IconLeaf from '../components/IconLeaf'
import PassageStub from '../components/PassageStub'
import Button from '../components/Button'
import ButtonPlus from '../components/ButtonPlus'

import Tree from '../components/Tree'

const {
  Surface,
  Group,
  Shape,
  Path,
} = ART;

// Test data structure in the form of a tree.
const DATA = [
  {passageIndex: '1-A', name: 'The Big Wave', score: 140, optimal: true, children: [
    {passageIndex: '2-A', name: 'Rip Current', score: 40, optimal: true, children: [
      {passageIndex: '3-A', name: 'Crashing Down', score: 20, optimal: true, children: [
        {passageIndex: '4-A', name: 'The Comeback', score: 170, optimal: true, children: [
          {passageIndex: '5-A', name: 'Riptide', score: 100, optimal: true, children: []},
        ]},
        {passageIndex: '4-B', name: 'A Shore Thing', score: 150, children: []},
      ]},
    ]},
    {passageIndex: '2-B', name: 'The Bite', score: -20, children: []},
    {passageIndex: '2-C', name: 'Blue Skies', score: 60, children: [
      {passageIndex : '3-B', name: 'Random Activities', score: 150, children :[
        {passageIndex : '4-C', name: 'The Longshoreman', score: 10, children: []},
        {passageIndex : '4-D', name: 'Without a Paddle', score: 20, children: []},
      ]},
    ]},
    {passageIndex: '2-D', name: 'Under the Sea', score: 20, children: []},
  ]},
  {passageIndex: '1-B', name: 'Didn\'t See It Coming', score: 30, children: [
    {passageIndex: '2-E', name: 'The Ultimate Adventure', score: 10, children: []},
  ]},
  {passageIndex: '1-C', name: 'The First Test', score: 100, children: []},
];

class GraphicsTest extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ...this.props,
    };
  }

  render (){

    const wrapNode = (WrappedComponent) => {
      class Wrapper extends PureComponent {
        render () {
          return (
            <WrappedComponent {...this.props} />
          );
        }
      }
    }
    const Node = wrapNode (PassageStub);

    return (
      <View style={styles.layout}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Tree
            root={DATA}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scroll: {
    minWidth: '100%',
    height: '100%',
  },
  scrollContent: {
    height: '100%',
    justifyContent: 'center',
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

export default connect (mapStateToProps)(GraphicsTest);
