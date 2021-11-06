import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { addCity } from '../actions';

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});

const CreateScreen = ({ navigation, dispatch }) => {
  const [city, setCity] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter city:</Text>
      <TextInput
        onChangeText={text => setCity(text)}
        style={styles.input}
        value={city}
      />

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

export default connect()(CreateScreen);
