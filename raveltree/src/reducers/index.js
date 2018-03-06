import { combineReducers } from 'redux'
import { RavelReducer as ravel } from './RavelReducer'
import { CurrentUserReducer as current_user } from './CurrentUserReducer'
import { CurrentUserRavelFetchReducer as current_user_ravel } from './CurrentUserRavelFetchReducer'
import { SearchReducer as search } from './SearchReducer'
import { MasterUserFetchReducer as master_user } from './MasterUserFetchReducer'
import { TermsOfServiceReducer as terms_of_service } from './TermsOfServiceReducer'
import { NotificationReducer as notification } from './NotificationReducer'
import { UserReducer as user } from './UserReducer'
import { MasterRavelReducer as master_ravel } from './MasterRavelReducer'
import { PassageReducer as passage } from './PassageReducer'

import * as navigation from './navigation';

const rootReducer = combineReducers(Object.assign ({},
    // ravel: RavelReducer,
    // master_ravel: MasterRavelReducer,
    // user: UserReducer,
    // current_user: CurrentUserReducer,
    // current_user_ravel: CurrentUserRavelFetchReducer,
    // search: SearchReducer,
    // master_user: MasterUserFetchReducer,
    // term_of_service: TermsOfServiceReducer,
    // notification: NotificationReducer,
    // passage: PassageReducer,
    ravel,
    master_ravel,
    user,
    current_user,
    current_user_ravel,
    search,
    master_user,
    terms_of_service,
    notification,
    passage,
    navigation,
));

export default rootReducer;
