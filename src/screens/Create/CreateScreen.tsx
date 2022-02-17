import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { addCity } from '../../actions';
import styles from './styles';

interface CreateScreenProps {
  navigation: NavigationStackProp;
}

export default ({ navigation }: CreateScreenProps) => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter city:</Text>
      <TextInput onChangeText={setCity} style={styles.input} value={city} />
      <Button
        disabled={!city}
        onPress={() => {
          dispatch(addCity(city));
          navigation.navigate('Index');
        }}
        title="Add City"
      />
    </View>
  );
};
