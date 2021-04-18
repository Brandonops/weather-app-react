import { CssBaseline, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Cloud from './Cloud';
import { useDispatch, useSelector } from 'react-redux';
import { createAddWeather, createDeleteWeather } from '../redux/actions';

const useStyles = makeStyles({
    root: {
      background: "radial-gradient(circle, rgb(0, 1, 33) 7%, rgb(14, 0, 94) 95%);",
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .08)',
      color: 'white',
      height: '80vh',
      padding: '0 30px',
    }
  });

    function bgChanger(idCode) {
        switch(idCode) {
            case 1030: 
                return <Cloud />
            case 1003:
                return <Cloud />
            default:
                return <Cloud />
        }
    };

function WeatherInfo(props) {
    const { current, location } = props.weathers;
    const dispatch = useDispatch();
    const weatherlist = useSelector((state) => {
        console.log(state)
        return state.weather.find((weather) => weather.city === location.name);
      });
    const classes = useStyles();
    
    const addWeather = () => {
        dispatch(createAddWeather(props.weathers))
      };
    
      const deleteWeather = () => {
        dispatch(createDeleteWeather(location.name));
      };
      
      console.log(weatherlist)
    return (
        <div id="wInfo">
            {bgChanger(current.condition.code)}
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Paper component="div" className={`${classes.root}`}>
                        <p>{location.name}, {location.country}</p>
                        <p>{location.region}</p>
                        <p>{location.tz_id}</p>
                        <p>{location.localtime}</p>
                        <br></br>
                        <img src={`${current.condition.icon}`} alt={`${current.condition.text} skies`}></img>
                        <p>{current.condition.text}</p>
                        <p>{current.temp_f}°</p>
                        <p>Feels like: {current.feelslike_f}°</p>
                        <p>{current.humidity}%</p>
                        {weatherlist ? (
                            <Button variant="danger" onClick={deleteWeather}>
                            Remove
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={addWeather}>
                            Add
                            </Button>
                        )}
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    )
}
export default WeatherInfo;