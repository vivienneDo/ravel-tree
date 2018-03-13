import * as types from '../actions/types'

const initialState = {
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
