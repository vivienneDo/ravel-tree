// Change Log
// 03/03/18 VD Do - Added backend imports, added combined reducers, moved firebase db credential to actions/index.js

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import StatusBar from './components/StatusBar'
// import NavBar from './components/NavBar'
// import Login from './screens/Login';
// import Loader from './Loader';
// import MainPage from './screens/MainPage';
// import Test from './screens/Test';
//
// import Messages from './screens/Messages';
// import MessageThread from './screens/MessageThread';
// import Notifications from './screens/Notifications';
// import TermsAndPrivacy from './screens/TermsAndPrivacy';
// import YourRavels from './screens/YourRavels';
// import Profile from './screens/Profile';
// import StartARavel from './screens/StartARavel'
// import AddTags from './screens/AddTags'
// import InviteParticipants from './screens/InviteParticipants'
// import Splash from './screens/Splash'
// import LoginEmail from './screens/LoginEmail'
// import Home from './screens/Home'
// import Explore from './screens/Explore'
// import Ravel from './screens/Ravel'

// Backend imports
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { connect } from 'react-redux';
import rootReducer from './reducers/index';

import AppContainer from './AppContainer';

const store = createStore (
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(Thunk)
);

export default class App extends Component {

  state = { loggedIn: null};

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

  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  };
}
