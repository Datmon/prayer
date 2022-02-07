/* eslint-disable react-native/no-inline-styles */
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Field, Form } from 'react-final-form';
import { composeValidators, minLength, required } from 'utils/validation';
import Input from 'components/Input';
import SwipeableCard from 'components/SwipeableCard';
import { Prayers } from 'types/interfaces';

const MyPrayers = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'MyPrayers'>) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const prayers = useSelector(selectors.prayers.selectPrayers);

  const getPrayers = async () => {
    setIsLoading(true);
    const res = await dispatch(actions.prayers.getPrayers());
    console.log('getting prayers', res);
    setIsLoading(false);
  };

  const postPrayer = async (data: { prayerTitle: string }) => {
    const res: any = await dispatch(
      actions.prayers.postPrayer({
        columnId: route.params.columnId,
        body: { title: data.prayerTitle, checked: false, description: '' },
      }),
    );
    if (res.payload.message) {
      Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
    }
  };

  useEffect(() => {
    getPrayers();
  }, []);

  return (
    <View>
      <Form
        onSubmit={postPrayer}
        key={0}
        render={({ handleSubmit }) => (
          <>
            <Field
              name="prayerTitle"
              validate={composeValidators(required, minLength(3))}>
              {({ input, meta }) => (
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor:
                        meta && meta.error && meta.touched ? 'red' : '#E2E8F0',
                    },
                  ]}>
                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={handleSubmit}>
                    <Image source={require('../../assests/img/plus.png')} />
                  </TouchableOpacity>
                  <Input
                    meta={meta}
                    input={input}
                    placeholder="Email"
                    autoComplete="email"
                    textContentType="emailAddress"
                    secureTextEntry={false}
                    style={styles.input}
                  />
                </View>
              )}
            </Field>
          </>
        )}
      />
      {isLoading ? (
        <Text>Is loading</Text>
      ) : (
        prayers &&
        prayers
          .filter(card => card.columnId === route.params.columnId)
          .map(data => (
            <SwipeableCard key={data.id} data={data} getPrayers={getPrayers} />
          ))
      )}
      <Button title="Get preayers" onPress={() => getPrayers()} />
    </View>
  );
};

export default MyPrayers;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusButton: {
    paddingHorizontal: 10,
  },
  plusSign: {
    fontSize: 24,
    width: 20,
  },
  input: {
    height: 50,
    width: '100%',
    fontSize: 17,
  },
});
