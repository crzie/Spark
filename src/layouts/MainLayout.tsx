import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
const { Header, Content, Sider } = Layout;
const MainLayout = () => {
  return (
    <Layout className="bg-transparent h-full" style={{ minHeight: "100vh" }}>
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
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
