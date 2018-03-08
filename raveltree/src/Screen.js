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
import Messages from './screens/Messages';
import MessageThread from './screens/MessageThread';
import Notifications from './screens/Notifications';
import TermsAndPrivacy from './screens/TermsAndPrivacy';
import YourRavels from './screens/YourRavels';
import Profile from './screens/Profile';
import StartARavel from './screens/StartARavel'
import AddTags from './screens/AddTags'
import InviteParticipants from './screens/InviteParticipants'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Explore from './screens/Explore'
import Ravel from './screens/Ravel'


class Screen extends Component {
  constructor (props: any, context: any) {
    super (props, context);
    this.state = {loggedIn: null};
    this.props.setShowNavBar (false);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Authentication state has changed: ' + (user ? 'True' : 'False'));
      if (user) {
        this.setState ({loggedIn: true})
      } else {
        this.setState ({loggedIn: false})
      }
    });
  }

  showScreen () {
    //return <Home {...this.props} />;
    switch (this.props.activeScreen) {
      case ('Login'):
        return <Login {...this.props} />;
      case ('LoginEmail'):
        return <LoginEmail {...this.props} />;
      case ('TermsAndPrivacy'):
        return <TermsAndPrivacy {...this.props} />;
      case ('Home'):
        return <Home {...this.props} />;
      case ('YourRavels'):
        return <YourRavels {...this.props} />;
      case ('Messages'):
        return <Messages {...this.props} />;
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

      default:
        return <Login {...this.props} />;
    }
  }

  showNavBar () {
    if (this.props.showNavBar) {
      return (
        <View style={styles.navBar}>
          <NavBar {...this.props} />
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
