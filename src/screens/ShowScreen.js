import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  fetchCityWeather,
  refreshCityWeather,
  setError,
  setLoading,
} from '../actions';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  textHighlight: {
    color: '#93B7CC',
    fontWeight: 'bold',
    fontSize: 24,
  },
  parent: {
    backgroundColor: '#132434',
    flex: 1,
    alignItems: 'center',
  },
  weatherDetailsList: {
    // backgroundColor: 'red',
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDetailsListItem: {
    // backgroundColor: '#172',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockText: {
    fontSize: 48,
    color: '#267DBD',
  },
  cityText: {
    fontSize: 48,
    color: '#93B7CC',
  },
  weatherText: {
    fontSize: 16,
    color: '#93B7CC',
  },
});

const ShowScreen = ({
  navigation,
  cities,
  weather,
  fetchCityWeather,
  setLoading,
  setError,
}) => {
  const city = cities.find(city => city === navigation.getParam('city'));

  useEffect(() => {
    setLoading();

    fetchCityWeather(city);
  }, [city, fetchCityWeather, setLoading]);

  console.log(`rendering now:::${weather.temp}`);
  console.log('RENDERING::' + JSON.stringify(weather, null, 4));

  const weatherDetailsList = [
    { icon: 'thermometer', text: weather.temp },
    { icon: 'sunrise', text: weather.sunriseText },
    { icon: 'sunset', text: weather.sunsetText },
  ];

  if (weather.error) {
    return <Text style={styles.error}>{weather.error.message}</Text>;
  }

  return weather.isLoading ? (
    // getSpinner()
    <Text>Loading...</Text>
  ) : (
    <View style={styles.parent}>
      <Text style={styles.clockText}>{weather.clockHours}</Text>
      <Text style={styles.clockText}>{weather.clockMinutes}</Text>
      <Text style={styles.cityText}>{city}</Text>
      <Avatar
        color="red"
        rounded
        size="large"
        source={{
          uri: weather.iconUrl,
        }}
      />
      <Text style={styles.textHighlight}>{weather.weatherDescription}</Text>
      <View style={styles.weatherDetailsList}>
        {weatherDetailsList.map((weatherDetail, index) => (
          <View key={index} style={styles.weatherDetailsListItem}>
            <Icon
              key={index}
              color="#267DBD"
              name={weatherDetail.icon}
              raised
              type="feather"
            />
            <Text style={styles.weatherText}>{weatherDetail.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  cities: state.cities,
  weather: state.weather,
});

const mapDispatchToProps = dispatch => ({
  refreshCityWeather: weatherData => dispatch(refreshCityWeather(weatherData)),
  fetchCityWeather: city => dispatch(fetchCityWeather(city)),
  setLoading: () => dispatch(setLoading()),
  setError: error => dispatch(setError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowScreen);
