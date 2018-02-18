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

import Tags from './Tags/Tags'

export default class TagCloud extends React.Component {

  constructor (props) {
    super (props);
    this.state = {active: this.props.active};
  }

  handleSelect (name) {
    var active = this.state.active;

    if (active.includes (name)) {
      active.splice (active.indexOf (name), 1);
    }
    else {
      active.push (name);
    }
    this.setState ({active: active});

    // TODO: Selection logic here.
    // (Note that "this.state.active" is an array of tags.)
  }

  createTag (tag) {
    return (
      <View style={styles.item} >
        <Tags name={tag}
             active={this.state.active.includes(tag)}
             toggleFormState={newState => this.handleSelect(newState)}
             size={'small'}>
          {tag}
        </Tags>
      </View>
    )
  }

  render () {
    const {
      active,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={layoutStyles}>
          {this.props.tags.map (tag => this.createTag (tag))}
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