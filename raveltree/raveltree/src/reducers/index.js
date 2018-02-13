import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import UserReducer from './UserReducer'
import AllUserRavelReducer from './AllUserRavelReducer'

const rootReducer = combineReducers({
    ravel: RavelReducer,
    user: UserReducer,
    all_user_ravels: AllUserRavelReducer
})

export default rootReducer;