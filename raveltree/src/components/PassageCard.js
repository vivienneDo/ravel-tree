// Author:    Alex Aguirre
// Created:   02/5/18
// Modified:  03/09/18 by Frank Fusco (fr@nkfus.co)

// Standard passage card component for RavelTree.
//
// TODO: Ellipsis modal menu.
// TODO: Truncate text (8 lines?)
// TODO: Limit voting power to 1 per user per passage.
// TODO: navigateToRavel () and navigateToPassage (): Replace
//       this.constructor.name with the name of the parent screen. Will have to
//       retrieve this through props.

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

import { connect } from 'react-redux'
import _ from 'lodash';

import TextSerif from './TextSerif'
import TextSans from './TextSans'
import UserImage from './UserImage'
import VoteBar from './VoteBar'


class PassageCard extends React.Component {
  constructor (props, context) {
    super (props, context);
  }

  onPressRavel () {
    this.navigateToRavel (this.props.ravelID);
  }

  onPressPassageID () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  onPressTitle () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  onPressPassage () {
    this.navigateToPassage (this.props.ravelID, this.props.passageID);
  }

  navigateToRavel (id) {
    var screenData = Object.assign ({}, {ravelID: id});
    this.props.navigateForward ('Ravel', this.constructor.name, screenData);
  }

  navigateToPassage (ravelID, passageID) {
    var screenData = Object.assign ({}, {ravelID: ravelID, passageID: passageID, showModal: 'PassagePopup'});
    this.props.navigateForward ('Ravel', this.constructor.name, screenData);
  }

  onPressEllipsis () {
    // TODO: Modal options menu ("Share," etc.)
  }

  render () {
    const {
      ravel,
      ravelID,
      passageIndex,
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
            <Touchable onPress={() => this.onPressRavel ()}>
              <TextSerif size={16}>{this.props.ravel}</TextSerif>
            </Touchable>
            <Touchable onPress={() => this.onPressPassageID ()}>
              <TextSans size={13} color={'#95989A'}>{this.props.passageIndex}</TextSans>
            </Touchable>
          </View>
          <View style={styles.row2}>
            <Touchable onPress={() => this.onPressTitle ()}>
              <TextSans size={13} color={'#95989A'}>{this.props.title}</TextSans>
            </Touchable>
            <UserImage {...this.props} size={26}/>
          </View>
        </View>
        <Touchable onPress={() => this.onPressPassage ()} style={styles.passage}>
          <TextSerif>
            {this.props.passage}
          </TextSerif>
        </Touchable>
        <View style={styles.buttons}>
          <Touchable onPress={() => this.onPressEllipsis ()}>
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
    width: '100%',
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
  passageIndex: {
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

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreens,
  } = state.navigation;

  return {
    activeScreen,
    previousScreens,
  };
}

export default connect (mapStateToProps)(PassageCard);
