import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { fetchSheets } from "../store/sheetsSlice"

import Home from "../pages/Home"
import Report from "../pages/Report";
import { useEffect } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: ":year/:month",
        element: <Report />
    }
]);

export default function Router() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSheets())
    }, [])

    return (
        <RouterProvider router={router} />
    )
}