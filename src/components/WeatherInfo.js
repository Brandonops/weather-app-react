import { CssBaseline, Paper, Typography } from '@material-ui/core';
import React, { useCallback } from 'react'
import { Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

const bgDark = "black"

const useStyles = makeStyles({
    root: {
      background: bgDark,
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: '80vh',
      padding: '0 30px',
    },
    bgcolor: {
        background: bgDark,
    }
  });

    function bgChanger(idCode) {
        switch(idCode) {
            case 1030: 
                return 'dynamicbg'
            case 1003:
                return 'bghero'
            default:
                return 'default'
        }
    };

function WeatherInfo(props) {
    const { current, location } = props.weather;
    const classes = useStyles();
    

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Paper component="div" className={`${classes.root}`} id={`${(bgChanger(current.condition.code))}`}>
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
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    )
}
export default WeatherInfo;