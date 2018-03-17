// Author:    Frank Fusco (fr@nkfus.co)
// Created:   03/14/18
// Modified:  03/16/18

// Tree component for RavelTree.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView,
  //Image,
  ART,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

//const arrow = require ('../components/img/line-top-active.png');

const {
  Surface,
  Group,
  Shape,
  Path,
} = ART;

const NODE_HEIGHT = 20;
const NODE_WIDTH = 100;
const SPACING_VERTICAL = 30;
const SPACING_HORIZONTAL = 40;

const ARROW_WIDTH = NODE_WIDTH;
const ARROW_HEIGHT = NODE_HEIGHT;

TREE_HEIGHT = undefined;
TREE_WIDTH  = undefined;

var nodesToRender = [];
var arrowsToRender = [];

// MAGIC_NUMBER = 75;


// MaxNodes   Height    Magic Number
// 1          20        0
// 2          70        25
// 3          120       50
// 4          170       75
// 5          220       100
// 6          270       125


//MAGIC_NUMBER = (NODE_HEIGHT + VERTICAL_SPACE) * ;

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

    MAGIC_NUMBER = ((NODE_HEIGHT + SPACING_VERTICAL) / 2) * (tree.breadth - 1);

    return tree;
  }

  renderArrow (startPosition, endPosition) {
    // TEMP: WTF is with the 75s???
    startPosition.y += MAGIC_NUMBER;
    endPosition.y += MAGIC_NUMBER;
    //endPosition.x += 20;

    const ctl1 = {x: 0,  y: 0};
    const ctl2 = {x: 0,  y: 0};
    const deltaX = endPosition.x - startPosition.x;
    const deltaY = endPosition.y - startPosition.y;

    const arrow = Path ()
      .moveTo (startPosition.x, startPosition.y)
      //.curveTo (ctl1.x, ctl1.y, ctl2.x, ctl2.y, endPosition.x, endPosition.y)
      .lineTo (endPosition.x, endPosition.y);
      //.curveTo (ctl1.x, ctl1.y, ctl2.x, ctl2.y, deltaX, deltaY);

    var startx = startPosition.x;
    var starty = startPosition.y;
    var endx   = endPosition.x;
    var endy   = endPosition.y;

    //const path = new Path ('M '+startx+','+starty+' C '+startx+','+starty+' '+endx+','+endy+' '+endx+','+endy);
    const path = new Path ('M '+startx+','+starty+' L '+endx+','+endy);

    return (
      <Shape
        key={startPosition.x + ',' + startPosition.y + '-' + endPosition.x + ',' + endPosition.y}
        d={arrow}
        fill={'#000000'}
        stroke={'#000000'}
        strokeWidth={5}
        strokeCap={'square'}
      />
    );
  }

  renderNode (content, position) {
    return (
      <View
        key={content}
        style={{
          position: 'absolute',
          zIndex: 2,
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

    // Generate the arrows.
    for (var i = 0; i < nodesAtThisLevel; i++) {
      if (data [i].children) {
        for (var j = 0; j < data [i].children.length; j++) {
          // For now, just check whether the first character of the names match.
          // TODO: Generalize? Or dynamically generate a field like this during analysis.
          if (data [i].name.charAt (0) == data [i].children [j].name.charAt (0)) {
            // TODO: Draw curve from parent position (data [i].position) to child position (data [i].children [j].position).
            var startPosition = {
              // x: data [i].position.x + (W),
              // y: data [i].position.y + (N/2),
              x: data [i].position.x + (W),
              y: data [i].position.y + (N/2),
            }
            var endPosition = {
              // x: data [i].children [j].position.x - (W/4),
              // y: data [i].children [j].position.y + N/4,
              x: data [i].children [j].position.x,
              y: data [i].children [j].position.y + N/2,
            }
            console.log ("Drawing arrow from:");
            console.log (startPosition);
            console.log ("to:");
            console.log (endPosition);
            arrowsToRender.push (this.renderArrow (startPosition, endPosition));
          }
        }
      }



    }

    return nodes;
  }

  renderTree (data) {
    // Analyze the tree.
    var tree = this.analyzeTree (data);
    console.log ('Tree:');
    console.log (tree);

    // Render the nodes of the tree.
    //var nodes = [];
    nodesToRender = this.renderLevel (tree, tree.data, nodesToRender, 0);

    // Render the arrows of the tree.
    // var arrows = [];
    // arrows = this.renderArrows (tree, tree.data, arrows, 0);

    console.log (TREE_HEIGHT);

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
    const data = this.props.root;
    return (
      <View style={{width: TREE_WIDTH, height: TREE_HEIGHT, backgroundColor: '#aaaaaa', zIndex: 1,}}>
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
