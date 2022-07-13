import socketio from "socket.io-client";
import {createContext} from "react";

const { io } = require("socket.io-client");

const SOCKET_URL = 'http://localhost:8080'
export const CONNECTION = 'connection'
export const RIDE = 'ride'
export const PRIVATE_MESSAGE = 'private-message'

export const socket = socketio.connect(SOCKET_URL, {
    extraHeaders: {
        'auth-token': window.localStorage.getItem('token'),
        'user-type' : 'caller'
    }
});

export const SocketContext = createContext();
