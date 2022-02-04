import AsyncStorage from '@react-native-async-storage/async-storage';

enum Key {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  AUTHORIZED_STATE = 'AUTHORIZED_STATE',
}

export const StorageService = {
  setAccessToken: (accessToken: string) => {
    console.log('accessToken', accessToken);
    return AsyncStorage.setItem(Key.ACCESS_TOKEN, accessToken);
  },
  removeAssessToken: () => {
    return AsyncStorage.removeItem(Key.ACCESS_TOKEN);
  },
  getAssessToken: () => {
    return AsyncStorage.getItem(Key.ACCESS_TOKEN);
  },
};
