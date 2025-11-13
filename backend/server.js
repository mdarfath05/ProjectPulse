require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// In development allow localhost origins; in production keep it simple.
const CLIENT_URL = process.env.CLIENT_URL || '';
if (process.env.NODE_ENV === 'production') {
  app.use(cors());
} else {
  app.use(cors({
    origin: ['http://localhost:5173', CLIENT_URL],
    credentials: true
  }));
}

// Connect DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));

// Test route
app.get('/api/test', (req, res) => res.json({ message: 'Hello from backend' }));

// Serve frontend static files
const distPath = path.resolve(__dirname, '..', 'frontend', 'dist');
console.log("Serving frontend from:", distPath);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
