require('dotenv').config();
const express = require('express');
const cors = require('cors');

const llmRoutes = require('./routes/llmRoutes');

const app = express();

// MIDDLEWAES
app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());


// ROUTES /api/summary
app.get("/", (req, res) => {
  res.send("Backend running — Earthquake Visualizer API active.");
});

app.use('/api/summary', llmRoutes);

module.exports = app;
