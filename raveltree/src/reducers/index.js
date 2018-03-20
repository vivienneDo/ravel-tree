import { combineReducers } from 'redux'
import RavelReducer from './RavelReducer'
import CurrentUserReducer from './CurrentUserReducer'
import CurrentUserRavelFetchReducer from './CurrentUserRavelFetchReducer'
import SearchReducer from './SearchReducer'
import MasterUserFetchReducer from './MasterUserFetchReducer'
import TermsOfServiceReducer from './TermsOfServiceReducer'
import NotificationReducer from './NotificationReducer'
import UserReducer from './UserReducer'
import MasterRavelReducer from './MasterRavelReducer'
import PassageReducer from './PassageReducer'

import NavigationReducer from './NavigationReducer';

import AdminReducer from './AdminReducer'
import ReportReducer from './ReportReducer'

const rootReducer = combineReducers({
  ravel: RavelReducer,
  master_ravel: MasterRavelReducer,
  user: UserReducer,
  current_user: CurrentUserReducer,
  current_user_ravel: CurrentUserRavelFetchReducer,
  search: SearchReducer,
  master_user: MasterUserFetchReducer,
  term_of_service: TermsOfServiceReducer,
  notification: NotificationReducer,
  passage: PassageReducer,
  navigation: NavigationReducer,
  admin_functions: AdminReducer,
  report_status: ReportReducer,
});

export default rootReducer;
