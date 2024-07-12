import Button from "antd/es/button";
import xpIcon from "../assets/XPIcon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Topbar = () => {
  const navigate = useNavigate();
  const { user, details } = useAuth();

  return (
    <>
      <div className="flex h-20 bg-transparent items-center justify-end w-full lg:gap-7 gap-2 lg:pr-5  pr-1 font-nunito font-bold text-emerald-800">
        <div className="flex items-center gap-2 z-20">
          <div>
            <img src={xpIcon} alt="" className="w-10 h-10" />
          </div>
          <div>{details?.xp ?? "-"}</div>
        </div>
        <div className="z-20">Hi, {details?.username ?? "guest"}</div>
        <div>
          <Button
            className="font-bold text-emerald-800"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
