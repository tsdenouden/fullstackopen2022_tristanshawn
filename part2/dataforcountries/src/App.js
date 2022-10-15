import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
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

  // update query & filter countries
  const filterCountries = (event) => {
    setSearch(event.target.value)
    const filter = countries.filter(country =>
      country.name.official.toLowerCase().includes(search.toLowerCase()))
    setFilter(filter)
  }

  switch (true) {
    case filteredCountries.length == 1:
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
                <li key={country.name.official}>{country.name.official}</li>
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