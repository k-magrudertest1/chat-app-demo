import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { app } from '../server';

describe('Chat Server', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer(app);
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should receive and broadcast chat messages', (done) => {
    const testMessage = {
      message: 'Hello, World!'
    };

    clientSocket.on('chat message', (data) => {
      expect(data.message).toBe(testMessage.message);
      expect(data.timestamp).toBeDefined();
      done();
    });

    clientSocket.emit('chat message', testMessage);
  });

  it('should not broadcast invalid messages', (done) => {
    const invalidMessage = {
      message: ''
    };

    let messageReceived = false;
    clientSocket.on('chat message', () => {
      messageReceived = true;
    });

    clientSocket.emit('chat message', invalidMessage);

    setTimeout(() => {
      expect(messageReceived).toBe(false);
      done();
    }, 100);
  });
});