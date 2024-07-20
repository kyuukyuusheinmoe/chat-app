import { MessageProp } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
type UserProp = {
  id: number,
  name: string
}
type ChatRoomProp = {
  id: number,
  name: string,
  members: UserProp[],
  messages: MessageProp[]
}
interface ChatRoomState {
  rooms: ChatRoomProp[],
  activeRoom: ChatRoomProp | null;
}

const initialState: ChatRoomState = {
    rooms: [],
    activeRoom: null,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    updateRooms: (state, action) => {
      return ({
      ...state, rooms: action?.payload
    })},
    updateActiveRoom: (state, action) => {
      return ({
      ...state, activeRoom: action?.payload
    })},
    updateMessages: (state, action) => {
      if (action.payload?.roomId)  {
        console.log ('xxx updateMessages ', action.payload)
        const selectedRoom = state.rooms.find(room=> room.id === action.payload?.roomId)
        const newRooms = [...state.rooms.filter(room=> room.id !== action.payload?.roomId), {...selectedRoom, messages: action.payload?.messages || []}]
        return ({
          ...state, rooms: newRooms,
        })
      }
      },
  },
});

export const { updateRooms, updateActiveRoom, updateMessages } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
