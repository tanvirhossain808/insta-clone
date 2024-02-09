import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage";

export const routes = createBrowserRouter(
    [
        {
            path: '',
            element: <Layout>
                <Outlet></Outlet>
            </Layout>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                }, {
                    path: '/auth',
                    element: <AuthPage></AuthPage>
                }
            ]
        }

    ]
)