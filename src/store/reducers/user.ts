import actionType from '../actions/userActions'
import { IUserInitState, IAction } from '@Constants/models'

const initState:IUserInitState | Object = {};

function userReducer(state: typeof initState = initState, action:IAction) {
  switch(action.type) {
    case actionType.USER_UPDATE: {
      window.localStorage.setItem("user_data", JSON.stringify(action.payload))
      return {
        ...state,
        ...action.payload
      }
    }
    case actionType.USER_RESET: {
      window.localStorage.removeItem("user_data")
      return {}
    }
    default: 
      return state
  }
}

export default userReducer