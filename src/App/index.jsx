import { Provider } from 'react-redux'

import Router from "../services/router"
import store from '../store'

import Layout from "../components/Layout"

import "./index.css"

export default function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Router />
            </Layout>
        </Provider>
    )
}