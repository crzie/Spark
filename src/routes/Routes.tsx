import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <></> },
          { path: "/leaderboard", element: <></> },
          { path: "/profile", element: <></> },
          { path: "/redeem", element: <></> },
        ],
      },
    ],
  },
]);
