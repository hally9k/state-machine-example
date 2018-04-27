import React from 'react'
import ReactDOM from 'react-dom'
import App from 'component'
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { List } from 'immutable'

ReactDOM.render(<App />, document.getElementById('root'))
