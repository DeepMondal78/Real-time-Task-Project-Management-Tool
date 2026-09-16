const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({ 
    target: 'http://auth-service:5001', 
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }
}));

// Task Service Proxy
app.use('/api/tasks', createProxyMiddleware({ 
    target: 'http://task-service:5002', 
    changeOrigin: true,
    pathRewrite: { '^/api/tasks': '' }
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});