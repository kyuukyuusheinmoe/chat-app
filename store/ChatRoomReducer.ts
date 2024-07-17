import { createSlice } from '@reduxjs/toolkit';
type UserProp = {
  id: number,
  name: string
}
type ChatRoomProp = {
  id: number,
  name: string,
  members: UserProp[]
}
interface ChatRoomState {
  activeRoom: ChatRoomProp | null;
}

const initialState: ChatRoomState = {
    activeRoom: null,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    updateActiveRoom: (state, action) => {
      return ({
      ...state, activeRoom: action?.payload
    })},
  },
});

export const { updateActiveRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
