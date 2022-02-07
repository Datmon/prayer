/* eslint-disable react-native/no-inline-styles */
import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Prayers } from 'types/interfaces';

import { useDispatch } from 'react-redux';
import { actions } from 'store';

import Checkbox from './components/Checkbox';

const SwipeableCard = ({
  data,
  getPrayers,
}: {
  data: Prayers;
  getPrayers: () => void;
}) => {
  const dispatch = useDispatch();
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#AC5253',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          Delete
        </Text>
      </View>
    );
  };

  const swipeFromRightOpen = async () => {
    const res: any = await dispatch(actions.prayers.deletePrayer(data.id));
    if (res.payload.message) {
      Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
    }
    //getPrayers();
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}>
      <View style={styles.card}>
        <Checkbox
          checked={data.checked}
          onPress={() => {}}
          style={styles.checkbox}
        />
        <Text>{data.title}</Text>
      </View>
    </Swipeable>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  checkbox: { marginBottom: 2, marginRight: 10 },
});
