import { combineReducers } from 'redux'
import productReducer from './product'
import transactionReducer from './transaction'
import userReducer from './user'

export default combineReducers({
  transaction: transactionReducer,
  user: userReducer,
  product: productReducer,
})
