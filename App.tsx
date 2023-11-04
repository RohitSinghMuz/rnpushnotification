import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  NotificationFunction,
  requestUserPermission,
} from './src/utils/PushNotification';
import Forgroundhandle from './src/utils/Forgroundhandle';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationFunction();
  }, []);

  return (
    <View>
      <Text>App</Text>
      <Forgroundhandle />
      <Text style={{color: 'green', fontSize: 22}}>Notification</Text>
    </View>
  );
};

export default App;
