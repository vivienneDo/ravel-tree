// Author:   Alex Aguirre
// Created:  02/03/18
// Modified: 03/27/18 by Frank Fusco (fr@nkfus.co)
//
// "Ravel Stub" component for RavelTree.
//
// TODO: Align users and ravel scores (so they appear in columns when stacked).

import React, {Component} from 'react';
import {
  AppRegistry,
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
import * as actions from '../actions';

import UserImage from './UserImage'
import TextSerif from './TextSerif'
import IconUser from './IconUser'
import IconLeaf from './IconLeaf'

class RavelStub extends Component<{}> {
  constructor (props) {
    super (props);
    this.state = {
      profile: [],
      ravelID: this.props.ravel.ravel_uid,
      ravelMetaData: this.props.ravel,
    };
    // Get user profile of author of ravel...
    //this.props.getRavelMetaData (this.props.ravelID);
  }

  // componentWillReceiveProps (newProps) {
  //   if (this.state.ravelMetaData.length == 0 && newProps.ravel_meta_data) {
  //     this.setState ({ ravelMetaData: newProps.ravel_meta_data });
  //     this.props.getUserProfile (newProps.ravel_meta_data.user_created);
  //   }
  //   if (this.state.profile.length == 0 && newProps.userProfile) {
  //     this.setState ({ profile: newProps.userProfile });
  //   }
  // }

  onPressStub () {
    var ravel = this.state.ravelMetaData;
    // var screenData = Object.assign ({}, {
    //   ravel_uid: this.state.ravelID,
    //   ravel_title: ravel.ravel_title,
    //   user_created: ravel.user_created,
    //   ravel_participants: ravel.ravel_participants,
    //   ravel_points: ravel.ravel_points,
    //   ravel_concept: ravel.ravel_concept,
    //   passageIndex: '',
    // });
    var screenData = Object.assign ({}, ravel);
    this.props.navigateForward ('Ravel', this.props.parentScreen, screenData);
  }

  render() {
    const {
      ravel,
      parentScreen,
      testID,
    } = this.props;

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable onPress={() => this.onPressStub ()} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <View style={styles.userImage}>
              <UserImage {...this.props} userID={ravel.user_created} photoURL={ravel.user_created_photoURL} size={26} />
            </View>
            <TextSerif size={16}>{ravel.ravel_title}</TextSerif>
          </View>
          <View style={styles.right}>
            <View style={styles.users}>
              <View style={styles.hpad}>
                <IconUser />
              </View>
              <View style={styles.hpad}>
                <TextSerif size={16}>{ravel.ravel_number_participants + 1}</TextSerif>
              </View>
            </View>
            <View style={styles.score}>
              <View style={styles.hpad}>
                <IconLeaf />
              </View>
              <View style={styles.hpad}>
                <TextSerif size={16}>{ravel.ravel_points}</TextSerif>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // paddingVertical: 5, <-- TODO: Check if necessary.
    //paddingHorizontal: 15, <-- TODO: Check if necessary.
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
  }
});

function mapStateToProps (state) {
  const {
    activeScreen,
  } = state.navigation;

  const {
    currentUserProfile,
  } = state.current_user;

  const {
    userProfile,
  } = state.user;

  const {
    ravel_meta_data,
  } = state.ravel;

  return {
    activeScreen,
    currentUserProfile,
    userProfile,
    ravel_meta_data,
  };
}

export default connect (mapStateToProps)(RavelStub);
