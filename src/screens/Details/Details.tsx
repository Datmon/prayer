import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';

const Details = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Details'>) => {
  return (
    <View>
      <Text>{route.params.title}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
