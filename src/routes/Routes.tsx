import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path:'/signin',element:<SignIn/>},
      {path:'/signup',element:<SignUp/>},

    ],
  },
]);
