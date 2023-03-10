import {createBrowserRouter } from "react-router-dom";
import PublicApp from './PublicApp'
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MainPage from './pages/mainPage'
import Chat from "./components/UserChat";
import LoggedApp from "./LoggedApp";
// REACT ROUTER
const router = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicApp/>,
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
      element: <LoggedApp/>,
      children:[
        {
          path:'/',
          element: <MainPage/>,
          children: [
          {
            path: "chat/:id",
            element: <Chat/>,
          },
        ]}
      ]
        
    }
    
]);

export default router