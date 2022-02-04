import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';

const Card = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const MyDesk = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MyDesk'>) => {
  //const columns = useSelector(selectors.auth.selectUserColumns);
  const columns = useSelector(selectors.columns.selectColumns);

  const dispatch = useDispatch();

  const getColumns = async () => {
    await dispatch(actions.columns.getColumns());
  };

  useEffect(() => {
    getColumns();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {columns &&
          columns.map(column => (
            <Card
              title={column.title}
              key={column.id}
              onPress={() => {
                ('');
              }}
            />
          ))}
        <Button title="Go to TODO" onPress={() => navigation.push('Main')} />
        <Button
          title="Get columns"
          onPress={() => console.log('columns', columns)}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyDesk;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    borderWidth: 1,
    padding: 15,
    borderColor: '#E5E5E5',
    marginVertical: 3,
  },
  text: {},
});
