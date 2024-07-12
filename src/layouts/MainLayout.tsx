import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <>
      <LeftSidebar />
      <Topbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
