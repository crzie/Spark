import { Button } from "antd"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"

function App() {

  return (
    <>
    <LeftSidebar/>
      {/* Test
      <Button>Test AntDesign</Button> */}
      <Outlet />
    </>
  )
}

export default App
