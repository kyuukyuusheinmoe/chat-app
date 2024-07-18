"use server"

import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.API_URL;

console.log ('xxx SOCKET_SERVER_URL ', SOCKET_SERVER_URL)

const socket = io(SOCKET_SERVER_URL as string, {transports:[ "websocket"]});
export const connectToSocketServer = () => {
    socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });
}