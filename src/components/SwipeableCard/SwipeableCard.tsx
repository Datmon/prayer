/* eslint-disable react-native/no-inline-styles */
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Prayers } from 'types/interfaces';

import { useDispatch } from 'react-redux';
import { actions } from 'store';

import Checkbox from './components/Checkbox';

const SwipeableCard = ({
  data,
  getPrayers,
  navigation,
}: {
  data: Prayers;
  getPrayers: () => void;
  navigation: any;
}) => {
  const dispatch = useDispatch();
  const checkPrayer = async (prayerId: number) => {
    const res: any = await dispatch(
      actions.prayers.checkPrayer({ prayerId: data.id, body: data }),
    );
    if (res.payload.message) {
      Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
    }
  };

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
          onPress={() => checkPrayer(data.id)}
          style={styles.checkbox}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Details', { ...data })}>
          <Text style={data.checked && { textDecorationLine: 'line-through' }}>
            {data.title}
          </Text>
        </TouchableOpacity>
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
  touchable: {
    height: '100%',
    width: '100%',
    alignContent: 'center',
    paddingTop: 2,
  },
});
