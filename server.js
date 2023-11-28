'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);
var clients = {};
var chats = {};
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
   // استماع إلى حدث "chatMessage"
  socket.on('chatMessage', (data) => {
    //console.log('Received chat message:', data);
    // إرسال رد إلى الجهة العميلية
    socket.emit('chatMessageResponse', data);
  });
  socket.on('setchat', (data) => {
    //console.log(data);
    chats[data['Chatid']] = socket;
    console.log(chats);
    //console.log('Received chat message:', data);
    // إرسال رد إلى الجهة العميلية
    socket.emit('getchat', chats);
  });
  
});



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
