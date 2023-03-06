import {createBrowserRouter } from "react-router-dom";
import App from './App'
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MainPage from './pages/mainPage'

// REACT ROUTER
const router = createBrowserRouter([
    {
      path: "/auth",
      element: <App/>,
      children: [
        {
            path: "login",
            element: <LoginPage/>,
        },
        {
            path: "signup",
            element: <SignupPage/>,
        },
      ]
    },
    {
        path:'/',
        element: <MainPage/>
    }
    
]);

export default router