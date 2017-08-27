const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const webpackMiddleware = require("webpack-dev-middleware")
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('openA', (count) => {
    socket.broadcast.emit('openA', 0);
    socket.emit('openA', 0);
  });

  socket.on('openB', (count) => {
    socket.broadcast.emit('openB', 0);
    socket.emit('openB', 0);
  });
});

server.listen(3000, () => {
  console.log('run server');
});