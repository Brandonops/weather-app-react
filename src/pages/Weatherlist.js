import React from 'react'
import { useSelector } from 'react-redux';
import Cloud from '../components/Cloud'
import WeatherInfo from '../components/WeatherInfo';


export default function Weatherlist() {
    const weather = useSelector((state) => state.weatherslist);
    return (
        <div>
        {weather && (
            <WeatherInfo weathers={weather}/>

        )}
        </div>
    )
}
