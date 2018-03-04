import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import StatusBar from './components/StatusBar'
import NavBar from './components/NavBar'
import Login from './screens/Login';
import Loader from './Loader';
import MainPage from './screens/MainPage';
import Test from './screens/Test';

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
import LoginEmail from './screens/LoginEmail'
import Home from './screens/Home'
import Explore from './screens/Explore'
import Ravel from './screens/Ravel'

// Backend imports
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { connect } from 'react-redux';
import rootReducer from './reducers/index';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));
export default class App extends Component {

  state = { loggedIn: null};

  componentWillMount() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyCmt6Cq6wj2NJZ-WOCE27brxfW-kg6TUKQ",
    //   authDomain: "crmlinkedln2-81204.firebaseapp.com",
    //   databaseURL: "https://crmlinkedln2-81204.firebaseio.com",
    //   projectId: "crmlinkedln2-81204",
    //   storageBucket: "crmlinkedln2-81204.appspot.com",
    //   messagingSenderId: "107870538404"
    // });

    firebase.auth().onAuthStateChanged((user) => {
      console.log('Authentication state has changed');
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    });
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        console.log('Showing main page');
        return <Login />;
      case false:
        return <Test screen={'Ravel'} />;
        //return <Login />;
      default:
        return <Loader size="large"/>;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.layout}>
          <StatusBar />
          <View style={styles.content}>
            {this.renderInitialView()}
          </View>
          <View style={styles.navBar}>
            <NavBar />
          </View>
        </View>
      </Provider>
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
