// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  03/28/18

// Tree component for RavelTree.
//
// TODO: Handle multiple parents and children.
// TODO: Adjust spacing and positioning for when an arrow spans more than one level.
// TODO: Animations. All the animations.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  Dimensions,
  ART,
} from 'react-native';

import firebase from 'firebase';
import { connect } from 'react-redux';
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

DEBUG = true;

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
      //tree: {},
      selectedNodeIndex: undefined,
      connectingArrow: {},
    };

    TREE_HORIZONTAL_PADDING = this.props.horizontalPadding || 20;
  }

  componentWillReceiveProps (newProps) {
    var tree = this.state.tree;
    var passage = newProps.passage_meta_data;

    // Passage Metadata
    if (passage) {
      if (!((tree.nodesProcessed || {}) [passage.level] || {}) [passage.passage_uid]) {
        console.log ("Received passage metadata.");
        tree.data [passage.passage_uid] = passage;
        if (!tree.nodesProcessed [passage.level]) { tree.nodesProcessed [passage.level] = {}; }
        tree.nodesProcessed [passage.level] [passage.passage_uid] = true;
        console.log (tree);
        this.setState ({ tree: tree });

        nodesToRender.push (this.renderNode (tree.data [passage.passage_uid]));

        // TODO: Check whether we're done rendering all the nodes at this level.
        //  - If so, get the current nodes' children.
        //  - If not, keep waiting.
        // Loading indicator somewhere?
      }
    }
  }

  findPosition (index) {
    // Returns the screen position of the node with the passed passage index.
    return this._findPosition (index, this.props.tree.data, 0, this.props.tree.data.length);
  }

  _findPosition (index, tree, level, groupCount) {
    if (!index || !tree) { return null; }

    var position;

    // Tree levels are zero-indexed; Passage indexes are 1-indexed.
    var targetLevel = parseInt (index.split ('-') [0]) - 1;

    if (level < targetLevel) {
      // For each node in this group, try to get to the target level.
      for (var i = 0; i < tree.length; i++) {

        position = this._findPosition (index, tree [i].children, level + 1, tree [i].children.length);
        if (position) { return position; }
      }
      return null;
    }

    // If we're deeper than the target level, don't go any further.
    if (level > targetLevel) { return null; }

    // We're at the target level. Check this group for the node.
    for (var i = 0; i < groupCount; i++) {
      if (tree [i].passageIndex == index) {
        if (DEBUG) { console.log ('FOUND:'); }
        if (DEBUG) { console.log (tree [i]); }
        return tree [i].position;
      }
    }
    return null;
  }

  onPressPassage (passageMetaData) {
    // If we're on the Merge screen, render an arrow from the node we're merging
    // from to the node we're merging to.
    if (this.props.mergeFrom) {
      // Mark the node as selected.
      this.setState ({ selectedNodeIndex: passageMetaData.passage_index });

      // Get the position of the 'this.props.mergeFrom' index node
      var from = this.findPosition (this.props.mergeFrom);

      // Get the position of the 'passageMetaData' node
      var to = this.findPosition (passageMetaData.passage_index);

      // Adjust the stored coordinates for centering.
      var N = NODE_HEIGHT;
      var W = NODE_WIDTH;
      var start = {
        x: from.x + (W),
        y: from.y + (N/2),
      }
      var end = {
        x: to.x,
        y: to.y + N/2,
      }

      // Render a new connecting arrow.
      if (DEBUG) { console.log ('Drawing arrow:'); }
      if (DEBUG) { console.log (from);             }
      if (DEBUG) { console.log (to);               }
      this.setState ({
        connectingArrow: { from: start, to: end }
      });
    }
    this.props.onPressPassage (passageMetaData);
  }

  showConnectingArrow () {
    var positions = this.state.connectingArrow;
    if (!(positions || {}).from || !(positions.to || {})) { return; }

    from = positions.from;
    to   = positions.to;

    // Render the arrow.
    // TODO: Add parameter to make it a different color...
    return (this.renderArrow (from, to, false, true));
  }

  renderArrow (startPosition, endPosition, optimal, connecting) {
    var arrow;

    startPosition.y += MAGIC_NUMBER;
    endPosition.y += MAGIC_NUMBER;

    var color = optimal ? '#2E8AF7' : connecting ? '#3BB54A' : '#555555';

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

  getXPosition (node) {
    var n = node.level;
    var s = SPACING_HORIZONTAL;
    var W = NODE_WIDTH;
    var k = (2 * n - 1);
    return ((k * W)/2 + (n-1) * s - (W/2));
  }

  getYPosition (node) {
    var s = SPACING_VERTICAL;
    var N = NODE_HEIGHT;
    var nodesAtThisLevel = this.state.tree.nodeCounts [node.level];
    var odd = nodesAtThisLevel % 2 != 0;
    var center = (nodesAtThisLevel - 1)/2;
    var i = _.size (this.state.tree.nodesProcessed [node.level]);
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
    return y;
  }

  renderNode (content) {
    var Node = PassageStub;

    // Position
    if (!content.position) { content.position = {}; }
    content.position.x = this.getXPosition (content);
    content.position.y = this.getYPosition (content);

    return (
      <View
        key={content.passage_uid}
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
          key={content.passage_uid + '_' + content.passage_title}
          {...this.props}
          name={content.passage_title}
          passageIndex={content.passage_index}
          score={content.passage_combined_vote}
          active={content.optimal}
          disabled={content.disabled}
          author={content.user_created}
          onPress={() => this.onPressPassage (content)}
          onPressAdd={() => this.props.onPressAdd (content)}
          showAddButton={
            (this.state.screenData.ravel_participants [firebase.auth ().currentUser.uid]) ||
            (this.props.screenData.user_created == firebase.auth ().currentUser.uid)
          }
          highlighted={this.state.selectedNodeIndex == content.passage_index}
        />
      </View>
    );
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

      // If we're on the Merge screen...
      if (this.props.mergeFrom) {
        // We want to exclude all levels <= the specified passage index.
        var mergeFromLevel = parseInt (this.props.mergeFrom.split ('-') [0]);
        var thisLevel = level + 1;
        if (thisLevel <= mergeFromLevel) {
          data [j].disabled = true;
        }

        // We also want to exclude any of the node's existing children. We have
        // to do this from the child node to be excluded, not the parent.
        for (var k = 0; k < (data [j].parents || {}).length; k++) {
          // If the parent node is the mergeFrom node, disable the current node.
          if (data [j].parents [k].passageIndex == this.props.mergeFrom) {
            data [j].disabled = true;
          }
        }

        if (data [j].passageIndex == this.props.mergeFrom && data [j].children) {
          for (var k = 0; k < data [j].children.length; k++) {
            data [j].children [k].disabled = true;
          }
        }
      }

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

  analyzeTree (tree) {
    var nodes = Object.values (tree.nodeCounts);

    tree.height =   (Math.max (...nodes) * NODE_HEIGHT) +
                    ((Math.max (...nodes) - 1) * SPACING_VERTICAL);
    tree.width =    (nodes.length * NODE_WIDTH) +
                    ((nodes.length - 1) * SPACING_HORIZONTAL);
    tree.analyzed = true;

    TREE_HEIGHT = tree.height;
    TREE_WIDTH  = tree.width;

    // For the love of god, don't change this. It keeps everything centered.
    MAGIC_NUMBER = ((NODE_HEIGHT + SPACING_VERTICAL) / 2) * (tree.breadth - 1);

    return tree;
  }

  renderTree (tree) {
    if (!tree) { return; }

    // Analyze the tree if it hasn't been already.
    if (!tree.analyzed) {
      if (DEBUG) console.log ('Tree needs to be analyzed. Analyzing...');
      tree = this.analyzeTree (tree);
      this.props.onAnalyzeTree (tree);
      this.setState ({ tree: tree });

      if (DEBUG) console.log ('Tree:');
      if (DEBUG) console.log (tree);

      // Download the passages at the root level.
      Object.keys (tree.data).map (id =>
        this.props.getPassageMetaData (this.props.ravelID, id)
      );
    } else {
      if (DEBUG) console.log ('Tree already processed. Skipping analysis.');
    }

    // Render the tree.
    //nodesToRender = this.renderLevel (tree, tree.data, nodesToRender, 0);

    // If we're on the Merge screen, scroll to the appropriate level.
    if (this.props.mergeFrom) {
      var mergeFromLevel = parseInt (this.props.mergeFrom.split ('-') [0]);
      var {height, width} = Dimensions.get ('window');
      var centeringFactor = ((width - NODE_WIDTH) / 2);
      var x = TREE_HORIZONTAL_PADDING + mergeFromLevel * (NODE_WIDTH + SPACING_HORIZONTAL) - centeringFactor;
      this.props.setScrollParams ({x: x, y:0, animated: true});
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
          {this.showConnectingArrow ()}
        </Surface>
      </View>
    );
  }

  render () {
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

  const {
    passage_meta_data,
  } = state.passage

  return {
    activeScreen,
    previousScreens,
    passage_meta_data
  };
}

export default connect (mapStateToProps)(Tree);
