import { Action, setAllCities, setCities, setError } from '../actions';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { ActionType, ICity } from '../action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCities } from '../services/cities';

const getCitiesFromStorageAsync = async () => {
  const jsonValue = await AsyncStorage.getItem('citiesList');

  console.log('GETTING list of cities from storage ASYNC:');
  console.log(jsonValue);

  const initialStateCities = jsonValue != null ? JSON.parse(jsonValue) : null;

  return initialStateCities;
};

const getAllCitiesFromStorageAsync = async () => {
  let jsonValue = await AsyncStorage.getItem('allCitiesList');

  console.log('GETTING list of cities from storage ASYNC:');
  console.log(jsonValue);

  let allCities: ICity[] = [];

  if (jsonValue != null) {
    allCities = JSON.parse(jsonValue);
  } else {
    const citiesApiResponse = await getAllCities();

    allCities = citiesApiResponse.data.data
      .reduce(
        (result: string[], { cities }: { cities: string[] }) =>
          result.concat(cities),
        []
      )
      .map((city: string, index: number) => ({ id: index, title: city }));

    jsonValue = JSON.stringify(allCities);

    await AsyncStorage.setItem('allCitiesList', jsonValue);

    console.log(`allCities.length:::${allCities.length}`);

    console.log(`allCities.title:::${allCities[allCities.length - 1].title}`);
  }

  return allCities;
};

function* getCitiesFromStorageGR() {
  try {
    const cities = yield call(getCitiesFromStorageAsync);

    if (Array.isArray(cities)) {
      yield put(setCities(cities));
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(`ERROR FROM GENERATOR:${e.message}`);
      yield put(setError(e));
    }
  }
}

function* getAllCitiesFromStorageGR() {
  try {
    const allCities = yield call(getAllCitiesFromStorageAsync);

    if (Array.isArray(allCities)) {
      yield put(setAllCities(allCities));
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(`ERROR FROM GENERATOR:${e.message}`);
      yield put(setError(e));
    }
  }
}

const setCitiesToStorageAsync = async (cities: string[]) => {
  const jsonValue = JSON.stringify(cities);

  await AsyncStorage.setItem('citiesList', jsonValue);
  console.log('setting list of cities during rendering:');
  console.log(jsonValue);
};

function* setCitiesToStorageGR(action: Action) {
  try {
    yield call(setCitiesToStorageAsync, action.payload);
  } catch (e) {
    if (e instanceof Error) {
      console.log(`ERROR FROM GENERATOR setCitiesToStorageGR:${e.message}`);
      yield put(setError(e));
    }
  }
}

function* getCitiesFromStorageSaga() {
  yield takeEvery(ActionType.GET_CITIES_FROM_STORAGE, getCitiesFromStorageGR);
}

function* getAllCitiesFromStorageSaga() {
  yield takeEvery(
    ActionType.GET_ALL_CITIES_FROM_STORAGE,
    getAllCitiesFromStorageGR
  );
}

function* setCitiesToStorageSaga() {
  yield takeEvery(ActionType.SET_CITIES_TO_STORAGE, setCitiesToStorageGR);
}

export default [
  fork(getCitiesFromStorageSaga),
  fork(setCitiesToStorageSaga),
  fork(getAllCitiesFromStorageSaga),
];
