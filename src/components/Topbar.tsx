import Button from "antd/es/button";
import xpIcon from "../assets/XPIcon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Topbar = () => {
  const navigate = useNavigate();
  const { user, details } = useAuth();

  return (
    <>
      <div className="flex h-20 items-center text-lg justify-end w-full lg:gap-7 gap-2 lg:pr-5  pr-1 font-nunito font-bold text-emerald-800">
        <span>
          <div className="flex items-center gap-2 z-20">
          <div>
            <img src={xpIcon} alt="" className="w-10 h-10" />
          </div>
          <div className="text-white">{details?.xp ?? "-"}</div>
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
    </>
  );
};

export default Topbar;
