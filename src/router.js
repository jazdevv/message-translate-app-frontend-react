import {createBrowserRouter } from "react-router-dom";
import App from './App'
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MainPage from './pages/mainPage'
import Chat from "./components/UserChat";
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
        element: <MainPage/>,
        children: [
          {
            path: "chat/:id",
            element: <Chat/>,
        },
        ]
    }
    
]);

export default router