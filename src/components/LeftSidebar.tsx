import React from 'react'
import logoText from "../assets/SparkLogoTextRight.png"
import home from "../assets/icons8-home-48.png"
import leaderboard from "../assets/icons8-leaderboard-48.png"
import redeem from "../assets/icons8-redeem-48.png"
import profile from "../assets/icons8-circled-user-male-skin-type-5-48.png"
const LeftSidebar = () => {
  return (
    <>
      <div className='flex flex-col w-1/6 gap-4 pl-6 pt-3 bg-white h-screen font-nunito text-md font-extrabold text-emerald-700'>
        <div><img src={logoText} alt="" className='w-40 h-20 mb-3'/></div>
        <div className='flex gap-3 items-center hover:bg-gray-100 rounded-md py-2 w-11/12 cursor-pointer'>
          <div className=' px-2'><img src={home} alt="" className="w-10 h-10"/></div>  
          <div>HOME</div>
        </div>
        <div className='flex gap-3 items-center hover:bg-gray-100 rounded-md py-2 w-11/12 cursor-pointer'>
          <div className=' px-2'><img src={leaderboard} alt="" className="w-10 h-10"/></div>
          <div>LEADERBOARD</div>
        </div>
        <div className='flex gap-3 items-center hover:bg-gray-100 rounded-md py-2 w-11/12 cursor-pointer'>
          <div className=' px-2'><img src={redeem} alt="" className="w-10 h-10"/></div>
          <div>REDEEM</div>
        </div>
        <div className='flex gap-3 items-center hover:bg-gray-100 rounded-md py-2 w-11/12 cursor-pointer'>
          <div className=' px-2'><img src={profile} alt="" className="w-10 h-10"/></div>
          <div>PROFILE</div>
        </div>
      </div>
    </>
  )
}

export default LeftSidebar