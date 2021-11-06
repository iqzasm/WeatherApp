import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { deleteCity, setCities } from '../actions';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  containerStyle: {
    padding: 0,
  },
});

const renderListItemRNE = ({ item }, navigation, deleteCity) => (
  <TouchableOpacity onPress={() => navigation.navigate('Show', { city: item })}>
    <Card containerStyle={styles.containerStyle}>
      <ListItem bottomDivider>
        <Avatar source={{ uri: 'http://openweathermap.org/img/w/04d.png' }} />
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
          <ListItem.Subtitle>{item}</ListItem.Subtitle>
        </ListItem.Content>

        <TouchableOpacity onPress={() => deleteCity(item)}>
          <Icon name="trash" style={styles.icon} />
        </TouchableOpacity>
        <ListItem.Chevron />
      </ListItem>
    </Card>
  </TouchableOpacity>
);

const IndexScreen = ({ navigation, cities, deleteCity, setCities }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('citiesList');

        console.log('GETTING list of cities during rendering:');
        console.log(jsonValue);

        const initialStateCities =
          jsonValue != null ? JSON.parse(jsonValue) : null;

        if (initialStateCities && Array.isArray(initialStateCities)) {
          setCities(initialStateCities);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    fetchData();
  }, [setCities]);

  useEffect(() => {
    const runAsync = async () => {
      const jsonValue = JSON.stringify(cities);

      await AsyncStorage.setItem('citiesList', jsonValue);
      console.log('setting list of cities during rendering:');
      console.log(jsonValue);
    };

    runAsync();
  }, [cities]);

  return (
    <View>
      <FlatList
        data={cities}
        keyExtractor={city => city}
        renderItem={item => renderListItemRNE(item, navigation, deleteCity)}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        console.log('Create button');
        navigation.navigate('Create');
      }}
    >
      <Icon name="plus" size={30} />
    </TouchableOpacity>
  ),
});

const mapStateToProps = state => ({
  cities: state.cities,
});

const mapDispatchToProps = dispatch => ({
  deleteCity: city => dispatch(deleteCity(city)),
  setCities: cities => dispatch(setCities(cities)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);
