import { Button, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { addCity } from '../../actions';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/global';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface CreateScreenProps {
  navigation: NavigationStackProp;
}

export default ({ navigation }: CreateScreenProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        {props => (
          <View style={styles.container}>
            <Text style={styles.label}>
              {t('create_screen.label_enter_city')}
            </Text>
            <TextInput
              onChangeText={props.handleChange('city')}
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
          </View>
        )}
      </Formik>
    </View>
  );
};
