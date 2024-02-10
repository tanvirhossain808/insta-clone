import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import useAuthStore from "../store/useAuthStore";




export const Routes = () => {
    const authUser = useAuthStore(state => state?.user);
    console.log(authUser);
    const routes = createBrowserRouter(
        [
            {
                path: '',
                element: <Layout>
                    <Outlet></Outlet>
                </Layout>,
                children: [
                    {
                        path: "/",
                        element: authUser ? <Home /> : < Navigate to={'/auth'} />
                    },

                    {
                        path: '/auth',
                        element: !authUser ? <AuthPage /> : <Navigate to="/" />
                    },
                    {
                        path: "/:userName",
                        element: <ProfilePage></ProfilePage>
                    }
                ]
            }

        ]

    )
    return (

        <RouterProvider router={routes} />


    )
}
