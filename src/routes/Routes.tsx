import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/app/HomePage";
import LeaderboardPage from "../pages/app/LeaderboardPage";
import ProfilePage from "../pages/app/ProfilePage";
import RedeemPage from "../pages/app/RedeemPage";
import Auth from "../context/Auth";
import CreateEventPage from "../pages/app/CreateEventPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth><App /></Auth>,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/leaderboard", element: <LeaderboardPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/redeem", element: <RedeemPage /> },
          { path: "/create", element: <CreateEventPage /> },
          { path: "*", element: <Navigate to="/" /> },
        ],
      },
    ],
  },
]);
