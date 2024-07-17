import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.API_URL;

console.log ('xxx SOCKET_SERVER_URL ', SOCKET_SERVER_URL)

export const socket = io(SOCKET_SERVER_URL as string, {transports:[ "websocket"]});
