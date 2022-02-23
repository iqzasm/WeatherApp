import { combineReducers } from 'redux';
import { ICity, ICityWeatherState } from '../action-types';
import allCities from './allcities';
import cities from './cities';
import { weather } from './weather';

export interface IApplicationState {
  cities: string[];
  weather: ICityWeatherState;
  allCities: ICity[];
}

export default combineReducers({
  cities,
  weather,
  allCities,
});
