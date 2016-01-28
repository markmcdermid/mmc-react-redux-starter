import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'redux-simple-router'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore (history) {
  // Sync with router via history instance (main.js)
  const routerMiddleware = syncHistory(history)

  // Compose final middleware
  let middleware = applyMiddleware(thunk, routerMiddleware)

  const finalCreateStore = compose(
    applyMiddleware(thunk, routerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
  // Create final store and subscribe router
  const store = finalCreateStore(rootReducer)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
