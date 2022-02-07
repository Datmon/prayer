/* eslint-disable react-native/no-inline-styles */
import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Prayers } from 'types/interfaces';

const SwipeableCard = ({ data }: { data: Prayers }) => {
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

  const swipeFromRightOpen = () => {
    Alert.alert('Swipe from right');
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}>
      <View style={styles.card}>
        <Text>{data.title}</Text>
      </View>
    </Swipeable>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
});
