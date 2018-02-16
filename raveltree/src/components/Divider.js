// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/06/18
// Modified:  02/06/18

// Standard divider component for RavelTree.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const View = require('View');
const Dimensions = require('Dimensions');

export default class Divider extends React.Component {

  render () {
    const {
      color,
    } = this.props;

    const dividerStyles = [styles.divider];

    dividerStyles.push ([
      this.props.color ? {backgroundColor: color} : {backgroundColor: '#e8e8e9'},
    ]);

    return (
      <View style={dividerStyles} />
    )
  }
}

const styles = StyleSheet.create ({
  divider: {
    width: '100%', // Currently relative. Change to below to make absolute.
    //width: Dimensions.get('window').width,
    height: 1,
  },
});
