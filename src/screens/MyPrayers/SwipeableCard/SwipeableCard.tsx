/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Prayers } from 'types/interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';

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
  const prays = useSelector(selectors.pray.selectPrayes);

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
        <View style={styles.rectangle} />

        <Checkbox
          checked={data.checked}
          onPress={() => checkPrayer(data.id)}
          style={styles.checkbox}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Details', { ...data })}>
          <Text
            style={[
              { width: '65%' },
              data.checked && { textDecorationLine: 'line-through' },
            ]}>
            {data.title}
          </Text>
          <Image
            source={require('../../../assests/img/user.png')}
            style={styles.image}
          />
          <Text>1</Text>
          <Image
            source={require('../../../assests/img/pray.png')}
            style={styles.image}
          />
          <Text>{prays.find(pray => pray.id === data.id)?.count || '0'}</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  checkbox: { marginBottom: 2, marginRight: 10 },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    alignContent: 'center',
    paddingTop: 2,
  },
  image: {
    marginHorizontal: 5,
  },
  rectangle: {
    height: 22,
    width: 3,
    backgroundColor: '#AC5253',
    borderRadius: 50,
    marginRight: 10,
  },
});
