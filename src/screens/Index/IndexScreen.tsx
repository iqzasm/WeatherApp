import {
  Action,
  deleteCity,
  getCitiesFromStorage,
  setCities,
  setCitiesToStorage,
  setError,
} from '../../actions';
import { Avatar, Card, ListItem } from 'react-native-elements';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IApplicationState } from '../../reducers';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './styles';

const renderListItemRNE = (
  { item }: ListRenderItemInfo<string>,
  navigation: NavigationStackProp,
  deleteCityDispatch: (payload: string) => Action
) => (
  <TouchableOpacity onPress={() => navigation.navigate('Show', { city: item })}>
    <Card containerStyle={styles.containerStyle}>
      <ListItem bottomDivider>
        <Avatar source={{ uri: 'http://openweathermap.org/img/w/04d.png' }} />
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
          <ListItem.Subtitle>{item}</ListItem.Subtitle>
        </ListItem.Content>

        <TouchableOpacity onPress={() => deleteCityDispatch(item)}>
          <Icon name="trash" style={styles.icon} />
        </TouchableOpacity>
        <ListItem.Chevron />
      </ListItem>
    </Card>
  </TouchableOpacity>
);

interface IndexScreenProps {
  navigation: NavigationStackProp;
  cities: string[];
  deleteCityDispatch: typeof deleteCity;
  setCitiesDispatch: typeof setCities;
}

const IndexScreen = ({ navigation }: IndexScreenProps) => {
  const cities: string[] = useSelector<IApplicationState>(
    state => state.cities
  );

  const dispatch = useDispatch();

  const getCitiesFromStorageCB = React.useCallback(() => {
    try {
      dispatch(getCitiesFromStorage());
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        dispatch(setError(e));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getCitiesFromStorageCB();
  }, [getCitiesFromStorageCB]);

  const setCitiesToStorageCB = React.useCallback(() => {
    dispatch(setCitiesToStorage(cities));
  }, [cities, dispatch]);

  useEffect(() => {
    setCitiesToStorageCB();
  }, [cities, setCitiesToStorageCB]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log('Create button');
            navigation.navigate('Create');
          }}
        >
          <Icon color="white" name="plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const deleteCityDispatch = React.useCallback(
    (city: string) => dispatch(deleteCity(city)),
    [dispatch]
  );

  return (
    <View>
      <FlatList
        data={cities}
        keyExtractor={city => city}
        renderItem={item =>
          renderListItemRNE(item, navigation, deleteCityDispatch)
        }
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }: IndexScreenProps) => ({
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

export default IndexScreen;
