// Author:   Alex Aguirre
// Created:  02/05/18
// Modified: 03/09/18 by Frank Fusco (fr@nkfus.co)
//
// "Ravel Card" component for RavelTree.
//
// TODO: Make entire card link to content.
// TODO: Truncate concept text?

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';
import * as actions from '../actions';

import UserImage from './UserImage'
import TextSerif from './TextSerif'
import TextSans from './TextSans'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

class RavelCard extends Component<{}> {
  constructor (props, context) {
    super (props, context);
  }

  onPressCard () {
    var screenData = Object.assign ({}, {ravelID: this.props.ravelID});
    this.props.navigateForward ('Ravel', this.constructor.name, screenData);
  }

  render() {
    const {
      ravel,
      ravelID,
      author,
      users,
      score,
      concept,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable onPress={() => this.onPressCard ()} style = {styles.container}>
        <View style={styles.head}>
          <View style={styles.left}>
            <View style={styles.userImage}>
              <UserImage {...this.props} size={26} />
            </View>
            <TextSerif size={16}>{this.props.ravel}</TextSerif>
          </View>
          <View style={styles.right}>
            <View style={styles.users}>
              <View style={styles.hpad}>
                <IconUser size={20} />
              </View>
              <View style={styles.hpad}>
                <TextSerif size={16}>{this.props.users}</TextSerif>
              </View>
            </View>
            <View style={styles.score}>
              <View style={styles.hpad}>
                <IconLeaf size={20} />
              </View>
              <View style={styles.hpad}>
                <TextSerif size={16}>{this.props.score}</TextSerif>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.concept}>
          <TextSans size={16} color={'#7F7F7F'}>{this.props.concept}</TextSans>
        </View>
      </Touchable>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      borderColor: '#8D8D8D',
      borderWidth: 1,
      borderRadius: 20,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 17,
    },
    head: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 2,
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      marginRight: 7,
    },
    users: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 6,
    },
    score: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    hpad :{
      paddingHorizontal: 2,
    },
});

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
  };
}

export default connect (mapStateToProps)(RavelCard);
