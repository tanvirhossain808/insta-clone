
import { Outlet, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout/Layout'
import Home from './pages/Home/Home'
import AuthPage from './pages/AuthPage/AuthPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
// const authUser = duthStore()

function App() {


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
            element: authUser() ? <Home /> : < Navigate to={'/auth'} />
          },

          {
            path: '/auth',
            element: <AuthPage></AuthPage>
          },
          {
            path: "/:userName",
            element: <ProfilePage></ProfilePage>
          }
        ]
      }

    ]
  )

}

export default App
