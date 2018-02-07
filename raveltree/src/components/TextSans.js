// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/06/18
// Modified:  02/06/18

// Standard sans-serif text component for RavelTree.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const View = require('View');

export default class TextSans extends React.Component {

  render () {
    const {
      size,
      color,
    } = this.props;

    const textStyles = [styles.serif];

    textStyles.push ([
      this.props.size ? {fontSize: size} : {fontSize: 12},
      this.props.color ? {color: color} : {color: '#282828'},
    ]);

    return (
      <Text style={textStyles}>
        {this.props.children}
      </Text>
    )
  }
}

const styles = StyleSheet.create ({
  serif: {
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('TextSans', () => TextSans);
