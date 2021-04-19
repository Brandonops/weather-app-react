import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ThunderStorm from '../components/ThunderStorm';
import Cloudy from '../components/Cloudy';
import Overcast from '../components/Overcast';
import PartlyCloudy from '../components/PartlyCloudy';
import RainNoLightning from '../components/RainNoLightning';
import WeatherInfo from '../components/WeatherInfo';
import { setData, setLoading } from '../redux/actions';
import Sunny from '../components/Sunny';
import DefaultBG from '../components/DefaultBG';
export default function Weather() {
    const [searchCity, setSearchCity] = useState('');
    const [searchRegion, setSearchRegion] = useState('');
    const loading = useSelector((state) => state.loading)
    const weathers = useSelector((state) => state.data)
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeather()
    };

    const handleChangeCity = (event) => {
        setSearchCity(event.target.value);
    };
    const handleChangeRegion = (event) => {
        setSearchRegion(event.target.value);
    };
    function bgChanger(idCode) {
        switch(idCode) {
            case 1000: 
                return <Sunny /> 
            case 1003:
                return <PartlyCloudy />
            case 1006:
                return <Cloudy />
            case 1009:
                return <Overcast />
            case 1063:
                return <RainNoLightning />
            case 1150:
                return <RainNoLightning />
            case 1153:
                return <RainNoLightning />
            case 1183: 
                return <RainNoLightning />
            case 1186:
                return <RainNoLightning />
            case 1189:
                return <RainNoLightning />
            case 1198:
                return <RainNoLightning /> 
            case 1240:
                return <RainNoLightning />
            case 1030:
                return <RainNoLightning />
            case 1273:
                return <ThunderStorm />
            case 1276:
                return <ThunderStorm />
            case 1087:
                return <ThunderStorm />
            default:
                return <DefaultBG />
        }
    };

    const fetchWeather = () => {
        dispatch(setLoading(true))
        fetch(`http://api.weatherapi.com/v1/current.json?key=77bfa31fbde04eddbe421418211404&q=${searchCity} ${searchRegion}&aqi=yes`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setLoading(false));
                dispatch(setData(data))
                if (data.Error) {
                    alert(data.Error);
                }
            });
    };

    return (
        <div>
            <PartlyCloudy />
                        {weathers && (
                 bgChanger(weathers.current.condition.code)

            )}
        <div className="weatherForm">
            <div className="h1Header"> 
            <h1>Find weather updates around the World</h1>
            </div>
                <div id="formDiv">

            <Form onSubmit={handleSubmit} className="cityForm">
                <InputGroup className="mb-3 inputGrp">
                    <div>
                    <FormControl
                        placeholder="Enter a City"
                        aria-label="Enter a City"
                        onChange={handleChangeCity}
                        value={searchCity}
                        className="formCtrl"
                        required
                    />
                    </div>
                    <div>
                    <FormControl
                        placeholder="Enter a Region or State"
                        aria-label="Enter a Region or State"
                        onChange={handleChangeRegion}
                        value={searchRegion}
                        className="formCtrl"
                        required
                    />
                    </div>
                    <div>
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-info">
                            Search
                            </Button>
                    </InputGroup.Append>
                    </div>
                </InputGroup>
            </Form>
                </div>
            {weathers && (
                <WeatherInfo weathers={weathers} />

            )}
        </div>     
        </div>
    );

}