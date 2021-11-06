import Axios from 'axios';

import config from '../../app.json';

const { url } = config.openweatherapi;
const weatherIconUrl = config.openweatherapi.iconUrl;

export const getWeather = loc => {
  console.log('get Weather :', loc);

  return Axios.get(`${url}&q=${loc}`);
};

export const getWeatherIconUrl = iconCode => {
  console.log('get Weather icon :', iconCode);

  return weatherIconUrl.replace('ICONCODE', iconCode);
};

export const getGeoLocWeather = loc => {
  console.log('get Weather :', loc);

  return Axios.get(`${url}&lat=${loc.latitude}&lon=${loc.longitude}`);
};
