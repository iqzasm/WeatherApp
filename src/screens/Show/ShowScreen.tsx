import { Avatar, Icon } from 'react-native-elements';
import { fetchCityWeather, setError } from '../../actions';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState } from '../../reducers';
import { NavigationRoute } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './styles';

interface ShowScreenProps {
  navigation: NavigationStackProp;
  route: NavigationRoute;
  setErrorDispatch: typeof setError;
}

export default ({ route }: ShowScreenProps) => {
  const { cities, weather } = useSelector<
    IApplicationState,
    Pick<IApplicationState, 'cities' | 'weather'>
  >(state => ({
    cities: state.cities,
    weather: state.weather,
  }));

  const dispatch = useDispatch();

  const city = React.useMemo(
    () =>
      cities.find(
        // currentCity => currentCity === navigation.getParam('city')
        currentCity => currentCity === route.params?.city
      ),
    [cities, route?.params?.city]
  );

  useEffect(() => {
    if (city) {
      console.log('DISPATCHING fetchCityWeather');
      dispatch(fetchCityWeather(city));
    }
  }, [city, dispatch]);

  console.log(`RENDERING::${JSON.stringify(weather, null, 4)}`);

  if (weather.error) {
    return <Text style={styles.error}>{weather.error.message}</Text>;
  }

  if (weather && weather.isLoading) {
    return (
      // getSpinner()
      <Text>Loading...</Text>
    );
  }

  if (weather && weather.data !== null) {
    const weatherDetailsList = [
      { icon: 'thermometer', text: weather.data.temp },
      { icon: 'sunrise', text: weather.data.sunriseText },
      { icon: 'sunset', text: weather.data.sunsetText },
    ];

    console.log(`rendering now:::${weather.data.temp}`);

    return (
      <View style={styles.parent}>
        <Text style={styles.clockText}>{weather.data.clockHours}</Text>
        <Text style={styles.clockText}>{weather.data.clockMinutes}</Text>
        <Text style={styles.cityText}>{city}</Text>
        <Avatar
          rounded
          size="large"
          source={{
            uri: weather.data.iconUrl,
          }}
        />
        <Text style={styles.textHighlight}>
          {weather.data.weatherDescription}
        </Text>
        <View style={styles.weatherDetailsList}>
          {weatherDetailsList.map(({ icon, text }) => (
            <View key={icon} style={styles.weatherDetailsListItem}>
              <Icon color="#267DBD" name={icon} raised type="feather" />
              <Text style={styles.weatherText}>{text}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return <Text>Problem getting the Weather Details</Text>;
};
