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

app.get('/modal', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/sendMessage', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'sendMessage.html'));
});

io.on('connection', (socket) => {
  socket.on('openA', (val) => {
    console.log(val)
    socket.broadcast.emit('openA', 0);
    socket.emit('openA', 0);
  });

  socket.on('openB', (val) => {
    console.log(val)
    socket.broadcast.emit('openB', 0);
    socket.emit('openB', 0);
  });
});

server.listen(3000, () => {
  console.log('run server');
});