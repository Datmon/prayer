import React from 'react';
import {} from 'react-native';
import Navigation from './src/screens/Navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
