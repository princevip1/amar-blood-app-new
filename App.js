import Navigation from './src/navigation/navigation';
import { NativeBaseProvider, extendTheme } from "native-base";
import 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react';
import AuthContextProvider from './src/context/authContext';
import RequestContextProvider from './src/context/requrstContext';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';

import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { LogBox } from 'react-native';
const newColorTheme = {
  primary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#D80132',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
};

const theme = extendTheme({ colors: newColorTheme });


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => {
      console.log(token);
    }
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);

    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);



  return (
    <AuthContextProvider>
      <RequestContextProvider>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Navigation></Navigation>
          </NavigationContainer>
        </NativeBaseProvider>
      </RequestContextProvider>
    </AuthContextProvider>
  );
}



async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token?.data
}