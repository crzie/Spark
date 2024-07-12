import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full flex">
      <Outlet />
    </div>
  );
}

export default App;
