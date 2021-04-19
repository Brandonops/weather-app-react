import React from 'react'
import { useSelector } from 'react-redux';
import PartlyCloudy from '../components/PartlyCloudy';



export default function Weatherlist() {
    // const weather = useSelector((state) => state.weatherslist);
    return (
        <div>
            <PartlyCloudy />
            <div className="weatherForm">
                <div className="h1Header">
                    <h1>My saved weather locations</h1>
                </div>
                {/* {weathers && (
                <WeatherInfo weathers={weathers} />

            )} */}
            </div>
        </div>
    )
}
