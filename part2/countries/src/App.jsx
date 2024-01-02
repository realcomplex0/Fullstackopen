import { useEffect, useState } from 'react'
import Search from './components/Search'
import axios from 'axios'
import codes from './desc.json'

const weatherBaseUrl = 'https://api.open-meteo.com/v1/forecast'

const Weather = ({weather, name}) => {
  if(!weather) {
    return (<></>)
  }
  else{
    console.log('Test', weather.current)
    return (
      <div>
        <h2>Weather in {name}</h2>
        <p> temperature {weather.current.temperature_2m} Celsius</p>
        <img src={`${codes[weather.current.weather_code]['day']['image']}`}/>
        <p> wind {weather.current.wind_speed_10m} m/s </p>
      </div>
    )
  }
}

const Country = ({country}) => {

  const capital = country.capital[0]
  const coordinates = country.capitalInfo.latlng
  const apiKey = import.meta.env.VITE_API_KEY
  const [weatherData, setWeatherData] = useState(null)
  useEffect(() => {
    const params = {
      latitude: coordinates[0],
      longitude: coordinates[1],
      current: ['wind_speed_10m', 'temperature_2m', 'weather_code']
    }
    axios
    .get(`${weatherBaseUrl}`, {
      params: params
    })
    .then(res => res.data)
    .then(res => {
      console.log(res)
      setWeatherData(res)
    })
  }, [])
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <p> capital {capital} </p>
      <p> area {country.area}</p>
      <p><strong>languages: </strong></p>
      <ul>
        {Object.entries(country.languages).map(([key, value], i) => {
          return <li key={i}>{value}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <Weather name={capital} weather={weatherData} />
    </div>
  )
}

const CountryTab = ({countryFilterList, setCountryFilterList}) => {
  const selectCountry = (country) => {
    setCountryFilterList([country])
    //setCountryFilterList([...country])
  }

  if (countryFilterList.length > 10){
    return <div>Too many countries to display!</div>
  }
  else if (countryFilterList.length == 1){
    return <Country country={countryFilterList[0]}/>
  }
  else{
    return ( 
      <div>
        <ul>
          {countryFilterList.map((country,i) => 
            {
             return (
              <li key={i}>
                {country.name.common}
                <button onClick={() => selectCountry(country)}>show</button>
              </li>
             )
            }
          )}
        </ul>
      </div>
    )
  }
}

const App = () => {

  const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryFilterList, setCountryFilterList] = useState([])
 
  const changeSearch = (value) => {
    setSearch(value)
    setCountryFilterList(countries.filter((country) => {
      if(value && country.name.common.toLowerCase().includes(value.toLowerCase())) return true
      else return false
    }))
  }

  useEffect(() => {
    axios
    .get(apiUrl)
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Search search={search} setSearch={changeSearch} />
      <CountryTab countryFilterList={countryFilterList} setCountryFilterList={setCountryFilterList}/>
    </>
  )
}

export default App
