const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// MongoDB Connection (অথবা PostgreSQL)
// Docker Compose ব্যবহারের সময় সার্ভিসের নাম দিয়ে কানেক্ট করতে হবে
const PORT = process.env.PORT || 5001;

app.get('/auth/health', (req, res) => {
    res.status(200).json({ status: 'Auth Service is running' });
});

// ডামি রেজিস্টার বা লগইন এন্ডপয়েন্ট এখানে থাকবে...

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});

module.exports = app; // Unit Testing এর জন্য এক্সপোর্ট করা হলো