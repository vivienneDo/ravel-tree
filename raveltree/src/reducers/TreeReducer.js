import * as types from '../actions/types'

const initialState = {
  shouldReloadTree: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_SHOULD_RELOAD_TREE:
      return {
        ...state,
        shouldReloadTree: true,
      };

    default:
      return state;

  }
}
