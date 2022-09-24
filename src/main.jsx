import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Router from "./services/router"
import store from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
)
