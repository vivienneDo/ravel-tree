// Author:   Frank Fusco (fr@nkfus.co)
// Created:  02/17/18
// Modified: 03/09/18
//
// Notifications screen for RavelTree.
//
// Pass in a "notifications" array prop like so:
//
// <Notifications
//    notifications={[
//      {type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37},
//      {type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'}
//      {type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'}
//      {type: 'message', user: 'Clint Lane Clover'}
//      {type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'}
//    ]}
// />
//
// TODO: getNotifications (): Firebase retrieval.

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import _ from 'lodash';

import RTLogoText from '../components/RTLogoText'
import TextHeader from '../components/TextHeader'
import NotificationCard from '../components/NotificationCard'

const TEST_NOTIFICATIONS = [
  {type: 'upvoted', passage: 'Something Frozen This Way Comes', upvotes: 37},
  {type: 'invitationAccepted', user: 'Adam Jesper', passage: 'Shakespeare on Ice'},
  {type: 'newParticipant', user: 'Clint Lane Clover', passage: 'Shakespeare on Ice'},
  {type: 'message', user: 'Clint Lane Clover'},
  {type: 'invitation', user: 'Brad Hooper', passage: 'Endless Smirk'},
];

class Notifications extends Component {
  constructor (props) {
    super (props);
  }

  getNotifications () {

    // TODO: Firebase retrieval.
    

    return (
      <View>
        {TEST_NOTIFICATIONS.map ((notification) =>
          <View key={Object.values (notification)} style={styles.notification}>
            <NotificationCard
               notification={notification}
               active
               {...this.props}
            />
          </View>
        )}
      </View>
    )
  }

  render (){
    const {
      notifications,
      testID,
    } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.logo}>
          <RTLogoText />
        </View>
        <View style={styles.header}>
          <TextHeader>Notifications</TextHeader>
        </View>
        <ScrollView contentContainerStyle={styles.notifications}>
          {this.getNotifications ()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    paddingHorizontal: 17,
  },
  logo: {
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
  },
  notifications: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  notification: {
    width: '100%',
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  const {
    screenData,
  } = state.navigation;
a
  return {
    screenData, numOfNotifs,
  };
}

export default connect (mapStateToProps)(Notifications);
