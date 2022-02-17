import { Action, setCities, setError } from '../actions';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { ActionType } from '../action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCitiesFromStorageAsync = async () => {
  const jsonValue = await AsyncStorage.getItem('citiesList');

  console.log('GETTING list of cities from storage ASYNC:');
  console.log(jsonValue);

  const initialStateCities = jsonValue != null ? JSON.parse(jsonValue) : null;

  return initialStateCities;
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

function* setCitiesToStorageSaga() {
  yield takeEvery(ActionType.SET_CITIES_TO_STORAGE, setCitiesToStorageGR);
}

export default [fork(getCitiesFromStorageSaga), fork(setCitiesToStorageSaga)];
