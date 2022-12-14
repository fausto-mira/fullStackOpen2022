import { useState, useEffect } from "react";
import axios from "axios";

export const Country = (props) => {
  const { name, capital, population, languages, flag } = props;
  const apiKey = process.env.REACT_APP_API_KEY;
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");

  // useEffect(() => {
  //   axios.get(url1).then((response) => {
  //     console.log(response);
  //     setWeatherIcon(response.data.weather[0].icon);
  //     setTemperature(response.data.main.temp);
  //     setWindSpeed(response.data.wind.speed);
  //     setWindDirection(response.data.wind.deg);
  //   });
  // }, []);

  useEffect(() => {
    axios.get(url1).then((response) => {
      const { data } = response;
      console.log(data);
      setWeatherIcon(data.weather[0].icon);
      setTemperature(data.main.temp);
      setWindSpeed(data.wind.speed);
      setWindDirection(data.wind.deg);
    });
    // eslint-disable-next-line
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
