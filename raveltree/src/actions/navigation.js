import * as types from './types'

export function setActiveScreen (screen, screenData = {}) {
  console.log ("Active screen set to " + screen);
  return {
    type: types.SET_ACTIVE_SCREEN,
    screen,
    screenData
  }
}

export function setPreviousScreen (screen) {
  console.log ("Previous screen set to " + screen);
  return {
    type: types.SET_PREVIOUS_SCREEN,
    screen
  }
}

export function setShowNavBar (showNavBar) {
  console.log ("NavBar is " + (showNavBar ? '' : 'not ') + "shown.");
  return {
    type: types.SET_SHOW_NAVBAR,
    showNavBar
  }
}

export function setNavBarTab (tab) {
  console.log ("Active NavBar tab set to " + tab);
  return {
    type: types.SET_NAVBAR_TAB,
    tab
  }
}
