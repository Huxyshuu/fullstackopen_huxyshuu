import axios from 'axios';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAllCountries = () => {
  return axios.get(countryUrl);
};

// No API key needed
const getCountryWeather = (lat, lon) => {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code,is_day`

    const weather_icons = {
        "clear_day": "https://openweathermap.org/img/wn/01d@2x.png",
        "clear_night": "https://openweathermap.org/img/wn/01n@2x.png",
        "partly_cloudy_day": "https://openweathermap.org/img/wn/02d@2x.png",
        "partly_cloudy_night": "https://openweathermap.org/img/wn/02n@2x.png",
        "cloudy": "https://openweathermap.org/img/wn/03d@2x.png",
        "fog": "https://openweathermap.org/img/wn/50d@2x.png",
        "drizzle": "https://openweathermap.org/img/wn/10d@2x.png",
        "rain": "https://openweathermap.org/img/wn/10d@2x.png",
        "snow": "https://openweathermap.org/img/wn/13d@2x.png",
        "thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
        "default": "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg",
    }

    const mapWeatherCode = (code, isDay) => {
        const mapping = {
        0: isDay ? "clear_day" : "clear_night",
        1: isDay ? "partly_cloudy_day" : "partly_cloudy_night",
        2: isDay ? "partly_cloudy_day" : "partly_cloudy_night",
        3: "cloudy",
        45: "fog",
        48: "fog",
        51: "drizzle",
        53: "drizzle",
        55: "drizzle",
        56: "drizzle",
        57: "drizzle",
        61: "rain",
        63: "rain",
        65: "rain",
        66: "rain",
        67: "rain",
        71: "snow",
        73: "snow",
        75: "snow",
        77: "snow",
        80: "rain",
        81: "rain",
        82: "rain",
        85: "snow",
        86: "snow",
        95: "thunderstorm",
        96: "thunderstorm",
        99: "thunderstorm"
        }
        return mapping[code] || "default";
    }

    const result = axios.get(weatherUrl).then(response => {
        console.log(response.data)
        return {
            temp: response.data.current.temperature_2m,
            wind: response.data.current.wind_speed_10m,
            code: response.data.current.weather_code,
            icon: weather_icons[mapWeatherCode(response.data.current.weather_code, response.data.current.is_day)],
        };
    })
    return result;
}

export default {
  getAllCountries,
  getCountryWeather
};