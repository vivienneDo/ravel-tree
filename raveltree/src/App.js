// Change Log
// 03/03/18 VD - Added backend imports, added combined reducers, moved firebase db credential to actions/index.js
// 03/05/18 FF - Moved maps and navigation switch to AppContainer and Screen screens, respectively.
// 03/06/18 FF - Moved Firebase authentication to Screen screen.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Backend imports
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
//import { connect } from 'react-redux';
import rootReducer from './reducers/index';

import AppContainer from './AppContainer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (rootReducer, composeEnhancers (applyMiddleware (Thunk)));

export default class App extends Component {

  render () {

    // TEMP: Remove for testing and production.
    // Temporarlity hide specified warnings.
    console.ignoredYellowBox = [
      'Warning: Cannot update during',
      'FIREBASE WARNING: Using',
      'Remote debugger',
    ];

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  };
}
