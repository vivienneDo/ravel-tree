import * as types from './types'

/**
 * @param: User object
 * @returns: nothing
 * actions: Sets the current user.
 *
 */
export const setUser = (user) => {
  return (dispatch) => {
    console.log ("Active user set to " + user);
    dispatch ({
      type: types.SET_USER,
      user,
    });
  };
}
