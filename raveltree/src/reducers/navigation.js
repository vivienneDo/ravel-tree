import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const activeScreen = createReducer ('Login', {
  [types.SET_ACTIVE_SCREEN] (state, action) {
    return action.screen;
  }
});

export const previousScreen = createReducer ('Login', {
  [types.SET_PREVIOUS_SCREEN] (state, action) {
    return action.screen;
  }
});

export const showNavBar = createReducer (false, {
  [types.SET_SHOW_NAVBAR] (state, action) {
    return action.showNavBar;
  }
});

export const activeTab = createReducer ('home', {
  [types.SET_NAVBAR_TAB] (state, action) {
    return action.tab;
  }
});
