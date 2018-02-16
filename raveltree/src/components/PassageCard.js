// Author:    Alex Aguirre
// Created:   02/5/18
// Modified:  02/15/18 by Frank Fusco (fr@nkfus.co)

// Standard passage card component for RavelTree.
//
// TODO: Make ravel, title, and ID touchable and link to respective content.
// TODO: Ellipsis modal menu.
// TODO: Truncate text (8 lines?)

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const Dimensions = require('Dimensions');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');

import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import VoteBar from './VoteBar'


export default class PassageCard extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {

    // Whether the container is active (will color the border)
    isActive: PropTypes.bool,

    // Used to locate this view in end-to-end tests.
    testID: PropTypes.string,
  };

  render () {
    const {
      ravel,
      passageID,
      title,
      passage,
      upvotes,
      downvotes,
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.row1}>
            <TextSerif size={16}>{this.props.ravel}</TextSerif>
            <TextSans size={13} color={'#95989A'}>{this.props.passageID}</TextSans>
          </View>
          <View style={styles.row2}>
            <TextSans size={13} color={'#95989A'}>{this.props.title}</TextSans>
            <UserImage size={26}/>
          </View>
        </View>
        <View style={styles.passage}>
          <TextSerif>
            {this.props.passage}
          </TextSerif>
        </View>
        <View style={styles.buttons}>
          <Touchable>
            <TextSans size={40} color={'#95989A'}>...</TextSans>
          </Touchable>
          <VoteBar upvotes={this.props.upvotes} downvotes={this.props.downvotes} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    borderColor: '#8D8D8D',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 17,
  },
  head: {
    // paddingLeft: 17,
    // paddingRight: 17,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passage: {
    marginTop: 6,
    //marginBottom: 20,
    // paddingLeft: 17,
    // paddingRight: 17,
  },
  passageID: {
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10,
    // paddingLeft: 21,
    // paddingRight: 21,
  },
});
