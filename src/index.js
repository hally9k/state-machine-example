import './rx.js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'component'
import { applyMiddleware, createStore } from 'redux'
import reducers, { epics } from 'duck'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { List } from 'immutable'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

const epicMiddleware = createEpicMiddleware(epics)

const enhancer = composeWithDevTools(applyMiddleware(epicMiddleware, logger))

const store = createStore(reducers, { image: null }, enhancer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
