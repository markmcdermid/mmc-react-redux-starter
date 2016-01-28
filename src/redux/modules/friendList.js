import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_FRIEND = 'ADD_FRIEND'
export const DELETE_FRIEND = 'DELETE_FRIEND'
export const STAR_FRIEND = 'STAR_FRIEND'
export const FILTER_FRIENDS = 'FILTER_FRIENDS'

// ------------------------------------
// Actions
// ------------------------------------
export const addFriend = createAction(ADD_FRIEND)
export const deleteFriend = createAction(DELETE_FRIEND)
export const starFriend = createAction(STAR_FRIEND)
export const filterFriends = createAction(FILTER_FRIENDS)

export const actions = {
  addFriend,
  deleteFriend,
  starFriend,
  filterFriends
}

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = [
  {
    id: 1,
    name: 'Emma Sharpe',
    starred: true
  }, {
    id: 2,
    name: 'Nick Targontsidis',
    starred: false
  }, {
    id: 3,
    name: 'Tom McDermid',
    starred: false
  }
]
// ------------------------------------
// Reducer
// ------------------------------------

const friends = handleActions({
  [ADD_FRIEND]: (state, { payload }) => {
    return [
      ...state,
      {
        id: state.reduce((maxId, f) => Math.max(f.id, maxId), -1) + 1,
        name: payload,
        starred: false
      }
    ]
  },
  [DELETE_FRIEND]: (state, { payload }) => {
    return state.filter(f => f.id !== payload)
  },
  [STAR_FRIEND]: (state, { payload }) => {
    return state.map(friend =>
      (friend.id === payload)
      ? Object.assign({}, friend, {starred: !friend.starred})
      : friend
    )
  }
}, initialState)

const starFilter = handleActions({
  [FILTER_FRIENDS]: (state) => {
    return !state
  }
}, false)

export default combineReducers({
  friends,
  starFilter
})
