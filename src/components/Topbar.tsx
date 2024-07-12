import Button from "antd/es/button";
import xpIcon from "../assets/XPIcon.png";
const Topbar = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <img src={xpIcon} alt="" className=" w-24" />
            </div>
            <div>500</div>
          </div>
        </div>
        <div>Hi, username</div>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
