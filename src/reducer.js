import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import taxReducer from './user/taxReducer'
import allocationsReducer from './user/allocationsReducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  tax: taxReducer,
  allocations: allocationsReducer,
  web3: web3Reducer
})

export default reducer
