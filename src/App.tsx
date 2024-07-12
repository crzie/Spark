import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full flex">
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </div>
  );
}

export default App;
