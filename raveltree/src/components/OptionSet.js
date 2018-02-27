// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/12/18
// Modified:  02/12/18

// Standard "option set" component for a group of radio-button-like tag options
// for RavelTree.
//
// Pass in options as an array prop like so:
//
// <OptionSet options={[
//             {name: 'fiction', title: 'Fiction'},
//             {name: 'nonfiction', title: 'Nonfiction'},
//             {name: 'multimedia', title: 'Multimedia'},
//             {name: 'other', title: 'Other'},
//           ]}
//           active={'fiction'}
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

import Tag from './Tag'

export default class OptionSet extends React.Component {

  constructor (props) {
    super (props);
    this.state = {active: this.props.active};
  }

  handleSelect (newState) {
    this.setState ({active: newState});

    // TODO: Selection logic here.
    this.props.onChange (newState);
  }

  createTag (tag) {
    return (
      <View style={styles.item} >
        <Tag name={tag.name}
             active={this.state.active == tag.name}
             toggleFormState={newState => this.handleSelect(newState)}>
          {tag.title}
        </Tag>
      </View>
    )
  }

  render () {
    const {
      active,
      onChange,
      testID,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={layoutStyles}>
          {this.props.options.map (tag => this.createTag (tag))}
        </View>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 3,
    paddingBottom: 3,
  },
  item: {
    marginLeft: 6,
    marginRight: 6,
  },
});
