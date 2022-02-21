import { Alert, Button, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {
  composeValidators,
  required,
  isEmail,
  minLength,
} from '../../../utils/validation';
import { auth } from '../../../api';
import ClickableText from '../../../components/ClickableText/ClickableText';
import { actions } from 'store';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) => {
  const dispatch = useDispatch();

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    console.log('data: ', data);
    if (data.email && data.password && data.name) {
      const res: any = await auth.signUp(data.name, data.email, data.password);
      console.log('res', res);
      if (res.data.message) {
        Alert.alert('Error sign up', res.data.message, [{ text: 'Ok' }]);
      } else {
        await dispatch(
          actions.auth.signIn({ email: data.email, password: data.password }),
        );
      }
    }
  };

  return (
    <SafeAreaView>
      <Form
        onSubmit={signUp}
        key={0}
        render={({ handleSubmit }) => (
          <>
            <Field
              name="name"
              validate={composeValidators(required, minLength(3))}>
              {({ input, meta }) => (
                <Input
                  meta={meta}
                  input={input}
                  placeholder="Name"
                  autoComplete="name"
                  textContentType="name"
                  secureTextEntry={false}
                />
              )}
            </Field>
            <Field name="email" validate={composeValidators(required, isEmail)}>
              {({ input, meta }) => (
                <Input
                  meta={meta}
                  input={input}
                  placeholder="Email"
                  autoComplete="email"
                  textContentType="emailAddress"
                  secureTextEntry={false}
                />
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, minLength(6))}>
              {({ input, meta }) => (
                <Input
                  meta={meta}
                  input={input}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoComplete="password"
                  textContentType="password"
                />
              )}
            </Field>

            <Button title="Sign up" onPress={handleSubmit} />
          </>
        )}
      />
      <ClickableText
        text="Move to sign in"
        onPress={() => navigation.navigate('SignIn')}
      />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
