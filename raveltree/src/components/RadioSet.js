// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/07/18
// Modified:  02/07/18

// Standard "radio set" component for a group of radio buttons for RavelTree.
//
// Pass in options as props like so:
//
// <RadioSet options={[
//             {name: 'concept', title: 'By Concept'},
//             {name: 'tag', title: 'By Tag'},
//             {name: 'category', title: 'By Category'},
//             {name: 'trending', title: 'By Trending'},
//           ]}
//           active={'concept'}
// />

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const View = require('View');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');

import RadioItem from './RadioItem'

export default class RadioSet extends React.Component {

  constructor (props) {
    super (props);
    this.state = {active: this.props.active};
  }

  handleSelect (newState) {
    this.setState (newState);

    // Selection logic here.
    this.props.onSetFormState (newState);
  }

  createRadioItem (option) {
    return (
      <View style={styles.item} >
        <RadioItem title={option.title} name={option.name} active={this.state.active == option.name} setFormState={newState => this.handleSelect(newState)} />
      </View>
    )
  }

  render () {
    const {
      active,
      setFormState,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={layoutStyles}>
          {this.props.options.map (option => this.createRadioItem (option))}
        </View>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  item: {
    marginLeft: 6,
    marginRight: 6,
  },
});
