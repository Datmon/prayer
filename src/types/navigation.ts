import { Prayers } from './interfaces';

export type RootStackParamList = {
  MyDesk: undefined;
  Main: { title: string; columnId: number };
  Details: Prayers;
  MyPrayers: { title: string; columnId: number };
  Subscribed: { title: string; columnId: number };
  SignIn: undefined;
  SignUp: undefined;
};
