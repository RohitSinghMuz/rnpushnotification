import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {useEffect} from 'react';

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFcmToken();
    }
  } catch (error) {
    console.log('Error requesting permission:', error);
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('old token', fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new generated fcm token ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

export const NotificationFunction = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  try {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log(
        'Notification caused app to open from quit state:',
        initialNotification.notification,
      );
    }
  } catch (error) {
    console.error('Error occurred while getting initial notification:', error);
  }
};
