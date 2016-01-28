import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import getRoutes from 'routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

const store = configureStore( browserHistory )

ReactDOM.render(
    <Root history={browserHistory} routes={getRoutes(store)} store={store} />,
    document.getElementById('root')
 )
