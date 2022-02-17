import { combineReducers } from 'redux';
import { ICityWeatherState } from '../action-types';
import cities from './cities';
import { weather } from './weather';

export interface IApplicationState {
  cities: string[];
  weather: ICityWeatherState;
}

export default combineReducers({
  cities,
  weather,
});
