import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ country }) => {
  //asetetaan alkuasetelmaksi toimiva muoto, jotta vältytään typeErrorilta kun data ei ole vielä saapunut perille
  //toimiva ratkaisu voisi olla myös datan validointi ennen palautusta
  const [weather, setWeather] = useState({
    current: { temperature: 0, weather_icons: [], wind_speed: 0, wind_dir: "" },
    location: { name: "" }
  })

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
        params:
        {
          access_key: process.env.REACT_APP_API_KEY,
          query: country.name,
        }
      })
      .then((res) => {
        const newObj = res.data
        setWeather(newObj)
      })
  }, [country])

  return (
    <div>
      <h3>weather in {weather.location.name}</h3>
      <div><strong>temperature:</strong> {weather.current.temperature} celsius</div>
      <div><img alt="weather icon" src={weather.current.weather_icons[0]} /></div>
      <div><strong>wind:</strong>{weather.current.wind_speed}mph direction {weather.current.wind_dir}</div>
    </div>
  )

}

export default Weather