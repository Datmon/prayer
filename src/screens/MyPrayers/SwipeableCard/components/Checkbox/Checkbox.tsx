import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CheckMark from 'assests/svg/CheckMark';

const Checkbox = ({
  checked,
  onPress,
  style,
}: {
  checked: boolean;
  onPress: () => void;
  style: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.box, style]}>{checked && <CheckMark />}</View>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 22,
    borderColor: '#514D47',
    borderWidth: 1,
    borderRadius: 4,
  },
});
