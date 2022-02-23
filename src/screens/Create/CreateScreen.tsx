/* eslint-disable arrow-body-style */
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { addCity, getAllCitiesFromStorage, setError } from '../../actions';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-native-elements';
import { ICity } from '../../action-types';
import { IApplicationState } from '../../reducers';

interface CreateScreenProps {
  navigation: NavigationStackProp;
}

export default ({ navigation }: CreateScreenProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cities: ICity[] = useSelector<IApplicationState>(
    state => state.allCities
  );

  // For Main Data
  const [allCitiesState, setAllCitiesState] = useState<ICity[]>([]);
  // For Filtered Data
  const [filteredCitiesState, setFilteredCitiesState] = useState<ICity[]>([]);

  // useEffect(() => {
  //   fetch('https://countriesnow.space/api/v0.1/countries')
  //     .then(res => res.json())
  //     .then(json => {
  //       const allCities = json.data
  //         .reduce((result: string[], { cities }: { cities: string[] }) => {
  //           return result.concat(cities);
  //         }, [])
  //         .map((city: string, index: number) => ({ id: index, title: city }));

  //       setAllCitiesState(allCities);

  //       console.log(`citiesList.length:::${allCities.length}`);

  //       console.log(
  //         `citiesList.title:::${allCities[allCities.length - 1].title}`
  //       );
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
  // }, []);

  const getAllCitiesFromStorageCB = React.useCallback(() => {
    try {
      dispatch(getAllCitiesFromStorage());
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        dispatch(setError(e));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getAllCitiesFromStorageCB();
  }, [getAllCitiesFromStorageCB]);

  const filterCities = (text: string) => {
    const filteredCities = cities.filter((city: ICity) =>
      city.title.startsWith(text)
    );

    setFilteredCitiesState(filteredCities);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ city: '' }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          dispatch(addCity(values.city));
          navigation.navigate('Index');
        }}
      >
        {props => {
          const listClick = (cityname: string) => {
            props.setValues({ city: cityname });
          };

          return (
            <View style={styles.container}>
              <Text style={styles.label}>
                {t('create_screen.label_enter_city')}
              </Text>
              <TextInput
                onChangeText={(text: string) => {
                  props.handleChange('city')(text);
                  filterCities(text);
                }}
                // onChangeText={props.handleChange('city')}
                placeholder={t('create_screen.placeholder_enter_city')}
                style={globalStyles.input}
                value={props.values.city}
              />
              <Button
                color={globalStyles.button.color}
                disabled={!props.values.city}
                onPress={props.handleSubmit}
                title={t('create_screen.btn_add_city')}
              />

              <FlatList
                data={filteredCitiesState}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => listClick(item.title)}>
                      <Card containerStyle={styles.cardStyle}>
                        <Text>{item.title}</Text>
                      </Card>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
