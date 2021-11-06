export const addCity = payload => ({
  type: 'ADD_CITY',
  payload,
});

export const setCities = payload => ({
  type: 'set_cities',
  payload,
});

export const deleteCity = payload => ({
  type: 'delete_city',
  payload,
});

export const refreshCityWeather = payload => ({
  type: 'REFRESH_CITY_WEATHER',
  payload,
});

export const fetchCityWeather = payload => ({
  type: 'FETCH_CITY_WEATHER',
  payload,
});

export const setLoading = payload => ({
  type: 'SET_LOADING',
  payload,
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});
