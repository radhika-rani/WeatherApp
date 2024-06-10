import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './components';

function App() {
  const [input, setInput] = useState({});
  const { weather, values, setLatitude, setLongitude, thisLocation } = useStateContext(); // Destructure thisLocation from context

  const [darkMode, setDarkMode] = useState(false);

  const cities = [
    { name: 'Delhi', lat: 28.7041, long: 77.1025 },
    { name: 'Mumbai', lat: 19.0760, long: 72.8777 },
    { name: 'Kolkata', lat: 22.5744, long: 88.3629 },
    { name: 'Chennai', lat: 13.0843, long: 80.2705 },
    { name: 'Bhubaneswar', lat: 20.2961, long: 85.8245 },
    { name: 'Ranchi', lat: 23.3441, long: 85.3096 },
  ];

  const submitCity = () => {
    console.log(`Setting place: ${JSON.stringify(input)}`);
    setLatitude(input.lat);
    setLongitude(input.long);
    setInput({});
  };

  return (
    <div className={`w-full h-screen text-black px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='flex items-center gap-4'>
          <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt='search' className='w-[1.5rem] h-[1.5rem]' />
            <select
              name="city"
              id="city"
              onChange={(e) => setInput(JSON.parse(e.target.value))}
              className='focus:outline-none w-full text-[#212121] text-lg'
            >
              <option value=''>Select city</option>
              {cities.map((city, index) => (
                <option key={index} value={JSON.stringify({ lat: city.lat, long: city.long })}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={submitCity} className='p-2 bg-blue-500 text-white rounded'>
            Submit
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className='p-2 bg-gray-500 text-white rounded'>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        {weather && (
          <WeatherCard
            city={thisLocation}
            temperature={weather.main.temp}
            feelsLike={weather.main.feels_like}
            humidity={weather.main.humidity}
            speed={weather.wind.speed}
            iconString={weather.weather[0].main}
            conditions={weather.weather[0].description}
          />
        )}
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values?.slice(1, 7).map((curr, index) => (
            <MiniCard
              key={index} // Assigning index as the key
              dateTime={curr.dt * 1000}
              temperature={curr.main.temp}
              iconString={weather.weather[0].main}
              conditions={weather.weather[0].description}

            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
