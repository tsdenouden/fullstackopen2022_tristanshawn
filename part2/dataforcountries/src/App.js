import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // countries api
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilter] = useState([])

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(fetchCountries, [])

  // weather api
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])
  const [weatherIcon, setIcon] = useState('10d')

  const fetchWeather = (lat, lng) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
        setIcon(response.data.weather[0].icon)
      })
  }

  // update query & filter countries
  const filterCountries = (event) => {
    setSearch(event.target.value)
    const filter = countries.filter(country =>
      country.name.official.toLowerCase().includes(search.toLowerCase()))
    setFilter(filter)
    if (filter.length === 1) {
      const [lat, lng] = filteredCountries[0].latlng
      fetchWeather(lat, lng)
    }
  }

  // view specific country
  const showCountry = (query) => {
    setSearch(query)
    const filter = countries.filter(country =>
      country.name.official.toLowerCase().includes(query.toLowerCase()))
    setFilter(filter)
    const [lat, lng] = filteredCountries[0].latlng
    fetchWeather(lat, lng)
  }

  switch (true) {
    case filteredCountries.length === 1:
      return (
        <div>
          <input value={search} onChange={filterCountries}/>

          {filteredCountries.map(country =>
            <div key={country.name.official}>
              <h1>{country.name.official}</h1>
              <p>
                capital {country.capital} <br />
                area {country.area}
              </p>
              <ul>
                {Object.values(country.languages).map(language =>
                  <li key={language}>{language}</li>
                )}
              </ul>
              <img key={country.name.official} src={country.flags.png}/>

              <h1>Weather in {country.name.official}</h1>
              <p>temperature {weather.main?.temp} Celsius</p>
              <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>
              <p>wind {weather.wind?.speed} m/s</p>
            </div>
          )}
        </div>
      )
      break

    case filteredCountries.length <= 10:
      return (
        <div>
          <input value={search} onChange={filterCountries}/>

          <ul>
            {filteredCountries.map(country =>
                <li key={country.name.official}>
                  {country.name.official}
                  <button onClick={() => {showCountry(country.name.official)}}>show</button>
                </li>
            )}
          </ul>
        </div>
      )
      break

    default:
      return (
        <div>
          <input value={search} onChange={filterCountries}/>
          <p>Too many matches, specify another filter</p>
        </div>
      )
      break
  }
}

export default App