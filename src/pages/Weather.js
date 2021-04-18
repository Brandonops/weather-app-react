import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import WeatherInfo from '../components/WeatherInfo';
import { setData, setLoading } from '../redux/actions';

export default function Weather() {
    const [search, setSearch] = useState('');
    const loading = useSelector((state) => state.loading)
    const weathers = useSelector((state) => state.data)
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeather()
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
    };


    const fetchWeather =  () => {
        dispatch(setLoading(true))
        fetch(`http://api.weatherapi.com/v1/current.json?key=77bfa31fbde04eddbe421418211404&q=${search}&aqi=yes`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setLoading(false));
                dispatch(setData(data))
                console.log(data)
                console.log(data.current.condition.code)
                if (data.Error) {
                    alert(data.Error);
                }
            });
    };

    return (
        <div id="weatherForm">
                {weathers && (
                    <WeatherInfo weathers={weathers}/>

                )}
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search City"
                            aria-label="Search City"
                            onChange={handleChange}
                            value={search}
                            required
                        />
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-secondary">
                                Search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
        </div>
    );

}