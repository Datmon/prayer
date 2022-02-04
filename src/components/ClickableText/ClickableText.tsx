import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ClickableText = ({
  text,
  style,
  onPress,
}: {
  text: string;
  style?: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[style, styles.block]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ClickableText;

const styles = StyleSheet.create({
  block: {},
  text: { color: 'blue' },
});
