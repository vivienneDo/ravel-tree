import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
    ravel: RavelReducer,
    user: UserReducer
})

export default rootReducer;