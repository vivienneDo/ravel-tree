// From https://redux.js.org/recipes/reducing-boilerplate
//
// A function that accepts an initial state and a series of handlers and returns
// a reducer function that will call that action type for that state and action.

export default function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty (action.type)) {
      return handlers [action.type] (state, action)
    } else {
      return state
    }
  }
}
