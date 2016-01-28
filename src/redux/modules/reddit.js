import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'

// Constants
// =========
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

// Action Creators
// ===============
export const selectSubreddit = createAction(SELECT_SUBREDDIT)
export const invalidateSubreddit = createAction(INVALIDATE_SUBREDDIT, (subreddit) => ({ subreddit }))
export const requestPosts = createAction(REQUEST_POSTS, (subreddit) => ({ subreddit }))
export const receivePosts = createAction(RECEIVE_POSTS, (subreddit, json) =>
  ({
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
)

// Thunks
const fetchPosts = (subreddit) => {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      )
  }
}

const shouldFetchPosts = (globalState, subreddit) => {
  const posts = globalState.reddit.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}
export const fetchPostsIfNeeded = (subreddit) => {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  //
  // This is useful for avoiding a network request if a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

// Actions
export const actions = {
  selectSubreddit,
  invalidateSubreddit,
  requestPosts,
  receivePosts,
  fetchPostsIfNeeded
}

// Reducers
// ========
const selectedSubreddit = handleActions({
  [SELECT_SUBREDDIT]: (state, { payload }) => payload
}, 'reactjs')

const posts = handleActions({
  [INVALIDATE_SUBREDDIT]: (state, { payload }) => ({
    ...state,
    didInvalidate: true
  }),
  [REQUEST_POSTS]: (state, { payload }) => ({
    ...state,
    isFetching: true,
    didInvalidate: false
  }),
  [RECEIVE_POSTS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: payload.posts,
    lastUpdated: payload.receivedAt
  })
}, {
  isFetching: false,
  didInvalidate: false,
  items: []
})

// CUSTOM REDUCER
const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.payload.subreddit]: posts(state[action.payload.subreddit], action)
      }
    default:
      return state
  }
}
export default combineReducers({
  postsBySubreddit,
  selectedSubreddit
})
