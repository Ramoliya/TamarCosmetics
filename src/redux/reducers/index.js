import { combineReducers } from "redux";
import user from './userReducer';
import other from './otherReducer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from "@reduxjs/toolkit";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducers = combineReducers({
    user,
    other,
});


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    blacklist: ['other'],
    stateReconciler: autoMergeLevel2
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

 export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //  middleware: [thunk]
  });

  export const persistor = persistStore(store)


