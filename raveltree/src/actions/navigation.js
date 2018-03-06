import * as types from './types'

export function setActiveScreen (screen) {
  return {
    type: types.SET_ACTIVE_SCREEN,
    screen
  }
}

export function addCount () {
  return {
    type: types.ADD_COUNT,
  }
}
