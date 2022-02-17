import Axios from 'axios';

import config from '../../app.json';
import { IWeatherAPIResponse } from '../action-types';

const { url } = config.openweatherapi;
const weatherIconUrl = config.openweatherapi.iconUrl;

export const getWeather = (loc: string) => {
  console.log('get Weather :', loc);

  return Axios.get<IWeatherAPIResponse>(`${url}&q=${loc}`);
};

export const getWeatherIconUrl = (iconCode: string) => {
  console.log('get Weather icon :', iconCode);

  return weatherIconUrl.replace('ICONCODE', iconCode);
};

export const getGeoLocWeather = (loc: {
  latitude: number;
  longitude: number;
}) => {
  console.log('get Weather :', loc);

  return Axios.get(`${url}&lat=${loc.latitude}&lon=${loc.longitude}`);
};
