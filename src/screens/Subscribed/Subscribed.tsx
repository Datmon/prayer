import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../types';

const Subscribed = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Subscribed'>) => {
  return (
    <View>
      <Text>Subscribed</Text>
      <Button title="Click" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Subscribed;

const styles = StyleSheet.create({});
