import {
  StyleSheet,
  TextInputAndroidProps,
  TextInputIOSProps,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { FieldRenderProps } from 'react-final-form';

interface Input {
  placeholder: string;
  secureTextEntry?: boolean;
  textContentType: TextInputIOSProps['textContentType'];
  autoComplete: TextInputAndroidProps['autoComplete'];
  style?: any;
}

const Input = ({
  placeholder,
  style,
  secureTextEntry,
  autoComplete,
  textContentType,
  input,
  meta,
}: FieldRenderProps<string, any> & Input) => {
  return (
    // @ts-ignore
    <TextInput
      {...input}
      placeholder={placeholder}
      autoCapitalize="none"
      autoComplete={autoComplete}
      textContentType={textContentType}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      style={[
        styles.regular,
        style,
        {
          borderColor: meta && meta.error && meta.touched ? 'red' : '#E2E8F0',
        },
      ]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  regular: {
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
});
