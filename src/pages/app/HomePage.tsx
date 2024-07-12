import { auth } from "../../services/firebase"
import bannerimage from '../../assets/bannerimage2.png'
const HomePage = () => {

  return(
    <div className="h-full">
      <img src={bannerimage} alt="" className="w-full -mt-20 -z-50"/>
    </div>
  );
};

export default HomePage;
