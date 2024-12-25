const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const messageHandler = require('./src/messageHandler');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');

  socket.on('chat message', (data) => {
    if (messageHandler.validateMessage(data)) {
      const formattedMessage = messageHandler.formatMessage(data);
      io.emit('chat message', formattedMessage);
    }
  });

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました');
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

if (process.env.NODE_ENV !== 'test') {
  http.listen(PORT, HOST, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
  });
}

module.exports = { app, server: http };