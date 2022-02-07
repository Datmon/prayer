import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';

const MyDesk = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'MyDesk'>) => {
  const [isLoading, setIsLoading] = useState(false);

  const columns = useSelector(selectors.columns.selectColumns);
  const accessToken = useSelector(selectors.auth.selectAccessToken);

  const dispatch = useDispatch();

  const getColumns = async () => {
    setIsLoading(true);
    const res = await dispatch(actions.columns.getColumns());
    console.log('getting columns', res);
    setIsLoading(false);
  };

  const Card = ({ title, columnId }: { title: string; columnId: number }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Main', { title, columnId })}
      style={styles.card}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (accessToken) {
      getColumns();
    }
  }, [accessToken]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {!isLoading &&
          columns[0] &&
          columns.map(column => (
            <Card title={column.title} key={column.id} columnId={column.id} />
          ))}
        <Button title="Get columns" onPress={() => getColumns()} />
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
