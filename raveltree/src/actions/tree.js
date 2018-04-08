import * as types from './types'

/**
 * @param: Whether the tree should be reloaded.
 * @returns:
 *  mapStateToProps:
 *    state.tree.shouldReloadTree
 * actions: Sets whether the tree should be reloaded.
 *
 */
export const setShouldReloadTree = (shouldReloadTree) => {
  return (dispatch) => {
    console.log ("shouldReloadTree set to " + shouldReloadTree);
    dispatch ({
      type: types.SET_SHOULD_RELOAD_TREE,
      shouldReloadTree,
    });
  };
}
