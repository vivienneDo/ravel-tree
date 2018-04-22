import * as types from './types'

/**
 * @param: Next screen, Screen-related data to pass
 * @returns:
 *  mapStateToProps:
 *    state.activeScreen
 *    state.screenData
 * actions: Sets the active screen.
 *
 */
export const setActiveScreen = (screen, screenData) => {
  return (dispatch) => {
    console.log ("Active screen set to " + screen);
    dispatch ({
      type: types.SET_ACTIVE_SCREEN,
      screen,
      screenData,
    });
    dispatch ({
      type: types.RESET_STATE_PASSAGE,
    });
    dispatch ({
      type: types.RESET_STATE_CURRENT_USER_RAVEL_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_REPORT,
    });
    dispatch ({
      type: types.RESET_STATE_ADMIN,
    });
    dispatch ({
      type: types.RESET_STATE_USER,
    });
    dispatch ({
      type: types.RESET_STATE_SEARCH,
    });
    dispatch ({
      type: types.RESET_STATE_RAVEL,
    });
    dispatch ({
      type: types.RESET_STATE_NOTIFICATION,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_USER_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_RAVEL,
    });
  };
}

/**
 * @param: Current active screen
 * @returns:
 *  mapStateToProps:
 *    state.previousScreens
 * actions: Adds the current screen to the array of previous screens.
 *
 */
export const setPreviousScreen = (screen) => {
 return (dispatch) => {
   console.log ("Previous screen set to " + screen);
   dispatch ({
     type: types.SET_PREVIOUS_SCREEN,
     screen
   });
 };
}

/**
 * @param: nothing
 * @returns:
 *  mapStateToProps:
 *    state.previousScreens
 * actions: Resets the array of previous screens to its initial state.
 *
 */
export const resetPreviousScreens = () => {
 return (dispatch) => {
   console.log ("Resetting previous screens.");
   dispatch ({
     type: types.RESET_PREVIOUS_SCREENS,
   });
 };
}

/**
 * @param: Next screen, Current screen, Screen-related data to pass
 * @returns:
 *  mapStateToProps:
 *    state.previousScreens
 *    state.activeScreen
 *    state.screenData
 * actions: Navigates to the specified screen, adding the current screen to the
 *          array of previous screens.
 *
 */
export const navigateForward = (next, current, screenData) => {
  return (dispatch) => {
    console.log ("Navigating forward...");
    dispatch ({
      type: types.NAVIGATE_FORWARD,
      next,
      current,
      screenData
    });
    dispatch ({
      type: types.RESET_STATE_PASSAGE,
    });
    dispatch ({
      type: types.RESET_STATE_CURRENT_USER_RAVEL_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_REPORT,
    });
    dispatch ({
      type: types.RESET_STATE_ADMIN,
    });
    dispatch ({
      type: types.RESET_STATE_USER,
    });
    dispatch ({
      type: types.RESET_STATE_SEARCH,
    });
    dispatch ({
      type: types.RESET_STATE_RAVEL,
    });
    dispatch ({
      type: types.RESET_STATE_NOTIFICATION,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_USER_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_RAVEL,
    });
  }
}

/**
 * @param: nothing
 * @returns:
 *  mapStateToProps:
 *    state.previousScreens
 *    state.activeScreen
 * actions: Navigates to the most recent previous screen.
 *
 */
export const navigateBack = () => {
  return (dispatch) => {
    console.log ("Navigating back...");
    dispatch ({
      type: types.NAVIGATE_BACK,
    });
    dispatch ({
      type: types.RESET_STATE_PASSAGE,
    });
    dispatch ({
      type: types.RESET_STATE_CURRENT_USER_RAVEL_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_REPORT,
    });
    dispatch ({
      type: types.RESET_STATE_ADMIN,
    });
    dispatch ({
      type: types.RESET_STATE_USER,
    });
    dispatch ({
      type: types.RESET_STATE_SEARCH,
    });
    dispatch ({
      type: types.RESET_STATE_RAVEL,
    });
    dispatch ({
      type: types.RESET_STATE_NOTIFICATION,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_USER_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_RAVEL,
    });
  }
}


/**
 * @param: Current screen, Screen-related data to pass
 * @returns:
 *  mapStateToProps:
 * actions: "Refreshes" the specified screen by navigating away and back.
 *
 */
export const refresh = (current, screenData) => {
  return (dispatch) => {
    console.log ("Refreshing screen...");
    const screen = 'Refresh';
    if (!screenData) { screenData = new Object; }
    screenData._targetScreen = current;
    console.log ('Target screen: ' + screenData._targetScreen);
    dispatch ({
      type: types.SET_ACTIVE_SCREEN,
      screen,
      screenData,
    });
    dispatch ({
      type: types.RESET_STATE_PASSAGE,
    });
    dispatch ({
      type: types.RESET_STATE_CURRENT_USER_RAVEL_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_REPORT,
    });
    dispatch ({
      type: types.RESET_STATE_ADMIN,
    });
    dispatch ({
      type: types.RESET_STATE_USER,
    });
    dispatch ({
      type: types.RESET_STATE_SEARCH,
    });
    dispatch ({
      type: types.RESET_STATE_RAVEL,
    });
    dispatch ({
      type: types.RESET_STATE_NOTIFICATION,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_USER_FETCH,
    });
    dispatch ({
      type: types.RESET_STATE_MASTER_RAVEL,
    });
  }
}


/**
 * @param: Whether to show the NavBar
 * @returns:
 *  mapStateToProps:
 *    state.showNavBar
 * actions: Sets whether to show the NavBar.
 *
 */
export const setShowNavBar = (showNavBar) => {
  return (dispatch) => {
    console.log ("NavBar is " + (showNavBar ? '' : 'not ') + "shown.");
    dispatch ({
      type: types.SET_SHOW_NAVBAR,
      showNavBar
    });
  };
}

/**
 * @param: NavBar tab to show
 * @returns:
 *  mapStateToProps:
 *    state.activeTab
 * actions: Sets the active NavBar tab.
 *
 */
export const setNavBarTab = (tab) => {
  return (dispatch) => {
    console.log ("Active NavBar tab set to " + tab);
    dispatch ({
      type: types.SET_NAVBAR_TAB,
      tab
    });
  };
}

/**
 * @param: Whether the Profile screen being viewed is owned by the user.
 * @returns:
 *  mapStateToProps:
 *    state.profileIsOwned
 * actions: Sets whether the Profile screen being viewed is owned by the user.
 *
 */
export const setProfileIsOwned = (isOwned) => {
  return (dispatch) => {
    console.log ("Profile Is Owned: " + isOwned);
    dispatch ({
      type: types.SET_PROFILE_IS_OWNED,
      isOwned
    });
  };
}
