// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  03/20/18

// Tree component for RavelTree.
//
// TODO: Handle multiple parents and children.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  ART,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

// Node Component:
// -----------------------------------------------------------------------------
import PassageStub from './PassageStub';
// -----------------------------------------------------------------------------

const {
  Surface,
  Group,
  Shape,
  Path,
} = ART;

DEBUG = false;

ARROW_MODES = {
  straight:  'straight',
  sineCurve: 'sineCurve',
}
ARROW_MODE = ARROW_MODES.sineCurve;

const NODE_HEIGHT = 20;                       // Original: 20
const NODE_WIDTH = 250;                       // Original: 100
const SPACING_VERTICAL = NODE_WIDTH / 4;      // Original: 30
const SPACING_HORIZONTAL = NODE_HEIGHT * 4;   // Original: 40

const ARROW_WIDTH = NODE_WIDTH;
const ARROW_HEIGHT = NODE_HEIGHT;

TREE_HEIGHT = undefined;
TREE_WIDTH  = undefined;

var nodesToRender = [];
var arrowsToRender = [];

// MAGIC_NUMBER:
// MaxNodes   Height    Magic Number
// 1          20        0
// 2          70        25
// 3          120       50
// 4          170       75
// 5          220       100
// 6          270       125

class Tree extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ...this.props,
      tree: [],
    };
  }

  analyzeLevel (data, nodes, level) {
    if (!data || !data.length || data.length < 1) { return nodes; }

    // Get the number of nodes at this level.
    var nodesAtThisLevel = data.length;

    // Add the number of nodes at this level at the array index.
    if (!nodes [level]) { nodes [level] = 0; }
    nodes [level] += nodesAtThisLevel;

    // For each node at this level...
    for (var i = 0; i < nodesAtThisLevel; i++) {
      // Keep track of the number of immediate siblings in this group.
      // console.log ('Setting groupCount for L' + level + ', i' + i);
      data [i].groupCount = nodesAtThisLevel;

      // Add a unique internal identifier.
      var treeID = level + '-' + i;
      data [i].treeID = treeID;

      // Calculate and store each node's individual "optimality score" factor.
      // TODO: More sophisticated algorithm. For now, just sums the branch's scores.
      data [i].optimalityScore = data [i].score;

      // Analyze each child.
      this.analyzeLevel (data [i].children, nodes, ++level);

      // Now that we're back, decrement level.
      level--;

      // Which child has the highest optimality score?
      var optimalChild = undefined;
      var optimalChildScore = Number.NEGATIVE_INFINITY;
      for (var j = 0; j < data [i].children.length; j++) {
        var thisScore = data [i].children [j].optimalityScore;
        if (thisScore > optimalChildScore) {
          optimalChildScore = thisScore;
          optimalChild = j;
        }
      }
      if (optimalChildScore != Number.NEGATIVE_INFINITY) {
        data [i].optimalityScore += optimalChildScore;
        data [i].optimalChild = optimalChild;
      }
    }

    // If this is the first level, designate the optimal node and mark the data
    // as analyzed.
    var optimalNode = undefined;
    var optimalScore = Number.NEGATIVE_INFINITY;
    if (level == 0) {
      for (var i = 0; i < nodesAtThisLevel; i++) {
        if (data [i].optimalityScore > optimalScore) {
          optimalScore = data [i].optimalityScore;
          optimalNode = i;
        }
      }
      data [optimalNode].optimal = true;
    }

    // Return the array of node counts.
    return nodes;
  }

  analyzeTree (data) {
    nodes = [];
    // scores = [];
    // console.log (scores);
    nodes = this.analyzeLevel (data, nodes, 0);
    var tree = {
      data:           data,
      nodeCounts:     nodes,
      nodesProcessed: [],
      depth:          nodes.length,
      breadth:        Math.max (...nodes),
      height:         (Math.max (...nodes) * NODE_HEIGHT) +
                      ((Math.max (...nodes) - 1) * SPACING_VERTICAL),
      width:          (nodes.length * NODE_WIDTH) +
                      ((nodes.length - 1) * SPACING_HORIZONTAL),
      analyzed:       true,
    };
    TREE_HEIGHT = tree.height;
    TREE_WIDTH  = tree.width;

    // For the love of god, don't change this. It keeps everything centered.
    MAGIC_NUMBER = ((NODE_HEIGHT + SPACING_VERTICAL) / 2) * (tree.breadth - 1);

    return tree;
  }

  renderArrow (startPosition, endPosition, optimal) {
    var arrow;

    startPosition.y += MAGIC_NUMBER;
    endPosition.y += MAGIC_NUMBER;

    var color = optimal ? '#2E8AF7' : '#555555';

    switch (ARROW_MODE) {

      case ARROW_MODES.sineCurve: {
        const ctl1 = {x: startPosition.x - 10, y: endPosition.y};
        const ctl2 = {x: endPosition.x + 10, y: startPosition.y};
        const deltaX = endPosition.x - startPosition.x;
        const deltaY = endPosition.y - startPosition.y;

        arrow = Path ()
          .moveTo (startPosition.x - 10, startPosition.y)
          .curveTo (ctl1.x, ctl1.y, ctl2.x, ctl2.y,
                    endPosition.x + 10, endPosition.y);
        break;
      }

      case ARROW_MODES.straight: {
        arrow = Path ()
          .moveTo (startPosition.x - 10, startPosition.y)
          .lineTo (endPosition.x, endPosition.y);
        break;
      }

    }

    return (
      <Shape
        key={startPosition.x + ',' + startPosition.y + '-' + endPosition.x + ',' + endPosition.y}
        d={arrow}
        //fill={'#bbbbbb'}
        stroke={color}
        //stroke={'#53350A'}
        strokeWidth={5}
        strokeCap={'square'}
      />
    );
  }

  renderNode (content) {
    var Node = PassageStub;

    var passageMetaData = {
      ravel_title: this.props.tree.title, // TODO: Change to match structure from backend.
      passage_index: content.passageIndex,
      passage_title: content.name,
      passage_body: content.passage,
      isOptimal: content.optimal,
    };

    return (
      <View
      key={content.name}
          style={{
            position: 'absolute',
            zIndex: 2,
            left: content.position.x,
            top: content.position.y,
            //backgroundColor: '#eeeeee',
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Node
          name={content.name}
          passageIndex={content.passageIndex}
          score={content.score}
          active={content.optimal}
          //passage={content.passage}
          onPress={() => this.props.onPressPassage (passageMetaData)}
        />
      </View>
    );

    // return (
    //   <View
    //     key={content}
    //     style={{
    //       position: 'absolute',
    //       zIndex: 2,
    //       left: position.x,
    //       top: position.y,
    //       backgroundColor: '#eeeeee',
    //       width: NODE_WIDTH,
    //       height: NODE_HEIGHT,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Text>{content}</Text>
    //   </View>
    // );
  }

  renderLevel (tree, data, nodes, level) {
    if (
      !tree                    ||
      !tree.nodeCounts         ||
      !tree.nodeCounts [level] ||
      !data                    ||
      data == undefined        ||
      data.length < 1
    ) { return nodes; }

    // DEBUG
    var tabs = '';
    for (var n = 0; n < level; n++) { tabs += '\t'; }
    if (DEBUG) console.log (tabs + 'Rendering at level ' + level + '...');

    // Get the number of nodes at this level.
    var nodesAtThisLevel = tree.nodeCounts [level];

    // Get the number of siblings in this group.
    var nodesInThisGroup = data [0].groupCount;
    if (DEBUG) console.log (tabs + 'Nodes in this group: ' + nodesInThisGroup);

    // Keep track of how many nodes at this level we've processed.
    if (!tree.nodesProcessed [level]) { tree.nodesProcessed [level] = 0; }

    // DEBUG
    if (DEBUG) console.log (tabs + 'Already processed ' + tree.nodesProcessed [level] + "/" + nodesAtThisLevel + ' nodes at this level.');

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

    var j = 0;
    var groupNodesProcessed = 0;
    while (groupNodesProcessed < nodesInThisGroup) {
      var i = tree.nodesProcessed [level];

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
      data [j].position = {x: x, y: y};

      // Designate the optimal child.
      if (data [j].optimal && data [j].children) {
        var optimalChild = data [j].optimalChild;
        (data [j].children [optimalChild] || {}).optimal = true;
      }

      // Repeat for each child.
      this.renderLevel (tree, data [j].children, nodes, ++level);

      // Now that we're back, decrement level.
      level--;

      // Generate the node.
      nodes.push (this.renderNode (_.omit (data [j], ['children', 'groupCount',])));

      // Generate the arrows.
      if (data [j].children) {
        for (var k = 0; k < data [j].children.length; k++) {
          var startPosition = {
            x: data [j].position.x + (W),
            y: data [j].position.y + (N/2),
          }
          var endPosition = {
            x: data [j].children [k].position.x,
            y: data [j].children [k].position.y + N/2,
          }
          var optimal = data [j].optimal && data [j].children [k].optimal;
          arrowsToRender.push (this.renderArrow (startPosition, endPosition, optimal));
        }
      }

      // DEBUG
      if (DEBUG) console.log (tabs + 'Processed node ' + data [j].name);

      tree.nodesProcessed [level] ++;
      j++;
      groupNodesProcessed++;
    }

    // DEBUG
    var sym = tree.nodesProcessed [level] == nodesAtThisLevel ? '✅' : '❌';
    if (DEBUG) console.log (tabs + sym + 'Processed ' + tree.nodesProcessed [level] + "/" + nodesAtThisLevel + ' nodes at level ' + level + '.');

    return nodes;
  }

  renderTree (tree) {
    if (!tree) { return; }

    // Analyze the tree if it hasn't been already.
    if (!tree.analyzed) {
      tree = this.analyzeTree (tree.roots);
      this.props.onAnalyzeTree (tree);

      if (DEBUG) console.log ('Tree:');
      if (DEBUG) console.log (tree);

      // Send up the nodeCounts array to the Ravel screen so we can use it to
      // calculate passage indexes.
      var nodeCounts = Object.assign ({}, tree.nodeCounts);
      this.props.onUpdateNodeCounts (nodeCounts);

      // Render the tree.
      nodesToRender = this.renderLevel (tree, tree.data, nodesToRender, 0);
    }

    return (
      <View style={{width: TREE_WIDTH, height: TREE_HEIGHT, top: MAGIC_NUMBER,}}>
        {nodesToRender}
        <Surface
          width={TREE_WIDTH}
          height={TREE_HEIGHT}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: -MAGIC_NUMBER,
            backgroundColor:'#cccccc',
            backgroundColor:'transparent',
          }}
        >
          {arrowsToRender}
        </Surface>
      </View>
    );
  }

  render () {
    // TODO
    //const data = this.state.tree.length ? this.state.tree.data : this.props.root;
    //const data = this.props.root;
    //const tree = this.state.tree.length > 0 ? this.state.tree : this.props.tree;
    const tree = this.props.tree;
    return (
      <View style={{width: TREE_WIDTH, height: TREE_HEIGHT, /*backgroundColor: '#aaaaaa',*/ zIndex: 1,}}>
        {this.renderTree (tree)}
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
