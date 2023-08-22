import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_APP_API_KEY


const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({})
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [city])

  const temp = weatherData.main ? weatherData.main.temp : null
  const icon = weatherData.weather ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : null
  const wind = weatherData.wind ? weatherData.wind.speed : null
  


  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={icon}></img>
      <p>wind {wind} m/s</p>
    </div>
  )
}


const Display = ({ searchFilter, setFilter }) => {
  console.log(searchFilter.length)
  if (searchFilter.length > 10) {
      return (
      <p>Too many matches, specify another filter</p>
      )
  
  }
  else if (searchFilter.length > 1 && searchFilter.length <= 10) {
      return searchFilter.map(country => <li key={country.name.common}>{country.name.common} <button  onClick={() => setFilter(searchFilter.filter(maa => maa.name.common.toLowerCase().includes(country.name.common.toLowerCase())))}>view</button></li>)
  }
  else if (searchFilter.length === 1) {


      let country = searchFilter[0]
      return (
          <div>
              <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>languages:</h3>
              <ul>
                  {Object.values(country.languages).map((language) => (
                      <li key={country.name.common}>{language}</li>
                  ))}
              </ul>
              <img src={country.flags.png} className='flag'></img>
              <Weather city={country.capital} />
          </div>
      )
  }
}


function App() {

  const [countries, setCountries] = useState([])
  const [searchFilter, setFilter] = useState({})
  
  useEffect(() => {
    console.log('effect is running')

    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      console.log('promise fulfilled', response.data)
      setCountries(response.data)
      console.log(countries)
  })


  }, [])

  const handleChange = (event) => {
    if (event.target.value ==='') {
      setFilter(countries)
    }
    setFilter(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(searchFilter, 'searchfilter')
  }

 



  return (
    <>
      <div>
        <form>
        find countries<input  onChange={handleChange} />
        </form>
        <Display searchFilter={searchFilter} setFilter={setFilter} />
          </div>
    </>
  )
}

export default App
