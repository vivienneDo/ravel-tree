// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/04/18
// Modified:  02/06/18

// RavelTree text logo rendered in a Text component.

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const View = require('View');

export default class RTLogoText extends React.Component {

  render () {

    const {
      size,
    } = this.props;

    const textStyles = [styles.ravel];

    textStyles.push ([
      this.props.size ? {fontSize: size} : {fontSize: 40},
    ]);

    return (
      <Text style={textStyles}>
        ravel
        <Text style={styles.tree}>
          tree
        </Text>
      </Text>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
  },
  ravel: {
    color: '#2E8AF7',
    fontFamily: 'EB Garamond',
  },
  tree: {
    color: '#3BB54A',
    fontFamily: 'EB Garamond',
  },
});
