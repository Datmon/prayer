import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDesk from './MyDesk';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPrayers from './MyPrayers';
import Subscribed from './Subscribed';
import Details from './Details';

const TaskStack = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();

const Main = () => (
  <TaskStack.Navigator>
    <TaskStack.Screen name="MyPrayers" component={MyPrayers} />
    <TaskStack.Screen name="Subscribed" component={Subscribed} />
  </TaskStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <HomeStack.Navigator initialRouteName="Main">
      <HomeStack.Screen name="MyDesk" component={MyDesk} />
      <HomeStack.Screen name="Main" component={Main} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
  </NavigationContainer>
);

export default Navigation;

const styles = StyleSheet.create({});
