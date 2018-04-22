// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/07/18
// Modified:  04/13/18
// - 04/21/18 - VD Do - changed width percentage, enabled notificatin tab 
// Navigation bar component for RavelTree.
//
// Relies on assets:
//    ./img/home.png  (and ./img/home-active.png)
//        Image credit: Designed by Icomoon from Flaticon
//        https://www.flaticon.com/authors/icomoon
//        Used under CC BY 3.0
//        https://creativecommons.org/licenses/by/3.0/
//    ./img/book.png  (and ./img/book-active.png)
//        Image credit: Designed by Freepik from Flaticon
//        Used under FlatIcon's "FREE LICENSE (WITH ATTRIBUTION)"
//        https://file000.flaticon.com/downloads/license/license.pdf
//    ./img/envelope.png  (and ./img/envelope-active.png)
//        Image credit: Designed by Yannick from Flaticon
//        https://www.flaticon.com/authors/yannick
//        Used under CC BY 3.0
//        https://creativecommons.org/licenses/by/3.0/
//    ./img/bell.png  (and ./img/envelope-active.png)
//        Image credit: Designed by Freepik from Flaticon
//        Used under FlatIcon's "FREE LICENSE (WITH ATTRIBUTION)"
//        https://file000.flaticon.com/downloads/license/license.pdf

'use strict';

const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const AppRegistry = require('AppRegistry');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const View = require('View');
const Text = require('Text');
const Image = require('Image');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableOpacity = require('TouchableOpacity');

import { connect } from 'react-redux'
import _ from 'lodash';

import Divider from './Divider'
import UserImage from './UserImage'

const HEIGHT = 50;

var windowHeight;
var notifications = 0;

class NavBar extends React.Component {

  constructor (props) {
    super (props);
  }

  componentWillMount () {

    this.props.getUnreadNotificationsForUid(this.props.getCurrentLoggedInUserUid());
  }
  componentWillReceiveProps (newProps) {
    // if (newProps.currentUserProfile) {
    //
    // }
  }

  handleSelect (selected) {
    if (this.props.activeTab != selected) {
      //this.props.setNavBarTab (selected);

      if (selected == 'Profile') {
        this.props.setProfileIsOwned (true);
        var screenData = Object.assign ({}, {isOwned: true, userID: this.props.currentUserProfile.user_uid});
        this.props.setActiveScreen (selected, screenData);
      }
      else {
        this.props.setActiveScreen (selected);
      }
    }
    else if (this.props.activeTab == 'Profile') {
      var screenData = Object.assign ({}, {isOwned: true, userID: this.props.currentUserProfile.user_uid});
      //this.props.setNavBarTab ('Profile');
      this.props.setActiveScreen (selected, screenData);
    }
  }

  render () {
    const {
      activeTab,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    console.log (this.props.activeScreen);

    const tabs = ['Home', 'YourRavels', 'Messages', 'Notifications', 'Profile'];
    if (!tabs.includes(this.props.activeScreen)) {
      this.props.setNavBarTab (null);
    }
    else if (this.props.activeScreen == 'Profile') {
      if (this.props.profileIsOwned) {
         this.props.setNavBarTab ('Profile');
      }
      else {
        this.props.setNavBarTab (null);
      }
    }
    else {
      this.props.setNavBarTab (this.props.activeScreen);
    }

    var messageCount = 3;       // TODO: Retrieve from Firebase.
    //var notificationCount = 7;  // TODO: Retrieve from Firebase.

    return (
      <View>
        <Divider />
        <View style={layoutStyles}>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('Home')}>
            <View style={styles.menuItemInner}>
              <Image
                source = {this.props.activeTab == 'Home' ? require('./img/home-active.png') : require('./img/home.png')}
                style = {styles.image}
              />
              <Text style = {[styles.text, this.props.activeTab == 'Home' ? styles.active : styles.inactive]}>
                Home
              </Text>
            </View>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('YourRavels')}>
            <View style={styles.menuItemInner}>
              <Image
                source = {this.props.activeTab == 'YourRavels' ? require('./img/book-active.png') : require('./img/book.png')}
                style = {styles.image}
              />
              <Text style = {[styles.text, this.props.activeTab == 'YourRavels' ? styles.active : styles.inactive]}>
                Your Ravels
              </Text>
            </View>
          </Touchable>
          {/*<Touchable style={styles.menuItem} onPress={() => this.handleSelect ('Messages')}>
            <View style={styles.menuItemInner}>
              <View>
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>{messageCount}</Text>
                </View>
                <Image
                  source = {this.props.activeTab == 'Messages' ? require('./img/envelope-active.png') : require('./img/envelope.png')}
                  style = {styles.image}
                />
              </View>
              <Text style = {[styles.text, this.props.activeTab == 'Messages' ? styles.active : styles.inactive]}>
                Messages
              </Text>
            </View>
          </Touchable>*/}
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('Notifications')}>
            <View style={styles.menuItemInner}>
              <View>
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>{this.props.notificationCount}</Text>
                </View>
                <Image
                  source = {this.props.activeTab == 'Notifications' ? require('./img/bell-active.png') : require('./img/bell.png')}
                  style = {styles.image}
                />
              </View>
              <Text style = {[styles.text, this.props.activeTab == 'Notifications' ? styles.active : styles.inactive]}>
                Notifications
              </Text>
            </View>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('Profile')}>
            <View style={styles.menuItemInner}>
              <UserImage {...this.props} userID={(this.props.currentUserProfile || {}).user_uid} size={30} active={this.props.activeTab === 'Profile'} disabled />
              <Text style = {[styles.text, this.props.activeTab === 'Profile' ? styles.active : styles.inactive]}>
                Profile
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  layout: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 3,
  },
  menuItem: {
    width: '25%',
    // width: '33.33333333%',
    //height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    zIndex: 0,
    height: 30,
    width: 30,
  },
  text: {
    zIndex: 0,
    fontSize: 10,
    fontFamily: 'Roboto',
    color: '#95989A',
  },
  active: {
    color: '#2E8AF7',
  },
  inactive: {
    color: '#95989A',
  },
  notification: {
    zIndex: 10,
    position: 'absolute',
    top: -4,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#95989A',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  const {
    activeTab,
    activeScreen,
    previousScreen,
    showNavBar,
    profileIsOwned,
  } = state.navigation;

  const {
    notificationCount
  } = state.notification; 

  const {
    currentUserProfile,
  } = state.current_user;

  console.log(state)

  return {
    activeTab,
    activeScreen,
    previousScreen,
    showNavBar,
    profileIsOwned,
    currentUserProfile,
    notificationCount,
  };


}


export default connect (mapStateToProps)(NavBar);
