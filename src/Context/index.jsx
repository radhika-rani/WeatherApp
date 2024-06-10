import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({"dt":1717956000,"main":{"temperature":304.06,"feels_like":311.06,"temp_min":303.91,
        "temp_max":304.06,"pressure":1002,"sea_level":1002,"grnd_level":996,"humidity":72,"temp_kf":0.15},
        "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
        "clouds":{"all":52},"wind":{"speed":5.93,"deg":207,"gust":11.18},
        "visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2024-06-09 18:00:00"});
    const [values, setValues] = useState([]);
    const [latitude, setLatitude] = useState(80.34); // Default latitude
    const [longitude, setLongitude] = useState(10.99); // Default longitude
    const [thisLocation, setLocation] = useState('');

    // Fetch weather data from OpenWeatherMap API
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast`,
            params: {
                lat: latitude,
                lon: longitude,
                units: 'metric',
                appid: import.meta.env.VITE_API_KEY
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);

            const { city, list } = response.data;

            setLocation(city.name);
            setValues(list);
            setWeather(list[0]); // Set the first forecast data as the current weather

        } catch (e) {
            console.error(e);
            // If the API throws an error
            alert('Unable to fetch weather data for this location');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [latitude, longitude]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
        
            values,
            thisLocation,
            setLatitude,
            setLongitude
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
