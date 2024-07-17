// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import ChatRoomReducer from './store/ChatRoomReducer';

const store = configureStore({
  reducer: {
    chatRoom: ChatRoomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
