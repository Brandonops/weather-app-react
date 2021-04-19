import {   Paper } from '@material-ui/core';
import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAddWeather, createDeleteWeather } from '../redux/actions';


function WeatherInfo(props) {
    const { current, location } = props.weathers;
    const dispatch = useDispatch();
    const weatherlist = useSelector((state) => {
        console.log(state)
        return state.weather.find((weath) => weath.location.name === location.name);
    });

    const addWeather = () => {
        dispatch(createAddWeather(props.weathers))
    };

    const deleteWeather = () => {
        dispatch(createDeleteWeather(location.name));
    };

    console.log(weatherlist)
    return (
        <div id="wInfo">
            <div >
                <React.Fragment>
                    <Container id="outsideCanvas">
                        <Paper component="div" id="weatherCard">
                        <div className="borderSplitter">
                        <h2>{location.name}, {location.region}</h2>
                        <h5>{location.country}</h5>
                        </div>
                        <br></br>
                        {/* <img src={`${current.condition.icon}`} alt={`${current.condition.text} skies`}></img> */}
                        <h2>{current.condition.text}</h2>
                        <div id="weatherTemp">
                        <p>Current temp: {current.temp_f}° F</p>
                        <p>Feels like: {current.feelslike_f}° F</p>
                        <p>Humidity: {current.humidity}%</p>
                        </div>
                        <div className="ADButton">
                            {weatherlist ? (
                                <Button variant="danger" onClick={deleteWeather} >
                                    Remove
                                </Button>
                            ) : (
                                <Button variant="info" onClick={addWeather} >
                                    Add
                                </Button>
                            )}
                        </div>
                        </Paper>
                    </Container>
                </React.Fragment>

            </div>
        </div>
    )
}
export default WeatherInfo;