import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import UserReducer from './UserReducer'
import AllUserRavelReducer from './AllUserRavelReducer'
import SearchReducer from './SearchReducer'
import GetAllUserReducer from './GetAllUserReducer'
import TermsOfServiceReducer from './TermsOfServiceReducer'

const rootReducer = combineReducers({
    ravel: RavelReducer,
    user: UserReducer,
    current_user_ravel: AllUserRavelReducer,
    search: SearchReducer,
    all_user_keys: GetAllUserReducer,
    term_of_service: TermsOfServiceReducer
})

export default rootReducer;