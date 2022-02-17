import { Action, refreshCityWeather, setError, setLoading } from '../actions';
import { ActionType, IWeatherData } from '../action-types';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getHHMM,
  getLocalizedTime,
  getLocalTime,
  getPaddedClockText,
} from '../utils';
import { getWeather, getWeatherIconUrl } from '../services/weather';

function getCityWeather(city: string) {
  return getWeather(city);
}

export function* fetchCityWeather(action: Action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getCityWeather, action.payload);

    console.log(`TEMP:::${response.data.main.temp}`);

    const { temp, temp_min, temp_max } = response.data.main;
    const weatherDescription = response.data.weather[0].description;
    const iconcode = response.data.weather[0].icon;
    const iconUrl = iconcode ? getWeatherIconUrl(iconcode) : '';
    const cityTimezone = response.data.timezone;

    const sunrise = response.data.sys.sunrise
      ? getLocalizedTime(response.data.sys.sunrise, cityTimezone)
      : null;

    const sunset = response.data.sys.sunset
      ? getLocalizedTime(response.data.sys.sunset, cityTimezone)
      : null;

    const cityDate = getLocalTime(cityTimezone);
    const clockHours = getPaddedClockText(cityDate.getHours());
    const clockMinutes = getPaddedClockText(cityDate.getMinutes());
    const sunriseText = getHHMM(sunrise);
    const sunsetText = getHHMM(sunset);

    const weatherData: IWeatherData = {
      temp,
      temp_min,
      temp_max,
      weatherDescription,
      sunriseText,
      sunsetText,
      iconUrl,
      clockHours,
      clockMinutes,
    };

    yield put(refreshCityWeather(weatherData));
  } catch (e) {
    if (e instanceof Error) {
      console.log(`ERROR FROM GENERATOR:${e.message}`);
      yield put(setError(e));
    }
  }
}

function* fetchCityWeatherSaga() {
  yield takeEvery(ActionType.FETCH_CITY_WEATHER, fetchCityWeather);
}

export default fork(fetchCityWeatherSaga);
