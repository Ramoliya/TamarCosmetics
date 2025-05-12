/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/reducers';
import StackNavigator from './src/navigation/StackNavigator';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { App_ID } from './src/utils/Constants';
import PermissionMethods from './src/utils/PermissionMethods';


function App(): React.JSX.Element {

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(App_ID);

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission


  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });

  useEffect(()=>{
    OneSignal.Notifications.requestPermission(true);
    PermissionMethods.requestNotificationPermission()
  },[])


  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
  );
}



export default App;
