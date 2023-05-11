const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  // console.log('a user connected');
  let targetDate = new Date();
  targetDate.setHours(40, 0, 0, 0);
  let timerId = setInterval(() => {
    let remainingTime = targetDate.getTime() - new Date().getTime();
    if (remainingTime <= 0) {
      socket.emit('countdown', `已经开始了捏`);
      clearInterval(timerId);
      return;
    }
    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    let hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
    let days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
    let countdown = `还剩：${days}天，${hours}小时，${minutes}分，${seconds}秒`;
    socket.emit('countdown', countdown);
  }, 1000);
});

server.listen(3000, () => {
  // console.log('listening on *:3000');
});
