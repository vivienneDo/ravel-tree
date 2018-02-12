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
import Login from './Login';
import Loader from './Loader';
import MainPage from './MainPage';
import RavelPage from './RavelPage';
//import Navigation from './Navigation';
<<<<<<< HEAD
import reducers from '../reducers/AllUserRavelReducer';
//import reducers from '../reducers/UserReducer';
=======
import rootReducer from '../reducers/index';
>>>>>>> file-picker
import Thunk from 'redux-thunk';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));
export default class App extends Component { 

  state = { loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCmt6Cq6wj2NJZ-WOCE27brxfW-kg6TUKQ",
      authDomain: "crmlinkedln2-81204.firebaseapp.com",
      databaseURL: "https://crmlinkedln2-81204.firebaseio.com",
      projectId: "crmlinkedln2-81204",
      storageBucket: "crmlinkedln2-81204.appspot.com",
      messagingSenderId: "107870538404"
    });

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
        return <MainPage />; 
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
