import { CreateScreen, IndexScreen, ShowScreen } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type AppStackParamList = {
  Index: undefined;
  Show: undefined;
  Create: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerStyle: {
          backgroundColor: globalStyles.header.backgroundColor,
        },
        headerTintColor: globalStyles.header.tintColor,
      }}
    >
      <Stack.Screen
        component={IndexScreen}
        name="Index"
        options={{
          title: t('index_screen.title'),
        }}
      />
      <Stack.Screen
        component={ShowScreen}
        name="Show"
        options={({ route }) => ({
          title: `${t('show_screen.title')} ${route.params.city}`,
        })}
      />
      <Stack.Screen
        component={CreateScreen}
        name="Create"
        options={{
          title: t('create_screen.title'),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
