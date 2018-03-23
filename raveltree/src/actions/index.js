import firebase from 'firebase';
import _ from 'lodash';

import * as BackendActions from './backend';
import * as NavigationActions from './navigation';

firebase.initializeApp({
    apiKey: "AIzaSyCmt6Cq6wj2NJZ-WOCE27brxfW-kg6TUKQ",
    authDomain: "crmlinkedln2-81204.firebaseapp.com",
    databaseURL: "https://crmlinkedln2-81204.firebaseio.com",
    projectId: "crmlinkedln2-81204",
    storageBucket: "crmlinkedln2-81204.appspot.com",
    messagingSenderId: "107870538404"
  });

export const ActionCreators = Object.assign ({},
  BackendActions,
  NavigationActions,
);