import { all } from 'redux-saga/effects';
import fetchCityWeatherSaga from './getCityWeather';
import localStorageSaga from './localStorage';

export default function* run() {
  yield all([fetchCityWeatherSaga, ...localStorageSaga]);
}
