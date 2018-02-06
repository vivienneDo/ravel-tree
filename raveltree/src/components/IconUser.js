// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/06/18
// Modified:  02/06/18

// Standard "user" icon component for RavelTree.
//
// Relies on asset user.svg at ./img/user
// Image credit: Designed by Smashicons from Flaticon
// Used under FlatIcon's "FREE LICENSE (WITH ATTRIBUTION)"
// https://file000.flaticon.com/downloads/license/license.pdf

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const View = require('View');
const Image = require('Image');

const DEFAULT_SIZE = 20;

export default class IconUser extends React.Component {

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
          source={require ('./img/user.png')}
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
