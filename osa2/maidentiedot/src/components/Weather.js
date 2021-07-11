
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})
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
          const newObj = {
            city: res.data.location.name,
            temperature: res.data.current.temperature,
            weather_icon: res.data.current.weather_icons[0],
            wind_dir: res.data.current.wind_dir,
            wind_speed: res.data.current.wind_speed,
          }
          setWeather(newObj)
        })
    }, [country])
    
    return (
      <div>
        <h3>weather in {weather.city}</h3>
        <div><strong>temperature:</strong> {weather.temperature} celsius</div>
        <div><img alt="weather icon" src={weather.weather_icon}/></div>
        <div><strong>wind:</strong>{weather.wind_speed}mph direction {weather.wind_dir}</div>
      </div>
    )
  }

  export default Weather