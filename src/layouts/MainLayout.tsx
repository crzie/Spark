import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <div className="flex w-full">
      <LeftSidebar />
      <div className="flex-col grow">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
