import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/twilight';
import CreateScreen from './screens/CreateScreen';
import IndexScreen from './screens/IndexScreen';
import ShowScreen from './screens/ShowScreen';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Create: CreateScreen,
    Show: ShowScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'WeatherApp',
    },
  }
);

const App = createAppContainer(navigator);

export default () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SafeAreaProvider>
);
