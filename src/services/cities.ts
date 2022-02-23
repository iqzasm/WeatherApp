import Axios from 'axios';

import config from '../../app.json';
import { ICitiesAPIResponse, IWeatherAPIResponse } from '../action-types';

const { url } = config.cities_api;

export const getAllCities = () => Axios.get<ICitiesAPIResponse>(`${url}`);
