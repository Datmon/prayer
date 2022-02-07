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
} from 'utils/validation';
import ClickableText from 'components/ClickableText/ClickableText';
import { actions } from 'store';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignIn'>) => {
  const dispatch = useDispatch();

  const signIn = async (data: { email: string; password: string }) => {
    console.log('data: ', data);
    const res: any = await dispatch(
      actions.auth.signIn({ email: data.email, password: data.password }),
    );
    if (res.payload.message) {
      Alert.alert('Error', res.payload.message, [{ text: 'Ok' }]);
    }
  };

  const temoraryAuth = async () => {
    await dispatch(actions.auth.setAccessToken('temporary'));
  };

  return (
    <SafeAreaView>
      <Form
        onSubmit={signIn}
        key={0}
        render={({ handleSubmit }) => (
          <>
            <Field name="email" validate={composeValidators(required, isEmail)}>
              {({ input, meta }) => (
                <Input
                  meta={meta}
                  input={input}
                  placeholder="Email"
                  autoComplete="email"
                  textContentType="emailAddress"
                  secureTextEntry={false}
                  style={styles.input}
                  auth
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
                  style={styles.input}
                  auth
                />
              )}
            </Field>

            <Button title="Sign in" onPress={handleSubmit} />
          </>
        )}
      />
      <ClickableText
        text="Move to sign up"
        onPress={() => navigation.navigate('SignUp')}
      />

      <ClickableText text="Temorary auth" onPress={temoraryAuth} />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
});
