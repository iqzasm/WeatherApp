import { ActionType, ICityWeatherState } from '../action-types';
import { Action } from '../actions';

const cityWeatherInitialState: ICityWeatherState = {
  // data: {
  //   temp: 0,
  //   temp_max: 0,
  //   temp_min: 0,
  //   sunriseText: '',
  //   sunsetText: '',
  //   weatherDescription: '',
  //   iconUrl: '',
  //   clockHours: '',
  //   clockMinutes: '',
  // },
  data: null,
  isLoading: false,
  error: null,
};

export const weather = (
  state: ICityWeatherState = cityWeatherInitialState,
  action: Action
): ICityWeatherState => {
  switch (action.type) {
    case ActionType.REFRESH_CITY_WEATHER:
      console.log('reducing now:::1');
      console.log(JSON.stringify(state, null, 4));
      console.log('reducing now:::2');
      console.log(JSON.stringify(action.payload, null, 4));

      return { isLoading: false, data: action.payload, error: null };
    case ActionType.SET_LOADING:
      return { isLoading: true, data: null, error: null };
    case ActionType.SET_ERROR:
      return { error: action.payload, isLoading: false, data: null };
    default:
      return state;
  }
};
