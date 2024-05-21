// socket.js
import io from 'socket.io-client';

var socket = io('https://api-devtest-jah.vercel.app/', {transports: ['websocket']});
socket.on('connect', function () {
  console.log('connected!');
  socket.emit('greet', { message: 'Hello Mr.Server!' });
});

socket.on('respond', function (data) {
  console.log(data);
});
export default socket;
