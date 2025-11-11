// api-gateway/index.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

// 1. Proxy untuk User Service (Ini sudah benar)
app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '',
  },
}));

// 2. Proxy untuk Course Service (INI ADALAH PERBAIKANNYA)
app.use('/api/courses', createProxyMiddleware({
  // ▼▼▼ PERUBAHAN DI SINI ▼▼▼
  target: 'http://localhost:3001/courses', // Pindahkan /courses ke target
  changeOrigin: true,
  pathRewrite: {
    '^/api/courses': '', // Hapus /api/courses menjadi string kosong
    // Alur baru:
    // GET /api/courses -> target ('.../courses') + path ('') = ...:3001/courses
    // GET /api/courses/2 -> target ('.../courses') + path ('/2') = ...:3001/courses/2
  },
}));

// 3. Proxy untuk Enrollment Service (Ini sudah benar)
app.use('/api/enrollments', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/enrollments': '',
  },
}));

// Jalankan server Gateway
app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});