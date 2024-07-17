import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DocumentUpload from '../screens/DocumentUpload';
import CameraPage from '../screens/CameraPage';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
        animationTypeForReplace: 'push',
      }}
      initialRouteName="DocumentUpload">
      <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
