import React from 'react'
import ThunderStorm from '../components/ThunderStorm'

export default function Home() {
  return (
    <div id="homePage">
      <ThunderStorm />
      <div id="mainHomeContent">
        <div className="homeHeader">
          <h1>i.find(weather)</h1>
        </div>
        <div id="dividerHome">

        </div>
        <div id="homeSubContent">
          <span>Search any city around the world for current, up-to-date weather information</span><br>
          </br>
          <span>Each search can be saved to a personal list where you can keep track of all locations under one page</span>
        </div>
        <div>
          {/* <Button type="Button" as={Link} to="/weather" variant="info">
            Start finding the weather you need
          </Button> */}
        </div>
      </div>
    </div>
  )
}
