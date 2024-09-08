import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
const OPENWEATHER = import.meta.env.VITE_OPENWEATHER;
OPENWEATHER;

const CountryDetails = ({ filteredCountries, weather }) => {
    console.log(weather);
    const { cca3, name, capital, area, languages, flags } =
        filteredCountries[0];
    return (
        <div key={cca3}>
            <h1>{name.common}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <p>
                <strong>languages:</strong>
            </p>
            <ul>
                {Object.entries(languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
            <img className="flag" src={flags.png} alt="" />
            <h2>Weather in {capital}</h2>
            {weather.main ? (
                <>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt=""
                    />
                    <p>wind {weather.wind.speed} m/s</p>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

const Filter = ({ filteredCountries, onClickShow }) => {
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }
    return filteredCountries.map((country) => (
        <div key={country.cca3}>
            <p>{country.name.common}</p>{" "}
            <button onClick={onClickShow} data-show-id={country.cca3}>
                show
            </button>
        </div>
    ));
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filter, setFilter] = useState("");
    const [weather, setWeather] = useState({});

    const getAll = (url) => {
        return axios.get(url);
    };

    useEffect(() => {
        if (filteredCountries.length === 1) {
            getAll(
                `https://api.openweathermap.org/data/2.5/weather?lat=${filteredCountries[0].capitalInfo.latlng[0]}&lon=${filteredCountries[0].capitalInfo.latlng[1]}&appid=${OPENWEATHER}&units=metric`
            ).then((response) => setWeather(response.data));
        }
    }, [filteredCountries]);

    useEffect(() => {
        getAll("https://studies.cs.helsinki.fi/restcountries/api/all").then(
            (response) => setCountries(response.data)
        );
    }, []);

    useEffect(() => {
        if (filter === "") {
            setFilteredCountries([]);
        } else {
            const filtered = countries.filter((country) => {
                return country.name.common
                    .toLowerCase()
                    .includes(filter.toLowerCase());
            });
            setFilteredCountries(filtered);
        }
    }, [filter, countries]);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const handleShow = (event) => {
        setFilteredCountries(
            countries.filter((country) => {
                return country.cca3 === event.target.dataset.showId;
            })
        );
    };

    return (
        <>
            find countries{" "}
            <input type="text" onChange={handleChange} value={filter} />
            {filteredCountries.length === 1 ? (
                <CountryDetails
                    filteredCountries={filteredCountries}
                    weather={weather}
                />
            ) : (
                <Filter
                    filteredCountries={filteredCountries}
                    onClickShow={handleShow}
                />
            )}
        </>
    );
};

export default App;
