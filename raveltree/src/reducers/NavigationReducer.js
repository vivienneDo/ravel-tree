import * as types from '../actions/types'

const initialState = {
  activeScreen: 'Login',
  screenData: {},
  previousScreens: ['Home'],
  showNavBar: false,
  activeTab: 'home',
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.screen,
        screenData: action.screenData,
      };

    case types.SET_PREVIOUS_SCREEN:
      var previousScreens = state.previousScreens;
      previousScreens.push (action.screen);
      return {
        ...state,
        previousScreens: previousScreens,
      };

    case types.NAVIGATE_FORWARD:
      var previousScreens = state.previousScreens;
      previousScreens.push (action.current);
      //console.dir (action.screenData);
      return {
        ...state,
        previousScreens: previousScreens,
        activeScreen: action.next,
        screenData: action.screenData,
      }

    case types.NAVIGATE_BACK:
      var previousScreens = state.previousScreens;
      var previousScreen = previousScreens.pop ();
    //  console.dir (state.screenData);
      return {
        ...state,
        previousScreens: previousScreens,
        activeScreen: previousScreen,
      }

    case types.SET_SHOW_NAVBAR:
      return {
        ...state,
        showNavBar: action.showNavBar,
      };

    case types.SET_NAVBAR_TAB:
      return {
        ...state,
        activeTab: action.tab,
      };

    default:
      return state;
  }
}