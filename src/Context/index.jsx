import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [latitude, setLatitude] = useState(44.34); // Default latitude
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
            setLatitude,
            setLongitude,
            values,
            thisLocation,
            latitude,
            longitude
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
