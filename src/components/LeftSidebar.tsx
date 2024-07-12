import logo from "../assets/SparkLogo.png";

import { Link, useLocation } from "react-router-dom";
import profile from "../assets/icons8-circled-user-male-skin-type-5-48.png";
import home from "../assets/icons8-home-48.png";
import leaderboard from "../assets/icons8-leaderboard-48.png";
import redeem from "../assets/icons8-redeem-48.png";
const LeftSidebar = () => {
  const location = useLocation();

  const SidebarItem = ({
    src,
    text,
    link,
  }: {
    src: string;
    text: string;
    link: string;
  }) => {
    console.log(location.pathname, link);
    const active = location.pathname === link
      ? " bg-gray-100 border-2 border-emerald-500"
      : "";
    return (
      <div className="flex gap-3 items-center box-border rounded-lg w-full cursor-pointer ">
        <Link
          to={link}
          className={
            "hover:bg-gray-100 rounded-lg flex lg:flex-grow items-center " +
            active
          }
        >
          <div className="m-1">
            <img src={src} alt="" className="w-10 h-10" />
          </div>
          <p className="hidden lg:block ml-2">{text}</p>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col w-24 lg:w-64 gap-4 pl-6 lg:px-6 pt-3 bg-white h-screen font-nunito text-md font-extrabold text-emerald-700 overflow-auto">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="" className="w-12 h-12 mb-3" />
          <p className="hidden lg:block text-2xl mb-2">SPARK</p>
        </Link>
        <SidebarItem src={home} text={"HOME"} link="/"></SidebarItem>
        <SidebarItem
          src={leaderboard}
          text={"LEADERBOARD"}
          link="/leaderboard"
        ></SidebarItem>
        <SidebarItem src={redeem} text={"REDEEM"} link="/redeem"></SidebarItem>
        <SidebarItem
          src={profile}
          text={"PROFILE"}
          link="/profile"
        ></SidebarItem>
      </div>
    </>
  );
};

export default LeftSidebar;
