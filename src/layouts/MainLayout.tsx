import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  return (
    <Layout className="bg-transparent ">
      <Sider width={256} className="bg-transparent">
        <LeftSidebar />
      </Sider>
      <Layout>
        <Header className="bg-white">
          <Topbar />
        </Header>
        <Content className="bg-white h-full">
       
            <Outlet />
         
        </Content>
        <Footer style={{ textAlign: 'center' }} className="bg-emerald-200">©2024 Your Company</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
