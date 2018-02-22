// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/12/18
// Modified:  02/12/18

// Standard "tag cloud" component for a group of tags for RavelTree.
//
// Pass in tags as an array prop like so:
//
// <TagCloud tags={[
//             'Unconventional',
//             'Mystery',
//             'Comedy',
//             'Postmodernism',
//             'Epic',
//           ]}
//           active={['Unconventional',]}
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

const DEFAULT_SUGGESTED_TAGS = [
  'Unconventional',
  'Mystery',
  'Comedy',
  'Postmodernism',
  'Epic',
];

const PADDING_VERTICAL = 3;
const MARGIN_HORIZONTAL = 6;

export default class TagCloud extends React.Component {

  static get PADDING_VERTICAL () {
    return PADDING_VERTICAL;
  }

  static get MARGIN_HORIZONTAL () {
    return MARGIN_HORIZONTAL;
  }

  constructor (props) {
    super (props);
    var tags = typeof this.props.tags == 'undefined' ? DEFAULT_SUGGESTED_TAGS : this.props.tags;
    var active = typeof this.props.active == 'undefined' ? [] : this.props.active;
    this.state = {tags: tags, active: active};
  }

  componentWillReceiveProps (newProps)
  {
    this.setState ({tags: newProps.tags});
  }

  handleSelect (name) {

    var active = this.state.active;

    // TODO: If in "add" mode, pass up the value, remove it from
    // this.state.tags, and "request" another tag to add to this.state.tags.
    if (this.props.mode == 'add') {
      this.props.onSelectTag (name);


    }
    else {
      if (typeof active != 'undefined' && active.includes (name)) {
        active.splice (active.indexOf (name), 1);
      }
      else {
        active.push (name);
      }
      this.setState ({active: active});

      // TODO: Selection logic here.
      // (Note that "this.state.active" is an array of tags.)
    }
  }

  onTagLayout (width, height, name) {
    if (!this.props.onTagLayout) { return; }
    this.props.onTagLayout (width, height, name);
  }

  createTag (tag) {
    return (
      <View style={styles.item} >
        <Tag name={tag}
             active={typeof this.state.active == 'undefined' ? null : this.state.active.includes(tag)}
             toggleFormState={newState => this.handleSelect(newState)}
             onTagLayout={(width, height, name) => this.onTagLayout (width, height, name)}
             size={'small'}>
          {tag}
        </Tag>
      </View>
    )
  }

  render () {
    const {
      tags,
      active,
      onSelectTag,
      onTagLayout,
      mode,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={layoutStyles}>
          {this.state.tags.map (tag => this.createTag (tag))}
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
    paddingVertical: PADDING_VERTICAL,
  },
  item: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
});
