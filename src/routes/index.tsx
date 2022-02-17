import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';

const Routes = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default Routes;
