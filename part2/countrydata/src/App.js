import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = (props) => {
  const { name, capital, population, languages, flag } = props;
  const apiKey = process.env.REACT_APP_API_KEY;
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");

  useEffect(() => {
    axios.get(url1).then((response) => {
      console.log(response);
      setWeatherIcon(response.data.weather[0].icon);
      setTemperature(response.data.main.temp);
      setWindSpeed(response.data.wind.speed);
      setWindDirection(response.data.wind.deg);
    });
  }, []);

  const url2 = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
  console.log({ url2 });

  const degToCompass = (num) => {
    let val = Math.floor(num / 22.5 + 0.5);
    let arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={flag} alt="Flag" height="200px" />
      <h3>Weather in {name}</h3>
      <div>Temperature {temperature} Celcius</div>
      <div>
        <img src={url2} alt={weatherIcon} width="5%" />
      </div>
      <div>
        Wind {windSpeed * 3.6} km/h - direction:
        {degToCompass(windDirection)}
      </div>
    </div>
  );
};

const DisplayCountries = ({ countries, setSearch }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.name}>
            {country.name}
            <button
              type="button"
              value={country.name}
              onClick={(e) => setSearch(e.target.value)}
            >
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Results = ({ countries, setSearch, search }) => {
  if (countries.length > 10 && search.length > 0)
    return <div>Too manu matches, specify another filter</div>;
  else if (countries.length === 1) {
    console.log({ countries });
    return (
      <Country
        name={countries[0].name}
        capital={countries[0].capital}
        population={countries[0].population}
        languages={countries[0].languages}
        flag={countries[0].flag}
      />
    );
  } else if (search.length === 0)
    return <div>Type a country name to start searching</div>;
  return <DisplayCountries countries={countries} setSearch={setSearch} />;
};

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const url = "https://restcountries.com/v2/all";

  useEffect(() => {
    axios.get(url).then((response) => setAllCountries(response.data));
  }, []);

  const result = allCountries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log({ search });
  };

  return (
    <div>
      <div>
        find countries: <input value={search} onChange={handleSearch} />
        {result.length !== 250 ? (
          <button type="button" onClick={() => setSearch("")}>
            clear
          </button>
        ) : (
          <br />
        )}
      </div>
      <Results countries={result} setSearch={setSearch} search={search} />
    </div>
  );
}

export default App;
