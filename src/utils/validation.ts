export const required = (value: string) =>
  value ? undefined : 'This field is required';

export const minLength = (min: number) => (value: string) =>
  value.length >= min ? undefined : `Should be longer than ${min} symbols`;

export const isEmail = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const isSame = (firsPass: string) => (value: string) =>
  firsPass === value ? undefined : 'Passwords does not match';

export const composeValidators =
  (...validators: any) =>
  (value: any) =>
    validators.reduce(
      (error: any, validator: (arg0: any) => any) => error || validator(value),
      undefined,
    );
