import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreateScreen, IndexScreen, ShowScreen } from '../screens';

export type AppStackParamList = {
  Index: undefined;
  Show: undefined;
  Create: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Index"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      component={IndexScreen}
      name="Index"
      options={{
        title: 'Weather App',
      }}
    />
    <Stack.Screen
      component={ShowScreen}
      name="Show"
      options={({ route }) => ({
        title: `Weather Info for ${route.params.city}`,
      })}
    />
    <Stack.Screen component={CreateScreen} name="Create" />
  </Stack.Navigator>
);

export default AppNavigator;
