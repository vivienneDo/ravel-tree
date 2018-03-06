import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux'

import firebase from 'firebase';

import Loader from './Loader';

import StatusBar from './components/StatusBar'
import NavBar from './components/NavBar'

//import Navigation from './Navigation';

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
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Authentication state has changed');
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    });
  }

  showScreen () {
    switch (this.props.activeScreen) {
      case ('Login'):
        return <Login {...this.props} />;
      case ('LoginEmail'):
        return <LoginEmail {...this.props} />;
      case ('TermsAndPrivacy'):
        return <TermsAndPrivacy {...this.props} />;
      default:
        return <Login {...this.props} />;
    }

    // switch (false) { //switch (this.state.loggedIn) {
    //   case true:
    //     return <Home />;
    //   case false:
    //     return <Test screen={'Explore'} />;
    //     //return <Login />;
    //   default:
    //     return <Loader size="large"/>;
    // }
  }

  showNavBar () {
    if (this.state.loggedIn)
    return (
      <View style={styles.navBar}>
        <NavBar />
      </View>
    );
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

function mapStateToProps (state) {
  return {
    activeScreen: state.activeScreen
  };
}

export default connect (mapStateToProps)(Screen);
