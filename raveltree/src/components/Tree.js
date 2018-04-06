// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  04/05/18

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

import Loader from './Loader';

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

// var nodesToRender = [];
// var arrowsToRender = [];

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
      nodesToRender: [],
      arrowsToRender: [],
      stagedArrowData: [],
      loading: true,
      loadingLevel: 1,
      shouldLoadLevel: false,
      selectedNodeIndex: undefined,
      connectingArrow: {},
    };

    TREE_HORIZONTAL_PADDING = this.props.horizontalPadding || 20;
  }

  renderTestNode () {
    return (
      <View
        key={'12345'}
        style={{
          position: 'absolute',
          zIndex: 2,
          left: this.getXPosition ({ level: 1 }),
          top: 0,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PassageStub
          key={'1234567890'}
          {...this.props}
          name={'Test Title'}
          passageIndex={'1-A'}
          score={0}
          active={true}
          disabled={false}
          author={firebase.auth().currentUser.uid}
          onPress={() => this.onPressPassage ({})}
          onPressAdd={() => this.props.onPressAdd ({})}
          showAddButton={
            ((this.state.screenData.ravel_participants || {}) [firebase.auth ().currentUser.uid]) ||
            (this.props.screenData.user_created == firebase.auth ().currentUser.uid)
          }
          highlighted={false}
        />
      </View>
    );
  }

  addToTree (passage) {
    // Finds a passageID in the tree.data structure, adds its metadata, and
    // returns a 'path' to it in the form of an array.
    var path = [];
    var found = this._addToTree (passage, this.state.tree.data, 1, _.size (this.state.tree.data), path);
    return found ? path : undefined;
  }

  _addToTree (passage, tree, level, groupCount, path) {
    if (!passage || !tree) { return false; }

    var found = false;
    var targetLevel = passage.level;

    console.log ('Current level: ' + level);
    console.log ('Target level: ' + targetLevel);

    console.log ('Looking for: ' + passage.passage_uid);

    console.log ('Tree from here: ');
    console.log (tree);

    if (level < targetLevel) {
      // For each node in this group, try to get to the target level.
      for (let id of Object.keys (tree)) {
        path.push (id);
        console.log (path);
        found = this._addToTree (passage, tree [id].child, level + 1, _.size (tree [id].child), path);
        if (found) { return true; } else { path.pop (); }
      }
      return false;
    }

    // If we're deeper than the target level, don't go any further.
    if (level > targetLevel) { return false; }

    // We're at the target level. Check this group for the passageID.
    console.log (groupCount);
    console.log (Object.keys (tree));
    for (let id of Object.keys (tree)) {
      console.log (id);
      if (id == passage.passage_uid) {
        if (DEBUG) { console.log ('FOUND:'); }
        if (DEBUG) { console.log (id); }

        // If found, replace the entry with the passage's metadata.
        tree [id] = passage;
        /*if (_.size (path) == 0) {*/ path.push (id); /*}*/
        return true;
      }
    }
    return false;
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

  logLive (obj) {
    return (JSON.stringify(obj));
  }

  renderLoader () {
    if (this.state.loading) {
      var level = this.state.loadingLevel;
      var position = {
        x: (NODE_WIDTH / 2) + ((level - 1) * NODE_WIDTH),
        y: 0
      };

      return (
        <View style={{
          position: 'absolute',
          left: position.x,
          top: position.y
        }}>
          <Loader />
        </View>
      );
    }
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
    var i = _.size (this.state.tree.nodesProcessed [node.level]) - 1;
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

    console.log (content);

    // Position
    if (!content.position) { content.position = {}; }
    content.position.x = this.getXPosition (content);
    content.position.y = this.getYPosition (content);

    // Get any staged arrows and update them with relevant position data.
    var stagedArrowData = this.state.stagedArrowData.slice ();
    stagedArrowData.map (a => {
      if (a.id == content.passage_uid) {
        a.endPosition = {
          x: content.position.x,
          y: content.position.y,
        };
      }
      this.setState ({ stagedArrowData: stagedArrowData });
    });

    return (
      <View
        key={content.passage_uid}
        style={{
          position: 'absolute',
          zIndex: 2,
          left: content.position.x,
          top: content.position.y,
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
            ((this.state.screenData.ravel_participants || {}) [firebase.auth ().currentUser.uid]) ||
            (this.props.screenData.user_created == firebase.auth ().currentUser.uid)
          }
          highlighted={
            this.state.selectedNodeIndex ?
            this.state.selectedNodeIndex == content.passage_index :
            false
          }
        />
      </View>
    );
  }

  renderLevel (tree, data, nodes, level) {

    // ----------------------------
    // TO INTEGRATE:
    // ----------------------------

      // Designate the optimal child.
      if (data [j].optimal && data [j].children) {
        var optimalChild = data [j].optimalChild;
        (data [j].children [optimalChild] || {}).optimal = true;
      }

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
  }

  getLevel (level) {
    this.props.getPassageUidOnLevel (this.props.ravelID, level)
    .then (passageIDs => {

      if (DEBUG) console.log ('Got ' + _.size (passageIDs) + ' passages at level ' + 1 + ':')
      if (DEBUG) console.log (passageIDs);

      // Get the metadata for each passage.
      return Promise.all (Object.keys (passageIDs).map (async passageID => {
        return this.props.getPassageMetaData (passageID, this.props.ravelID);

      }))
    })
    .then (passages => {

      // Create a node for each passage.
      return Promise.all (Object.values (passages).map (async passage => {

        // Update the tree with the passage metadata.
        var tree = this.state.tree;
        var passageID = passage.passage_uid;
        if (!tree.nodesProcessed [passage.level]) { tree.nodesProcessed [passage.level] = {}; }
        tree.nodesProcessed [passage.level] [passageID] = passage;

        // Find the passageID in the data tree and replace the entry.
        var pathToPassage = this.addToTree (passage);
        var indexedPath = pathToPassage.map (id => [id]);
        var indexedPathString = JSON.stringify (indexedPath);
        console.log (indexedPathString);
        indexedPathString = indexedPathString.replace (/,/g , "['child']");
        console.log (indexedPathString);
        indexedPathString = indexedPathString.substr (1).slice (0, -1);
        indexedPathString = 'tree.data ' + indexedPathString;
        console.log (indexedPathString);
        console.log (eval (indexedPathString));

        // Prepare data for arrows linking to the parent(s).
        var arrows = [];
        if (level > 1 && passage.parent) {
          for (let parent of Object.keys (passage.parent)) {
            // Find the level and position of this parent passage, and whether
            // it's optimal.
            var parentLevel;
            var parentPosition;
            var parentOptimal;
            console.log (tree.nodesProcessed);
            for (let _level of Object.values (tree.nodesProcessed)) {
              if (_level [parent]) {
                parentLevel = _level [parent].level;
                parentPosition = _level [parent].position;
                parentOptimal = _level [parent].optimal;
              }
            }
            console.log (parentLevel);
            console.log (parentPosition);

            console.log (passage);

            var startPosition = {
              x: parentPosition.x + (NODE_WIDTH),
              y: parentPosition.y + (NODE_HEIGHT / 2),
            }
            var endPosition = {
              x: 100,  // x: data [j].children [k].position.x,
              y: 100,  // y: data [j].children [k].position.y + N/2,
            }
            var optimal = parentOptimal && passage.optimal;
            arrows.push ({
              id:            passage.passage_uid,
              startPosition: startPosition,
              endPosition:   endPosition,
              optimal:       optimal,
            });
          }
        }

        // Add the arrows to the array of staged arrow data.
        var stagedArrowData = this.state.stagedArrowData.slice ();
        stagedArrowData.push (...arrows);
        this.setState ({ stagedArrowData: stagedArrowData });


        // Add the arrows to the array of arrows to render.
        // var arrowsToRender = this.state.arrowsToRender.slice ();
        // arrowsToRender.push (...arrows);
        // this.setState ({ arrowsToRender: arrowsToRender });

        return (this.renderNode  (eval (indexedPathString)));

      }))
    })
    .then ((nodes) => {

      // Add the staged arrows to the array of arrows to render.
      var stagedArrowData = this.state.stagedArrowData.slice ();
      var arrowsToRender = this.state.arrowsToRender.slice ();
      var arrows = stagedArrowData.map (a => {
        return (this.renderArrow (a.startPosition, a.endPosition, a.optimal));
      });
      arrowsToRender.push (...arrows);
      this.setState ({
        arrowsToRender:  arrowsToRender,
        stagedArrowData: [],
      });
      console.log (this.state.stagedArrowData);



      // Add the nodes to the array of nodes to render.
      var nodesToRender = this.state.nodesToRender.slice ();
      nodesToRender.push (...nodes);
      this.setState ({ nodesToRender: nodesToRender });

      // Increment the loading level.
      var loadingLevel = this.state.loadingLevel + 1;
      this.setState ({
        loadingLevel: loadingLevel,
        shouldLoadLevel: true,
      });
    })
    .catch (error => { console.error (error); });
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
      this.getLevel (1);
    }
    else {
      if (DEBUG) console.log ('Tree already processed. Skipping analysis.');
    }

    // Check whether we should load a level – if so, which?
    if (
      this.state.shouldLoadLevel &&
      this.state.loading         &&
      this.state.loadingLevel > 1
    ) {
      this.setState ({ shouldLoadLevel: false });

      var tree = this.state.tree;
      var nodeCounts = tree.nodeCounts;
      var nodesProcessed = tree.nodesProcessed;
      var _nodeCounts = _.size (nodeCounts) - 1;
      var _nodesProcessed = _.size (nodesProcessed);

      if (_nodesProcessed < _nodeCounts) {
        this.getLevel (_nodesProcessed + 1);
      }
      else {
        this.setState ({ loading: false });
      }
    }

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
        {this.state.nodesToRender}
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
          {this.state.arrowsToRender}
          {this.showConnectingArrow ()}
        </Surface>
      </View>
    );
  }

  render () {
    const tree = this.props.tree;
    return (
      <View style={{width: TREE_WIDTH, height: TREE_HEIGHT, zIndex: 1,}}>
        {this.renderTree (tree)}
        {this.renderLoader ()}
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
