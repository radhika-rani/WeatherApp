import React, { useEffect, useState } from 'react';
import { ForDate } from '../utils/ForDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';

const WeatherCard = ({
  city,
  temperature,
  feelsLike,
  humidity,
  speed,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState();
  const { time } = ForDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className='w-[20rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-3 text-center '>{new Date().toDateString()}</p>
        <p className='flex-3 text-center '>{time}</p>
      </div>
      <div className='flex w-20 just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" /><div className='text-center font-bold text-3xl mb-4'>{city}</div>

      </div>
      <div className='font-bold text-center text-xl'>
        Temperature: {temperature} &deg;C
        <hr></hr>
        Feels like: {feelsLike} &deg;C

      </div>

      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind speed <span className='font-normal'>{speed} m/s</span></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <span className='font-normal'>{humidity}%</span></p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
