import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatRoomState {
  activeRoom: number | null;
}

const initialState: ChatRoomState = {
    activeRoom: null,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    updateActiveRoom: (state, action) => ({
      ...state, activeRoom: action?.payload?.activeRoom
    }),
  },
});

export const { updateActiveRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
