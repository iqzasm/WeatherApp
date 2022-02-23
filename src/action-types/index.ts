export enum ActionType {
  ADD_CITY = 'ADD_CITY',
  SET_CITIES = 'SET_CITIES',
  SET_ALL_CITIES = 'SET_ALL_CITIES',
  SET_CITIES_TO_STORAGE = 'SET_CITIES_TO_STORAGE',
  GET_CITIES_FROM_STORAGE = 'GET_CITIES_FROM_STORAGE',
  SET_ALL_CITIES_TO_STORAGE = 'SET_ALL_CITIES_TO_STORAGE',
  GET_ALL_CITIES_FROM_STORAGE = 'GET_ALL_CITIES_FROM_STORAGE',
  DELETE_CITY = 'DELETE_CITY',
  REFRESH_CITY_WEATHER = 'REFRESH_CITY_WEATHER',
  FETCH_CITY_WEATHER = 'FETCH_CITY_WEATHER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

export interface IWeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  weatherDescription: string;
  sunriseText: string;
  sunsetText: string;
  iconUrl: string;
  clockHours: string;
  clockMinutes: string;
}

export interface ICityWeatherState {
  data: IWeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

export interface IWeatherAPIResponse {
  data: {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    timezone: number;
    weather: {
      description: string;
      icon: string;
    }[];
    sys: {
      sunrise: number;
      sunset: number;
    };
  };
}

export interface ICitiesAPIResponse {
  data: [{ cities: string[] }];
}

export interface ICity {
  id: number;
  title: string;
}
