import { combineReducers } from 'redux'
import { userInfo } from './reducer'
import { changeState } from './sidebarReducer'
import {userLoginInfo} from './loginInfoReducer'

export default combineReducers({userInfo, changeState, userLoginInfo})