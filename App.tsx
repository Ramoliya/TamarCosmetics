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
import { Alert } from 'react-native';
import { navigate, navigationRef } from './src/component/NotificationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import OneSignal from 'react-native-onesignal';

interface PushSubscriptionChangedEvent {
  current?: { id?: string };
  previous?: { id?: string };
}

function App(): React.JSX.Element {

  // // Remove this method to stop OneSignal Debugging
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // // OneSignal Initialization
  // OneSignal.initialize(App_ID);

  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission


  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });

  // useEffect(()=>{
  //   OneSignal.Notifications.requestPermission(true);
  //   PermissionMethods.requestNotificationPermission()
  // },[])

  // useEffect(() => {
  //   // ✅ Initialize OneSignal
  //   //OneSignal.initialize(App_ID);
  //   console.log("initialize", OneSignal)
  //   OneSignal.Notifications.addEventListener('opened', event => {
  //     console.log("Notification opened:", event);


  //     //  console.log("Full event data:", event);
  //     //  console.log("additionalData:", event.notification?.additionalData);

  //     // const rawUrl = event?.notification?.additionalData?.url;
  //     // if (rawUrl) {
  //     //   const encodedUrl = encodeURI(rawUrl);
  //     //   console.log('Navigating with URL:', encodedUrl);
  //     //   navigate('HomeScreen', { url: encodedUrl }); // ✅ Actual navigation here
  //     // }

  //   });





  //   // const onSubscriptionChange = OneSignal.User.pushSubscription.addEventListener(
  //   //   'change',
  //   //   event => {
  //   //     const playerId = event?.current?.id;
  //   //     console.log('Player ID after subscription change:', playerId);
  //   //   }
  //   // );

  //   // ✅ Clean up listeners
  //   return () => {
  //     //   OneSignal.Notifications.removeEventListener('foregroundWillDisplay', onForegroundDisplay);
  //     // OneSignal.Notifications.removeEventListener('opened', onOpened);
  //     // OneSignal.User.pushSubscription.removeEventListener('change', onSubscriptionChange);
  //    };
  // }, []);



  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // Initialize with your OneSignal App ID
    OneSignal.initialize(App_ID);
    // Request permission for push notifications (recommended to do this via In-App Messages after testing)
    // For testing, you can call this directly.
    OneSignal.Notifications.requestPermission(true);

    // const onClickListener = event => {
    //   console.log('Notification clicked:', event);
    //   const url = event?.notification?.additionalData?.url;
    //   console.log("url", url)
    //   // if (url) {
    //   //   navigate('Home', { url });
    //   // }
    // };  // app are backround 

    // const onClickListener = async (event) => {
    //   console.log('Notification clicked:', event);
    //   const url = event?.notification?.additionalData?.url;
    //   console.log("url", url);
    //   if (url) {
    //     await AsyncStorage.setItem('pending_push_url', url);
    //   }
    // }; 
    // //app are killed mode 

    const onClickListener = async (event) => {
      console.log('Notification clicked:', event);
      const url = event?.notification?.additionalData?.url;
      console.log("url", url);
      if (url) {
        await AsyncStorage.setItem('pending_push_url', url);
      //  navigate('Home', { url });
        
       }
    };

    const onSubscriptionChange = (event: PushSubscriptionChangedEvent) => {
      const playerId = event?.current?.id;
      console.log('Player ID changed:', playerId);
      if (playerId) {
        navigate('Home', { playerId });
      }
    };
    OneSignal.Notifications.addEventListener('click', onClickListener);
    OneSignal.User.pushSubscription.addEventListener('change', onSubscriptionChange);
    OneSignal.User.pushSubscription.addEventListener('change', (event) => {
      console.log('OneSignal: Push Subscription State Changed:', event);
    });


    return () => {
      // Clean up event listeners if necessary (though for a global setup, often not needed on unmount)
      //
      //  OneSignal.Notifications.removeEventListener('foregroundWillDisplay');
      OneSignal.Notifications.removeEventListener('click', onClickListener);
      OneSignal.User.pushSubscription.removeEventListener('change', onSubscriptionChange);

    };
  }, []);

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
    PermissionMethods.requestNotificationPermission();
  }, []);

  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
  );
}



export default App;
