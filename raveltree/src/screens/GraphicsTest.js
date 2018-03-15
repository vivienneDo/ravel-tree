// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/13/18
// Modified: 03/13/18
//
// Test screen for ravel-related graphics for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
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
//import PassageStub from '../components/PassageStub'
import Button from '../components/Button'
import ButtonPlus from '../components/ButtonPlus'

import Tree from '../components/Tree'

// Test data structure in the form of a tree.
const DATA = [
  {"name" : "1", "children" : [
    {"name" : "1-1" },
    {"name" : "1-2" },
    {"name" : "1-3", "children": [
      {"name" : "1-3-1", "children" :[
        {"name" : "1-3-1-1" },
        {"name" : "1-3-1-2" },
      ]},
    ]},
    {"name" : "1-4", "children": []},
  ]},
  {"name" : "2", "children" : []},
  {"name" : "3", "children" : []},
];

class GraphicsTest extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ...this.props,
    };
  }

  render (){
    return (
      <View style={styles.layout}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Tree root={DATA} />
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
