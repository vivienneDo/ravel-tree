// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  03/16/18

// Tree component for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

const NODE_HEIGHT = 20;
const NODE_WIDTH = 100;
const SPACING_VERTICAL = 30;
const SPACING_HORIZONTAL = 40;

TREE_HEIGHT = undefined;
TREE_WIDTH  = undefined;

class Tree extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ...this.props,
    };
  }

  analyzeLevel (data, nodes, level) {
    if (!data) { return nodes; }

    // Get the number of nodes at this level.
    var nodesAtThisLevel = data.length;

    if (!data.length || data.length < 1) { return nodes; }

    // Add the number of nodes at this level at the array index.
    if (!nodes [level]) { nodes [level] = 0; }
    nodes [level] += nodesAtThisLevel;

    // For each child...
    for (var i = 0; i < nodesAtThisLevel; i++) {
      // Analyze the child.
      this.analyzeLevel (data [i].children, nodes, ++level);
      // Now that we're back, decrement level.
      level--;
    }

    // Return the array of node counts.
    return nodes;
  }

  analyzeTree (data) {
    nodes = [];
    nodes = this.analyzeLevel (data, nodes, 0);
    var tree = {
      data:          data,
      nodeCounts:    nodes,
      depth:         nodes.length,
      breadth:       Math.max (...nodes),
      height:        (Math.max (...nodes) * NODE_HEIGHT) +
                     ((Math.max (...nodes) - 1) * SPACING_VERTICAL),
      width:         (nodes.length * NODE_WIDTH) +
                     ((nodes.length - 1) * SPACING_HORIZONTAL),
    };
    TREE_HEIGHT = tree.height;
    TREE_WIDTH  = tree.width;
    return tree;
  }

  renderNode (content, position) {
    return (
      <View
        key={content}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          backgroundColor: '#eeeeee',
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{content}</Text>
      </View>
    );
  }

  renderLevel (tree, data, nodes, level) {
    if (
      !tree                    ||
      !tree.nodeCounts         ||
      !tree.nodeCounts [level] ||
      !data                    ||
      data.length <1
    ) { return nodes; }

    // Get the number of nodes at this level.
    var nodesAtThisLevel = tree.nodeCounts [level];

    // Calculate the positions for each node at this level.
    // --------------------------------------------
    // Horizontal Positioning:
    // --------------------------------------------
    var n = level + 1;
    var s = SPACING_HORIZONTAL;
    var W = NODE_WIDTH;
    var k = (2 * n - 1);
    var x = (k * W)/2 + (n-1) * s - (W/2);

    // --------------------------------------------
    // Vertical Positioning:
    // --------------------------------------------
    var s = SPACING_VERTICAL;
    var N = NODE_HEIGHT;
    var odd = nodesAtThisLevel % 2 != 0;
    var center = (nodesAtThisLevel - 1)/2;
    for (var i = 0; i < nodesAtThisLevel; i++) {
      var y;
      if (i == center) {
        y = 0;
      }
      else if (i < center) {
        y = - ((center-i) * N + (center-i) * s);
      }
      else if (i > center) {
        y = (i-center) * N + (i-center) * s;
      }

      // Add position data to the tree.
      data [i].position = {x: x, y: y};
    }

    // Repeat for each child.
    for (var i = 0; i < nodesAtThisLevel; i++) {
      this.renderLevel (tree, data [i].children, nodes, ++level);
      // Now that we're back, decrement level.
      level--;
    }

    // Generate the nodes.
    for (var i = 0; i < nodesAtThisLevel; i++) {
      nodes.push (this.renderNode (data [i].name, data [i].position));
    }

    return nodes;
  }

  renderTree (data) {
    // Analyze the tree.
    var tree = this.analyzeTree (data);
    console.log ('Tree:');
    console.log (tree);

    // Render the tree.
    var nodes = [];
    nodes = this.renderLevel (tree, tree.data, nodes, 0);

    return (
      <View style={{width: tree.width,}}>
        {nodes}
      </View>
    );
  }

  render () {
    const data = this.props.root;
    return (
      <View style={{backgroundColor: '#cccccc',}}>
        {this.renderTree (data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {

  },
  tree: {

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

export default connect (mapStateToProps)(Tree);
