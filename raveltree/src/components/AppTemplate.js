// // imports for front-end testing 
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// // TODO: imports you must do in App.js
// import firebase from 'firebase';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import Thunk from 'redux-thunk';
// import { connect } from 'react-redux';
// import rootReducer from '../reducers/index';
// import Login from './Login'

// import GetAllUserRavels from './GetAllUserRavels'

// // TODO: Pass the rootReducer and applyMidleware(Thunk) into the store
// const store = createStore(rootReducer, applyMiddleware(Thunk));

// export default class AppTemplate extends Component { 

//     // TODO: front-end can handle auth() state change like this 
//     state = { loggedIn: null};

//     componentWillMount() {
//       firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           this.setState({loggedIn: true})
//         } else {
//           this.setState({loggedIn: false})
//         }
//       });
//     }

//   renderInitialView() {

//   }

//   // TODO: Pass the store as a prop 
//   render() {
//     return (
//       <Provider store = { store }>
//           {this.renderInitialView()}
//       </Provider>
//     );
//   }
// }

