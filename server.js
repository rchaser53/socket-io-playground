const http = require('http');
const fs = require('fs');

const handler = (req, res) => {
  fs.readFile(__dirname + '/index.html',
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

const app = http.createServer(handler)
const io = require('socket.io')(app);

app.listen(3000, () => {
  console.log('run server')
});

io.on('connection', (socket) => {
  socket.on('fireAll', (count) => {
    const next = ++count;
    socket.broadcast.emit('toClient', next);
    socket.emit('toClient', next);
  })
});