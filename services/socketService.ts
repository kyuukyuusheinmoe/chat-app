"use server"

import io from 'socket.io-client';
import { cookies } from 'next/headers';

const SOCKET_SERVER_URL = process.env.API_URL;
const token = cookies().get("token")?.value

const socket = io(SOCKET_SERVER_URL as string, {transports:[ "websocket"], query: {
    user: token
  }});

export const connectToSocketServer = () => {
    socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });
}

export const disconnectFromSocketServer = () => {
  socket.on("disconnect", (userData) => {
      console.log("Disconnected from Socket.IO server");
    });
}

export const handleGroupJoinEvent = (groupId: number) => {
   socket.emit("group_joined", {
        groupId: `${groupId}`,
      });
}

export const handleIncomingMessage = () => {
  return socket.on("message", (message: string)=> console.log ('xxx message ', message))
}

export const handleSendMessage = (data: any) => {
  const content = `${data.receiverId},${data.content},${data.groupId}`
  console.log ('xxx sending data ',content, content.length)
  socket.emit("message", content);
}