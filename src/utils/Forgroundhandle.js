import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

export default Forgroundhandle = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification in foreground:', remoteMessage);
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: 'Android App',
        body: 'Test Body',
        soundName: 'default',
        playSound: true,
        vibrate: true,
      });
    });
    return unSubscribe;
  }, []);
  return null;
};
