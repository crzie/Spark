import { Button } from "antd";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import Circular from "./components/Circular";

function App() {
  return (
    <>
      <LeftSidebar />
      <Outlet />
    </>
  );
}

export default App;
