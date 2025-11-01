import { io } from 'socket.io-client';

// We MUST add withCredentials: true so the client sends the session cookie
const socket = io('https://world-tycoon-backend.vercel.app', {
  withCredentials: true
});

export default socket;
