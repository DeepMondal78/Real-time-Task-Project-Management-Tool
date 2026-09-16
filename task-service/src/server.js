const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.json());

io.on('connection', (socket) => {
    console.log('A user connected via WebSocket:', socket.id);

    socket.on('task_update', (data) => {
        // টিমের অন্য সবার কাছে ব্রডকাস্ট করা
        socket.broadcast.emit('receive_task_update', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/tasks/health', (req, res) => {
    res.status(200).json({ status: 'Task Service is running' });
});

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
    console.log(`Task Service running on port ${PORT}`);
});