import { Button } from "antd";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import Circular from "./components/Circular";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="w-full flex">
      <LeftSidebar />
      <Topbar />
      <Outlet />
    </div>
  );
}

export default App;
