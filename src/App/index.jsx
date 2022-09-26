import { Provider } from 'react-redux'

import Router from "../services/router"
import store from '../store'

import "./index.css"

export default function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}