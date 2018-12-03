import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import account from './account'
import user from './user'
import setup from './setup'

export default (history) => combineReducers({
  router: connectRouter(history),
  user,
  setup
})

// configureStore.js
