import { io } from 'socket.io-client';

const socket = io('https://world-tycoon-backend.vercel.app');

export default socket;
