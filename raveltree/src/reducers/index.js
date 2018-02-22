import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import UserReducer from './UserReducer'
import AllUserRavelReducer from './AllUserRavelReducer'
import SearchReducer from './SearchReducer'

const rootReducer = combineReducers({
    ravel: RavelReducer,
    user: UserReducer,
    current_user_ravel: AllUserRavelReducer,
    search: SearchReducer
})

export default rootReducer;