'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/utils/api';
import { io } from 'socket.io-client';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  // টাস্ক ফেচ এবং Socket.io কানেকশন
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // টাস্কগুলো ফেচ করা
    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };

    fetchTasks();

    // Socket.io কানেকশন (পোর্ট 5002 বা Gateway অনুযায়ী)
    const socket = io('http://localhost:5002');

    socket.on('taskCreated', (newTask: Task) => {
      setTasks((prev) => [...prev, newTask]);
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  // নতুন টাস্ক তৈরি করার হ্যান্ডলার
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/tasks', { title, description });
      setTasks((prev) => [...prev, res.data]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Real-time Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 font-semibold"
          >
            Logout
          </button>
        </div>

        {/* টাস্ক ক্রিয়েট ফর্ম */}
        <form onSubmit={handleCreateTask} className="bg-gray-800 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            required
          />
          <button type="submit" className="bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-500">
            Create Task
          </button>
        </form>

        {/* টাস্ক লিস্ট */}
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
                <h3 className="text-xl font-bold text-blue-400">{task.title}</h3>
                <p className="text-gray-300 mt-2">{task.description}</p>
                <span className="inline-block mt-3 px-3 py-1 text-xs bg-yellow-600 rounded-full">
                  {task.status || 'Pending'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}