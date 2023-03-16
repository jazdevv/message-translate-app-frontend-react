import {createBrowserRouter } from "react-router-dom";
import PublicApp from './PublicApp'
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MainPage from './pages/mainPage'
import Chat from "./components/UserChatRoom";
import LoggedApp from "./LoggedApp";
import ProtectedRoute from "./components/ProtectedRoute";

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
      element: <ProtectedRoute>
          <LoggedApp/>
        </ProtectedRoute>,
      children:[
        {
          path:'/',
          element: <MainPage/>,
          children: [
          {
            path: "chat",
            element: <Chat/>,
          },
        ]}
      ]
        
    }
    
]);

export default router