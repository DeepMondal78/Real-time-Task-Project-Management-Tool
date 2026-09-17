const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// সঠিক CORS কনফিগারেশন (credentials সহ রিকোয়েস্ট এলাও করার জন্য)
app.use(cors({
    origin: 'http://localhost:3000', // এখানে সরাসরি ফ্রন্টএন্ডের ডোমেন দিতে হবে '*' এর বদলে
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({ 
    target: 'http://auth-service:5001', 
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }
}));

// Task Service Proxy
app.use('/api/tasks', createProxyMiddleware({ 
    target: 'http://task-service:5002', 
    changeOrigin: true
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});