// Author:    Frank Fusco (fr@nkfus.co)
// Created:   02/07/18
// Modified:  03/06/18

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

class NavBar extends React.Component {

  constructor (props) {
    super (props);
  }

  handleSelect (selected) {
    if (this.props.activeTab != selected) {
      this.props.setNavBarTab (selected);

      // TODO: Navigation logic here.
      var tab;
      switch (selected) {
        case ('home'):          tab = 'Home';           break;
        case ('your-ravels'):   tab = 'YourRavels';     break;
        case ('messages'):      tab = 'Messages';       break;
        case ('notifications'): tab = 'Notifications';  break;
        case ('profile'):       tab = 'Profile';        break;
        default:                tab = 'Home';           break;
      }
      this.props.setActiveScreen (tab);
    }
  }

  render () {
    const {
      activeTab,
    } = this.props;

    const layoutStyles = [styles.layout];

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const tabs = ['Home', 'YourRavels', 'Messages', 'Notifications', 'Profile'];
    if (!tabs.includes(this.props.activeScreen)) {
      this.props.setNavBarTab (null);
    }

    var messageCount = 3;       // TODO: Retrieve from Firebase.
    var notificationCount = 7;  // TODO: Retrieve from Firebase.

    return (
      <View>
        <Divider />
        <View style={layoutStyles}>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('home')}>
            <Image
              source = {this.props.activeTab == 'home' ? require('./img/home-active.png') : require('./img/home.png')}
              style = {styles.image}
            />
            <Text style = {[styles.text, this.props.activeTab == 'home' ? styles.active : styles.inactive]}>
              Home
            </Text>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('your-ravels')}>
            <Image
              source = {this.props.activeTab == 'your-ravels' ? require('./img/book-active.png') : require('./img/book.png')}
              style = {styles.image}
            />
            <Text style = {[styles.text, this.props.activeTab == 'your-ravels' ? styles.active : styles.inactive]}>
              Your Ravels
            </Text>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('messages')}>
              <View>
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>{messageCount}</Text>
                </View>
                <Image
                  source = {this.props.activeTab == 'messages' ? require('./img/envelope-active.png') : require('./img/envelope.png')}
                  style = {styles.image}
                />
              </View>
              <Text style = {[styles.text, this.props.activeTab == 'messages' ? styles.active : styles.inactive]}>
                Messages
              </Text>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('notifications')}>
            <View>
              <View style={styles.notification}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
              <Image
                source = {this.props.activeTab == 'notifications' ? require('./img/bell-active.png') : require('./img/bell.png')}
                style = {styles.image}
              />
            </View>
            <Text style = {[styles.text, this.props.activeTab == 'notifications' ? styles.active : styles.inactive]}>
              Notifications
            </Text>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={() => this.handleSelect ('profile')}>
            <UserImage size={30} active={this.props.activeTab === 'profile'} disabled />
            <Text style = {[styles.text, this.props.activeTab === 'profile' ? styles.active : styles.inactive]}>
              Profile
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  menuItem: {
    width: '20%',
    //height: '100%',
    flexDirection: 'column',
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

function mapStateToProps (state) {
  return {
    activeTab: state.activeTab,
    activeScreen: state.activeScreen,
    previousScreen: state.previousScreen,
    showNavBar: state.showNavBar,
  };
}

export default connect (mapStateToProps)(NavBar);
