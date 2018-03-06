import createReducer from '../lib/createReducer'
import * as types from '../actions/types'



export const activeScreen = createReducer ('Login', {
  [types.SET_ACTIVE_SCREEN] (state, action) {
    console.log ("Test");
    return action.screen;

    //return ('LoginEmail');
  }
});

// export const activeScreen = createReducer ('Login', {
//   [types.SET_ACTIVE_SCREEN] (state, action) {
//     return ('LoginEmail');
//   }
// });

// export const count = createReducer (0, {
//   [types.ADD_COUNT] (state, action) {
//     console.log ('State: ' + state);
//     return (state + 1);
//   }
// });
