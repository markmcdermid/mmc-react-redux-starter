import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import DashboardView from 'views/DashboardView/DashboardView'

export default (store) => {
  const checkAuth = (nextState, replace) => {
    console.log('Checking Auth...')
    let state = store.getState()
    if (state.loggedIn) {
      console.log('logged in going to dash')
      replace('dashboard')
    } else {
      console.log('not logged in... doing nothing')
    }
  }

  const requireAuth = (nextState, replace) => {
    let state = store.getState()
    console.log('Requires Auth...')
    console.log(state)
    if (state.loggedIn) {
      console.log('Is Logged In... Continuing To Dashboard')
    } else {
      console.log('Not logged in... Returning To Homepage#Login')
      replace('/#login')
    }
  }

  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute onEnter={checkAuth} component={HomeView} />
      { /* Routes requiring login */ }
      <Route onEnter={requireAuth}>
        <Route path='dashboard' component={DashboardView}/>
      </Route>
      <Route path='/404' component={NotFoundView} />
      <Redirect from='*' to='/404' />
    </Route>
  )
}
