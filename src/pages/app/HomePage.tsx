import bannerimage from '../../assets/bannerimage2.png'
const HomePage = () => {

  return(
    <div className="h-full">
      <img src={bannerimage} alt="" className="w-full -mt-20 -z-50"/>
      <div className="">
        <h1>Be A Volunteer</h1>
      </div>
    </div>
  );
};

export default HomePage;
