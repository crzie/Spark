import { Button } from 'antd';
import bannerimage from '../../assets/bannerimage2.png'
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const HomePage = () => {

  const [text] = useTypewriter({
    words: ['Volunteer'],
    loop: 0,
    typeSpeed: 200,
    deleteSpeed: 200,
    delaySpeed: 1000,
  });
  const [text2] = useTypewriter({
    words: ['Event'],
    loop: 0,
    typeSpeed: 200,
    deleteSpeed: 200,
    delaySpeed: 1000,
  });

  return(
    <div className="h-full">
      <img src={bannerimage} alt="" className="w-full -mt-20 -z-50"/>
      <div className="gap-5 flex flex-col -mt-80 ml-12">
        <h1 className='font-semibold text-5xl'>Be a <span className='text-lime-600'>{text}</span><span className='text-emerald-700'><Cursor /></span></h1>
        <h1>Become Sparkles</h1>
        <Button type="primary" className='w-28 h-10 ' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Volunteer</Button>
      </div>
      <div className="gap-5 flex flex-col justify-end items-end mr-10 -mt-12">
        <h1 className='font-semibold text-5xl'>Create an <span className='text-lime-600'>{text2}</span><span className='text-emerald-700'><Cursor /></span></h1>
        <h1>Become Sparkles</h1>
        <Button type="primary" className='w-28 h-10' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Create</Button>
      </div>
    </div>
  );
};

export default HomePage;
