// WARNING!!!!! DO NOT MERGE THIS INTO DEV WHEN MERGING!!!!

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from '../src/screens/Login';
import Ravel from '../src/screens/Ravel';
import Profile from '../src/screens/Profile';
import StartARavel from '../src/screens/StartARavel';
import Loader from './Loader';
import LoginEmail from '../src/screens/LoginEmail'
//import MainPage from './MainPage';
//import RavelPage from './RavelPage';
import GetAllUserRavels from '../src/screens/GetAllUserRavels';
//import Navigation from './Navigation';
import rootReducer from '../src/reducers/index';
//import reducers from '../reducers/UserReducer';
import Thunk from 'redux-thunk';
import { connect } from 'react-redux';
//import ComponentTemplate from './ComponentTemplate';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));
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

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true: 
        return <GetAllUserRavels/>; 
      case false: 
        return <Login />; 
      default:
        return <Loader size="large"/>;
    }
  }

  render() {
    return (
      <Provider store={store}>
          {this.renderInitialView()}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
