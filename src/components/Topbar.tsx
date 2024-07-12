import Button from "antd/es/button";
import coin from "../assets/moving-coin-icon.gif"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Topbar = () => {
  const navigate = useNavigate();
  const { user, details } = useAuth();

  return (
    <div className="w-full overflow-visible">
      <div className="pt-4 h-screen flex font-nunito items-start font-bold text-emerald-800">
        <span className="ml-auto gap-4 p-2 bg-emerald-900/80 rounded-xl overflow-auto text-lg items-center flex sticky h-12 top-4 z-30 ">
          <div className="flex items-center gap-2 z-20">
            <div>
              <img src={coin} alt="" className="w-8 h-8" />
            </div>
            <div className="text-white">{details?.coin ?? "-"}</div>
          </div>
          <div className="z-20 text-white">Hi, {details?.username ?? "guest"}</div>
          <div>
            <Button
              className="font-bold text-emerald-800"
              onClick={() => navigate("/signin")}
            >
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Topbar;
