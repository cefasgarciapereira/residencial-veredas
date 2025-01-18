import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { fetchSheets } from "../store/sheetsSlice"

import Home from "../pages/Home"
import Report from "../pages/Report";
import { useEffect } from "react";
import Whatssapp from "../pages/Whatsapp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/whatsapp",
        element: <Whatssapp />
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