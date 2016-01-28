import { createAction, handleActions } from 'redux-actions'

// Constants
// =========
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// Action Creators
// ===============
export const login = createAction(LOGIN)
export const logout = createAction(LOGOUT)

// Actions
export const actions = {
  login,
  logout
}

// Reducer
// ========
export default handleActions({
  [LOGIN]: (state, action) => true,
  [LOGOUT]: (state, action) => false
}, false)

