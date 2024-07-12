import { Button } from 'antd';
import bannerimage from '../../assets/bannerimage2.png'
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ContributionCalendar } from 'react-contribution-calendar'
import icon from '../../assets/icon22.png'
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
  const data: InputData[] = [
    {
      "2024-01-01": { "level": 2, "data": {"Davis":"ikan"} }
    },
    {
      "2023-07-09": { "level": 1, "data": {} }
    },

  ]
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const startDate = formatDate(oneYearAgo);
  const endDate = formatDate(currentDate);

  console.log(new Date("2024-07-01"
  ).toDateString())

  return(
    <div className="h-full">
      <img src={bannerimage} alt="" className="w-full -mt-20 -z-50"/>
      <div className="gap-5 flex flex-col -mt-80 ml-12 ">
        <h1 className='font-semibold text-5xl select-none'>Be a <span className='text-lime-600'>{text}</span><span className='text-emerald-700'><Cursor /></span></h1>
        <h1 className='font-semibold select-none'>Join the Sparkles Community !</h1>
        <Button type="primary" className='w-28 h-10' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Volunteer</Button>
      </div>
      <div className="gap-5 flex flex-col justify-end items-end mr-10 -mt-12">
        <h1 className='font-semibold text-5xl select-none'>Create an <span className='text-lime-600'>{text2}</span><span className='text-emerald-700 select-none'><Cursor /></span></h1>
        <h1 className='font-semibold'>Provide Event for Those in need !</h1>
        <Button type="primary" className='w-28 h-10' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Create</Button>
      </div>
      <div className='mt-28 w-3/4 h-80 bg-emerald-100 border-2 border-emerald-200 ml-5 rounded-xl flex flex-col justify-center items-center'>
        <div className='w-full flex items-center ml-12'>
          <img src={icon} alt=""  className='w-100 h-24'/>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>Activity <span className='text-lime-600'>Stats</span></h1>
            <h1 style={{fontSize:''}}>How Sparkling Are You?</h1>
          </div>
        </div>
        <ContributionCalendar
          data={data}
          theme = {'grass'}
          start={startDate}
          end={endDate}
          daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          textColor="#000"
          startsOnSunday={true}
          includeBoundary={true}
          cx={15}
          cy={15}
          cr={2}
          onCellClick={(e, data) => console.log(data)}
          scroll={false}
          style={{fontWeight:'normal', fontSize:'small', width:'60vw'}}
        />
      </div>

    </div>
  );
};

export default HomePage;
