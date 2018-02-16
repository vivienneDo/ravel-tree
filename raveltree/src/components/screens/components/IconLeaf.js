// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/06/18
// Modified:  02/06/18

// Standard "leaf" icon component for RavelTree.
//
// Relies on asset leaf.svg at ./img/leaf.png
// Image credit: Designed by Daniel Bruce from Flaticon
// https://www.flaticon.com/authors/daniel-bruce
// Used under CC BY 3.0
// https://creativecommons.org/licenses/by/3.0/

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const View = require('View');
const Image = require('Image');

const DEFAULT_SIZE = 20;

export default class IconLeaf extends React.Component {

  render () {
    const {
      size,
    } = this.props;

    const iconStyles = [styles.icon];
    const layoutStyles = [styles.layout];

    layoutStyles.push ([
      this.props.size ? {height: size, width: size} : {height: DEFAULT_SIZE, width: DEFAULT_SIZE},
    ]);

    return (
      <View style={layoutStyles}>
        <Image
          source={require ('./img/leaf.png')}
          style={iconStyles}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  layout: {
    //
  },
});

AppRegistry.registerComponent('IconLeaf', () => IconLeaf);