import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { pages } from '../constants';
import HomePage from '../screens/HomePage';
import BookDetail from '../screens/BookDetail';
import CreatePage from '../screens/CreatePage';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { HOMEPAGE, BOOKDETAIL, CREATEPAGE } = pages;
  return (
    <Stack.Navigator>
      <Stack.Screen name={HOMEPAGE} component={HomePage} />
      <Stack.Screen name={BOOKDETAIL} component={BookDetail} />
      <Stack.Screen name={CREATEPAGE} component={CreatePage} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
