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
  socket.on('fireAll', (count) => {
    console.log('nya-n')
    const next = ++count;
    socket.broadcast.emit('toClient', next);
    socket.emit('toClient', next);
  })
});

server.listen(3000, () => {
  console.log('run server');
});