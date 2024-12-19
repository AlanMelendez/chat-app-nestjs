/* eslint-disable @typescript-eslint/no-require-imports */
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
  console.log('Conexión establecida');
  ws.send(JSON.stringify({ event: 'test', data: {} }));
});

ws.on('message', (data) => {
  console.log('Mensaje recibido:', data);
});

ws.on('error', (error) => {
  console.error('Error en WebSocket:', error.message);
});

ws.on('close', () => {
  console.log('Conexión cerrada');
});
