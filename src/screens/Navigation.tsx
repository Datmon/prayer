import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Settings from 'assests/svg/Settings';
import TopBarButton from 'components/TopBarButton';
import { StorageService } from 'services';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { columns } from 'api';

const TaskStack = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.auth.selectAccessToken);
  console.log('accessToken', accessToken);

  const [columnTitle, setColumnTitle] = useState('');

  const signOut = async () => {
    const res = await dispatch(actions.auth.signOut());
  };

  const getToken = async () => {
    const token = await StorageService.getAssessToken();
    if (token) {
      await dispatch(actions.auth.setAccessToken(token));
    }
    console.log('getToken: ', token);
  };

  const addColumn = async (value: string) => {
    const res = await columns.addColumn(value);
    getColumns();
  };

  const deleteColumn = async (value: string) => {
    const res = await columns.deleteColumn(value);
    getColumns();
  };

  const getColumns = async () => {
    const res = await dispatch(actions.columns.getColumns());
    console.log('getting columns', res);
  };

  useEffect(() => {
    getToken();
  }, [accessToken]);

  const Main = ({
    route,
  }: NativeStackScreenProps<RootStackParamList, 'Main'>) => (
    <TaskStack.Navigator
      sceneContainerStyle={{
        backgroundColor: '#FFFFFF',
      }}>
      <TaskStack.Screen
        name="MyPrayers"
        component={MyPrayers}
        initialParams={{
          title: route.params.title,
          columnId: route.params.columnId,
        }}
      />
      <TaskStack.Screen
        name="Subscribed"
        component={Subscribed}
        initialParams={{
          title: route.params.title,
          columnId: route.params.columnId,
        }}
      />
    </TaskStack.Navigator>
  );

  return !accessToken ? (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}>
        <HomeStack.Screen name="SignIn" component={SignIn} />
        <HomeStack.Screen name="SignUp" component={SignUp} />
      </HomeStack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="MyDesk"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}>
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
            headerRight: () => (
              <TopBarButton
                onPress={() =>
                  Alert.prompt('Adding', 'Please enter column name', value =>
                    addColumn(value),
                  )
                }>
                <Image source={require('../assests/img/plusMain.png')} />
              </TopBarButton>
            ),
          }}
        />
        <HomeStack.Screen
          name="Main"
          component={Main}
          options={({ route }: any) => ({
            title: route.params.title,
            headerBackTitle: ' ',
            headerRight: () => (
              <TopBarButton onPress={() => deleteColumn(route.params.columnId)}>
                <Settings />
              </TopBarButton>
            ),
          })}
        />
        <HomeStack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
