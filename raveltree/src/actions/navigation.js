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
