// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  03/14/18

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
const SPACING_VERTICAL = 40;
const SPACING_HORIZONTAL = 20;

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
      nodePositions: [],
      depth:         nodes.length,
      height:        Math.max (...nodes),
      width:         (nodes.length * NODE_WIDTH) +
                     ((nodes.length - 1) * SPACING_HORIZONTAL),
    };
    return tree;
  }

  renderNode (content, position) {
    return (
      <View
        key={content}
        style={{
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
    //console.log ("At level " + level + " (" + nodesAtThisLevel + ' nodes)');

    // Calculate the positions for each node at this level.
    if (!tree.nodePositions [level]) { tree.nodePositions [level] = [] };
    //console.log (tree.nodePositions [level]);
    // --------------------------------------------
    // Horizontal Positioning:
    // --------------------------------------------
    // x = (kW)/2 + (n-1)s , k = 2n-1
    //
    //    where:
    //      s = horizontal spacing
    //      W = node width
    //
    var n = level + 1;          // n = 1
    var s = SPACING_HORIZONTAL; // s = 20
    var W = NODE_WIDTH;         // W = 100
    var k = (2 * n - 1);
    var x = (k * W)/2 + (n-1) * s;
    x = x - (W/2); // TEMP: Correction factor (because views are top-left positioned)
    // --------------------------------------------
    // Vertical Positioning:
    // --------------------------------------------
    // n is odd:  y = (h/2) ± k(s+N), k∈[0, floor (n/2)]
    // n is even: y = (h/2) ± (k/2) * (s+N), k∈[1, n-1], k is odd
    //
    //    where:
    //      s = vertical spacing
    //      h = total graph height
    //      N = node height
    //
    var s = SPACING_VERTICAL;
    var h = tree.height * NODE_HEIGHT;
    var m = h / 2;
    var N = NODE_HEIGHT;
    var odd = nodesAtThisLevel % 2 != 0;

    for (var n = odd ? 1 : 2; n <= nodesAtThisLevel; n = n+2) {
      var index;
      var centerIndex = (nodesAtThisLevel - 1) / 2;
      var y;

      if (n == 1 && odd) {
        y = m;
        y = y + (N/2); // TEMP: Correction factor (because views are top-left positioned)
        if (!tree.nodePositions [level] [centerIndex]) { tree.nodePositions [level] [centerIndex] = {}; }
        tree.nodePositions [level] [centerIndex] = {x: x, y: y};
        continue;
      }

      if (odd) { k = Math.floor (n/2); }
      else     { k = n - 1 }

      if (odd) { y = m + k     * (s + N); }
      else     { y = m + (k/2) * (s + N); }
      y = y + (N/2); // TEMP: Correction factor (because views are top-left positioned)

      if (odd) { index = centerIndex - k; }
      else     { index = Math.floor (centerIndex) - (n/2 - 1); }
      if (!tree.nodePositions [level] [index]) { tree.nodePositions [level] [index] = {}; }
      tree.nodePositions [level] [index] = {x: x, y: y};

      if (odd) { y = m - k     * (s + N); }
      else     { y = m - (k/2) * (s + N); }
      y = y + (N/2); // TEMP: Correction factor (because views are top-left positioned)

      if (odd) { index = centerIndex + k; }
      else     { index = Math.ceil (centerIndex) + (n/2 - 1); }
      if (!tree.nodePositions [level] [index]) { tree.nodePositions [level] [index] = {}; }
      tree.nodePositions [level] [index] = {x: x, y: y};
    }

    // Repeat for each child.
    for (var i = 0; i < nodesAtThisLevel; i++) {
      this.renderLevel (tree, data [i].children, nodes, ++level);
      // Now that we're back, decrement level.
      level--;
    }

    console.log (tree.nodePositions);

    // Generate the nodes.
    for (var i = 0; i < tree.nodePositions [level].length; i++) {
      //console.log (tree.nodePositions [i]);
      nodes.push (this.renderNode (data [i].name, tree.nodePositions [level] [i]));
    }

    return nodes;
  }

  renderTree (data) {
    // Analyze the tree. Returns an object with:
    // { data, nodeCounts, depth, height, width }
    var tree = this.analyzeTree (data);
    console.log (tree);
    console.log (tree.height * NODE_HEIGHT + (tree.height - 1) * SPACING_VERTICAL);

    // Render the tree.
    var nodes = [];
    nodes = this.renderLevel (tree, tree.data, nodes, 0);

    return (
      <View style={{backgroundColor: '#dddddd', width: tree.width,}}>
        {nodes}
      </View>
    );
  }

  render () {
    const data = this.props.root;
    return (
      <View style={styles.layout}>
        {this.renderTree (data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {

  },
  tree: {
    position: 'absolute',
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
