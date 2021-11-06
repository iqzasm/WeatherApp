import { call, put, takeEvery } from 'redux-saga/effects';
import { refreshCityWeather, setError, setLoading } from '../actions';
import { getWeather, getWeatherIconUrl } from '../services/weather';
import {
  getHHMM,
  getLocalizedTime,
  getLocalTime,
  getPaddedClockText,
} from '../utils';

function getCityWeather(city) {
  return getWeather(city);
}

function* fetchCityWeather(action) {
  yield put(setLoading());

  try {
    const response = yield call(getCityWeather, action.payload);

    console.log(`TEMP:::${response.data.main.temp}`);

    const { temp, temp_min, temp_max } = response.data.main;
    const weatherDescription = response.data.weather[0].description;
    const iconcode = response.data.weather[0].icon;
    const iconUrl = iconcode ? getWeatherIconUrl(iconcode) : undefined;
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

    const weatherData = {
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
    console.log(`ERROR FROM GENERATOR:${e.message}`);
    yield put(setError(e));
  }
}

function* twilightSaga() {
  yield takeEvery('FETCH_CITY_WEATHER', fetchCityWeather);
}

export default twilightSaga;
