import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import UserReducer from './UserReducer'
import AllUserRavelReducer from './AllUserRavelReducer'
import SearchReducer from './SearchReducer'

const rootReducer = combineReducers({
    ravel: RavelReducer,
    user: UserReducer,
    all_user_ravels: AllUserRavelReducer,
    search_users: SearchReducer
})

export default rootReducer;