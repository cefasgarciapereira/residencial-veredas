import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import Home from "../pages/Home"
import Report from "../pages/Report";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: ":year/:month",
        element: <Report/>
    }
]);

export default function Router(){
    return(
        <RouterProvider router={router} />
    )
}