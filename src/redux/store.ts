import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for persistence
import navigationReducer from './slices/navigation-slice';
import uploadFeedbackReducer from './slices/upload-feedback-slice';
import { combineReducers } from 'redux';

// Combine reducers
const rootReducer = combineReducers({
  navigationState: navigationReducer,
  uploadFeedbackState: uploadFeedbackReducer,
});

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization warning for persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;