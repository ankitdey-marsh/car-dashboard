import { IoHomeSharp, IoNavigateCircle,IoSettingsOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <p className='relative right-12 top-6 text-2xl'>{currentTime}</p>;
}

function Homepage() {
  const [weather, setWeather] = useState(null);
  const [wcond,setWcond]=useState(null);

  useEffect(() => {
    const apiKey = 'a50124b9ad9e1a462913232817dc387f';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Bhubaneshwar,IN&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeather(Math.round(data.main.temp - 273));
        setWcond(data.weather[0].main);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className=''>
      <div className='flex justify-evenly w-screen pt-20'>
        <div className='from-[#ff008a] to-[#990053] h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all hover:translate-x-3'>
          <IoIosSearch className='text-white relative my-auto' size={60}/>
        </div>
        <div className='from-[#00c9ff] to-[#007999] h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all'>
          <MdCall className='text-white relative my-auto' size={60}/>
        </div>
        <div className='from-[#32ff6a] to-[#1e9940] h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all'>
          <IoNavigateCircle className='text-white relative my-auto' size={60}/>
        </div>
        <div className='from-[#f4f903] to-[#909302] h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all hover:-translate-x-3'>
          <IoSettingsOutline className='text-white relative my-auto' size={60}/>
        </div>
      </div>
      <div className='relative top-4 flex justify-between'>
        <div className='text-white'>
          <p className='relative left-12 top-6 text-2xl pr-1 mr-14'>{weather ? `${wcond} : ${weather}°C` : 'Loading...'}</p>
        </div>
        
        <div className='text-white'>
          <Clock />
        </div>
      </div>
      <div className="flex justify-center">
        <a href="">
          <div className='rounded-full hover:scale-125 duration-300 transition-all hover:bg-gray-800 p-4 hover:-translate-y-2'>
            <IoHomeSharp className='text-white relative' size={50}/>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Homepage;