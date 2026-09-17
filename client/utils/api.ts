import axios from 'axios';

// ব্যাকএন্ড API Gateway-এর বেস URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // গিটহাব বা লোকাল কনফিগারেশন অনুযায়ী প্রিফিক্স
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// রিকোয়েস্ট পাঠানোর আগে যদি লোকাল স্টোরেজে টোকেন থাকে তা হেডার যুক্ত করার জন্য ইন্টারসেপ্টর
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;