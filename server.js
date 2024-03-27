const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const gameState = {
  rookPosition: { x: 100, y: 100 } 
};

io.on('connection', (socket) => {
  console.log('a user connected');


  socket.emit('gameState', gameState);

  socket.on('move', (data) => {
 
    gameState.rookPosition = data;

   
    io.emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
