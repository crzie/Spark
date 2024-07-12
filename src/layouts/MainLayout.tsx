import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
const MainLayout = () => {
  return (
    <Layout className="bg-transparent h-full">
      <Sider width={256} className="bg-transparent">
        <LeftSidebar />
      </Sider>
      <Layout className="flex flex-col h-full">
        <Header className="bg-white">
          <Topbar />
        </Header>
        <Content className="grow bg-white h-full">

          <Outlet />

        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
