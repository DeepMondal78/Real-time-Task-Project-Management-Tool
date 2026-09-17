const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.json());
app.use(cors());

// MongoDB কানেকশন
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/realtime-task-db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Task Service connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Task Schema & Model তৈরি
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// WebSocket কানেকশন
io.on('connection', (socket) => {
    console.log('A user connected via WebSocket:', socket.id);

    socket.on('task_update', (data) => {
        socket.broadcast.emit('receive_task_update', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// হেলথ চেক রাউট
app.get('/api/tasks/health', (req, res) => {
    res.status(200).json({ status: 'Task Service is running' });
});

// সব টাস্ক পাওয়ার জন্য রাউট
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks); 
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// নতুন টাস্ক তৈরি করার জন্য রাউট
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const newTask = new Task({ title, description });
        await newTask.save();

        io.emit('taskCreated', newTask);

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
    console.log(`Task Service running on port ${PORT}`);
});