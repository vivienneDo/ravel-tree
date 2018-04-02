// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/27/18
// Modified: 03/28/18
//
// "Passage Stub" component for RavelTree.
//
// TODO: Truncate text at reasonable character count.
// TODO: Make a PassageDot component to represent the collapsed version.

NODE_WIDTH = 250;

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import UserImage from './UserImage'
import TextSerif from './TextSerif'
import ButtonPlus from './ButtonPlus'
import TextSans from './TextSans'
import IconLeaf from './IconLeaf'

class PassageStub extends Component<{}> {
  constructor (props, context) {
    super (props, context);
  }

  onPressStub () {
    this.props.onPress ();
  }

  showPlus (show) {
    if (!show) {return}
    return (
      <ButtonPlus size={26} onPress={() => this.props.onPressAdd ()}/>
    );
  }

  render() {
    const {
      name,
      author,
      passageIndex,
      passageID,
      score,
      active,
      disabled,
      highlighted,
      showAddButton,
      testID,
    } = this.props;

    var containerStyles = [
      styles.container,
      disabled ? {borderColor: '#dddddd'} : undefined,
      active ? {borderColor: '#2E8AF7'} : undefined,
      highlighted ? {backgroundColor: '#dddddd'} : undefined,
    ];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View style={styles.wrapper}>
        <Touchable disabled={disabled} onPress={() => this.onPressStub ()} style={containerStyles}>
          <View style={styles.left}>
            <View style={styles.userImage}>
              <UserImage {...this.props} userID={author} size={26} />
            </View>
            <TextSans size={12} color={disabled ? '#95989A' : '#282828'}>{this.props.name}</TextSans>
          </View>
          <View style={styles.right}>
            <View style={styles.passageIndex}>
              <TextSans size={13} color={'#95989A'}>{passageIndex}</TextSans>
            </View>
            <View style={styles.score}>
              <IconLeaf />
              <View style={styles.scoreText}>
                <TextSerif size={16} color={disabled ? '#95989A' : '#282828'}>{this.props.score}</TextSerif>
              </View>
            </View>
          </View>
        </Touchable>
        {this.showPlus (this.props.showAddButton)}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingRight: 6,
    width: NODE_WIDTH,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 15,
  },
  userImage: {
    marginRight: 7,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passageIndex: {
    marginRight: 8,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    paddingBottom: 4,
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

export default connect (mapStateToProps)(PassageStub);
