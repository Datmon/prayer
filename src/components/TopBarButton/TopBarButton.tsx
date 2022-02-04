import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const TopBarButton = ({
  children,
  onPress,
  style,
}: {
  children: any;
  onPress: () => void;
  style?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.main]}>
      {children}
    </TouchableOpacity>
  );
};

export default TopBarButton;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 15,
  },
});
