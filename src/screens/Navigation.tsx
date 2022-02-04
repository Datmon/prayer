import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDesk from './MyDesk';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPrayers from './MyPrayers';
import Subscribed from './Subscribed';
import Details from './Details';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import { useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import { useDispatch } from 'react-redux';
import ClickableText from '../components/ClickableText/ClickableText';
import Settings from 'assests/svg/Settings';
import TopBarButton from 'components/TopBarButton';
import { StorageService } from 'services';
import axios from 'axios';

const TaskStack = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();

const Main = () => (
  <TaskStack.Navigator>
    <TaskStack.Screen name="MyPrayers" component={MyPrayers} />
    <TaskStack.Screen name="Subscribed" component={Subscribed} />
  </TaskStack.Navigator>
);

const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.auth.selectAccessToken);
  console.log('accessToken', accessToken);

  const signOut = async () => {
    const res = await dispatch(actions.auth.signOut());
  };

  const getToken = async () => {
    const token = await StorageService.getAssessToken();
    if (token) {
      dispatch(actions.auth.setAccessToken(token));
    }
    console.log('getToken: ', token);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
    } else {
      axios.defaults.headers.common.Authorization = false;
      /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
    }
  }, [accessToken]);

  return !accessToken ? (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="SignIn">
        <HomeStack.Screen name="SignIn" component={SignIn} />
        <HomeStack.Screen name="SignUp" component={SignUp} />
      </HomeStack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="MyDesk">
        <HomeStack.Screen
          name="MyDesk"
          component={MyDesk}
          options={{
            title: 'My Desk',
            headerLeft: () => (
              <TopBarButton onPress={signOut}>
                <Text>Sign out</Text>
              </TopBarButton>
            ),
          }}
        />
        <HomeStack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'To do',
            headerBackTitle: ' ',
            headerRight: () => (
              <TopBarButton onPress={() => Alert.alert('Settings')}>
                <Settings />
              </TopBarButton>
            ),
          }}
        />
        <HomeStack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: '#BFB393',
              paddingHorizontal: 15,
            },
            headerRight: () => (
              <Button
                onPress={() => Alert.alert('This is a button!')}
                title="Info"
                color="white"
              />
            ),
            headerBackTitle: ' ',
            headerTitleStyle: {
              color: 'white',
              fontSize: 17,
            },
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
