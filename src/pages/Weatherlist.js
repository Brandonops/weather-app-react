import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ThunderStorm from '../components/ThunderStorm';
import WeatherInfo from '../components/WeatherInfo'



export default function Weatherlist() {
    const weatherlist = useSelector((state) => state.weather);
    const test = weatherlist.map((weather) => {
        return (weather)
    })

    console.log(test)


    return (
        <div>
            <ThunderStorm />
            <div>
                <div className="grpdHeader">
                <div className="homeHeader">
                    <h1>i.find(weather)</h1>
                </div>
                <div className="h1Header">
                    <h1>My saved weather locations</h1>
                </div>
                </div>
                <Container>
                    <Row>
                        {weatherlist.map((weathers, index) => {
                            return (
                                <Col 
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={4}
                                    className="mb-4"
                                >
                                    <WeatherInfo weathers={weathers} />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    )
}
