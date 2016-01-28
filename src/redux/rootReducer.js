import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from 'redux/modules/counter'
import friendList from 'redux/modules/friendList'
import auth from 'redux/modules/auth'
import reddit from 'redux/modules/reddit'

const reducers = combineReducers({
  counter,
  friendList,
  router,
  loggedIn: auth,
  reddit
})

export default reducers
