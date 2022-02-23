import { ActionType, ICity, IWeatherData } from '../action-types';

interface AddCityAction {
  type: ActionType.ADD_CITY;
  payload: string;
}

interface SetCitiesAction {
  type: ActionType.SET_CITIES;
  payload: string[];
}
interface SetAllCitiesAction {
  type: ActionType.SET_ALL_CITIES;
  payload: ICity[];
}
interface SetCitiesToStorageAction {
  type: ActionType.SET_CITIES_TO_STORAGE;
  payload: string[];
}
interface GetCitiesFromStorageAction {
  type: ActionType.GET_CITIES_FROM_STORAGE;
  payload: undefined;
}
interface SetAllCitiesToStorageAction {
  type: ActionType.SET_ALL_CITIES_TO_STORAGE;
  payload: string[];
}
interface GetAllCitiesFromStorageAction {
  type: ActionType.GET_ALL_CITIES_FROM_STORAGE;
  payload: undefined;
}

interface DeleteCityAction {
  type: ActionType.DELETE_CITY;
  payload: string;
}

interface RefreshCityAction {
  type: ActionType.REFRESH_CITY_WEATHER;
  payload: IWeatherData;
}

interface FetchCityAction {
  type: ActionType.FETCH_CITY_WEATHER;
  payload: string;
}

interface SetLoadingAction {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: ActionType.SET_ERROR;
  payload: Error;
}

export type Action =
  | AddCityAction
  | SetCitiesAction
  | SetAllCitiesAction
  | SetCitiesToStorageAction
  | GetCitiesFromStorageAction
  | SetAllCitiesToStorageAction
  | GetAllCitiesFromStorageAction
  | DeleteCityAction
  | RefreshCityAction
  | FetchCityAction
  | SetLoadingAction
  | SetErrorAction;

export const addCity = (payload: string): AddCityAction => ({
  type: ActionType.ADD_CITY,
  payload,
});

export const setCities = (payload: string[]): SetCitiesAction => ({
  type: ActionType.SET_CITIES,
  payload,
});

export const setAllCities = (payload: ICity[]): SetAllCitiesAction => ({
  type: ActionType.SET_ALL_CITIES,
  payload,
});

export const setCitiesToStorage = (
  payload: string[]
): SetCitiesToStorageAction => ({
  type: ActionType.SET_CITIES_TO_STORAGE,
  payload,
});

export const getCitiesFromStorage = (): GetCitiesFromStorageAction => ({
  type: ActionType.GET_CITIES_FROM_STORAGE,
  payload: undefined,
});

export const getAllCitiesFromStorage = (): GetAllCitiesFromStorageAction => ({
  type: ActionType.GET_ALL_CITIES_FROM_STORAGE,
  payload: undefined,
});

export const deleteCity = (payload: string): DeleteCityAction => ({
  type: ActionType.DELETE_CITY,
  payload,
});

export const refreshCityWeather = (
  payload: IWeatherData
): RefreshCityAction => ({
  type: ActionType.REFRESH_CITY_WEATHER,
  payload,
});

export const fetchCityWeather = (payload: string) => ({
  type: ActionType.FETCH_CITY_WEATHER,
  payload,
});

export const setLoading = (payload: boolean): SetLoadingAction => ({
  type: ActionType.SET_LOADING,
  payload,
});

export const setError = (payload: Error) => ({
  type: ActionType.SET_ERROR,
  payload,
});
