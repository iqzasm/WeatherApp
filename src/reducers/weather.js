const cityWeatherInitialState = {
  temp_min: 0,
  temp_max: 0,
  temp: 0,
  weather: '',
  sunrise: 0,
  sunset: 0,
  isLoading: false,
  error: '',
};

export const weather = (state = cityWeatherInitialState, action) => {
  switch (action.type) {
    case 'refreshCityWeather':
    case 'REFRESH_CITY_WEATHER':
      console.log('reducing now:::1');
      console.log(JSON.stringify(state, null, 4));
      console.log('reducing now:::2');
      console.log(JSON.stringify(action.payload, null, 4));

      return action.payload;
    case 'setLoading':
    case 'SET_LOADING':
      return { isLoading: true };
    case 'setError':
    case 'SET_ERROR':
      return { error: action.payload };
    default:
      return state;
  }
};
