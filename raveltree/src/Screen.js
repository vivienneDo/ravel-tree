/**
 * - 04/13/18 - VD Do - Added a listener when user if auth() to ban them if they exist in ban list 
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './actions';
import _ from 'lodash';

import firebase from 'firebase';

import Loader from './Loader';

import StatusBar from './components/StatusBar'
import NavBar from './components/NavBar'

import Test from './screens/Test';

import Login from './screens/Login';
import LoginEmail from './screens/LoginEmail'
import PasswordReset from './screens/PasswordReset'
import Messages from './screens/Messages';
import MessageThread from './screens/MessageThread';
import Notifications from './screens/Notifications';
import TermsAndPrivacy from './screens/TermsAndPrivacy';
import YourRavels from './screens/YourRavels';
import Profile from './screens/Profile';
import CreateProfile from './screens/CreateProfile';
import StartARavel from './screens/StartARavel'
import AddTags from './screens/AddTags'
import EditTags from './screens/EditTags'
import InviteParticipants from './screens/InviteParticipants'
import EditParticipants from './screens/EditParticipants'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Explore from './screens/Explore'
import Ravel from './screens/Ravel'
import Merge from './screens/Merge'
import Refresh from './screens/Refresh'
import GetAllUserRavels from './screens/GetAllUserRavels'

import GraphicsTest from './screens/GraphicsTest';

class Screen extends Component {
  constructor (props: any, context: any) {
    super (props, context);
    this.state = {
      loggedIn: null,
    };
    this.props.setShowNavBar (false);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Authentication state is: ' + (user ? 'True' : 'False'));      
      if (user) { 
        
        firebase.database().ref(`user_report_list/${user.uid}`).on('value', (snapshot) => {
          if(snapshot.exists() && snapshot.val() === true) {         
              alert(user.email + ': You have been removed due to a violation of RavelTrees terms of use')               
                firebase.auth().currentUser.delete().then(() => {
                  // Tab bar is still showing here though 
                  this.props.setActiveScreen ('Login'); 
                })
          }
        })

        this.props.getUnreadNotificationsForUid(user.uid);
  
        this.setState ({loggedIn: true})
      } else {
        this.setState ({loggedIn: false})
      }
    });
  }

  showScreen () {
    switch (this.props.activeScreen) {
      case ('Splash'):
        return <Splash {...this.props} />;
      case ('Login'):
        return <Login {...this.props} />;
      case ('LoginEmail'):
        return <LoginEmail {...this.props} />;
      case ('PasswordReset'):
        return <PasswordReset {...this.props} />;
      case ('TermsAndPrivacy'):
        return <TermsAndPrivacy {...this.props} />;
      case ('CreateProfile'):
        return <CreateProfile {...this.props} />;
      case ('Home'):
        return <Home {...this.props} />;
      case ('YourRavels'):
        return <YourRavels {...this.props} />;
      case ('Messages'):
        return <Messages {...this.props} />;
      case ('MessageThread'):
        return <MessageThread {...this.props} />;
      case ('Notifications'):
        return <Notifications {...this.props} />;
      case ('Profile'):
        return <Profile {...this.props} />;
      case ('Explore'):
        return <Explore {...this.props} />;
      case ('StartARavel'):
        return <StartARavel {...this.props} />;
      case ('AddTags'):
        return <AddTags {...this.props} />;
      case ('EditTags'):
        return <EditTags {...this.props} />;
      case ('InviteParticipants'):
        return <InviteParticipants {...this.props} />;
      case ('EditParticipants'):
        return <EditParticipants {...this.props} />;
      case ('Ravel'):
        return <Ravel {...this.props} />;
      case ('Merge'):
        return <Merge {...this.props} />;
      case ('Refresh'):
        return <Refresh {...this.props} />;
      case ('GetAllUserRavels'):
        return <GetAllUserRavels {...this.props} />;
      default:
        return <Login {...this.props} />;
    }
  }

  showNavBar () {
    if (this.props.showNavBar) {
      return (
        <View style={styles.navBar}>
          <NavBar {...this.props} /*profileIsOwned={this.state.profileIsOwned}*/ />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar />
        <View style={styles.content}>
          {this.showScreen ()}
        </View>
        {this.showNavBar ()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content :{
    flex: 1,
    width: "100%",
  },
  navBar: {
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  const {
    activeScreen,
    previousScreen,
    showNavBar,
  } = state.navigation;

  return {
    activeScreen,
    previousScreen,
    showNavBar,
  };
}

export default connect (mapStateToProps)(Screen);
