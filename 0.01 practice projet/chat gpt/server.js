require('dotenv').config(); // Load environment variables right at the start
const express = require('express');
const db = require('./config/db'); // Importing the database pool we set up earlier

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARES
// ==========================================
app.use(express.json()); // Allows the server to accept and parse JSON data in request bodies

// ==========================================
// 2. ROUTES
// ==========================================
// Test Route
app.get('/api/health', async (req, res) => {
  try {
    // Test the database connection on this health check
    const dbCheck = await db.query('SELECT NOW()');
    res.status(200).json({
      status: 'success',
      message: 'Server is healthy and connected to PostgreSQL!',
      dbTime: dbCheck.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Server is running, but database connection failed.',
      error: error.message 
    });
  }
});

// Import and mount your actual feature routers here later:
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));

// ==========================================
// 3. 404 NOT FOUND HANDLER
// ==========================================
app.use((req, res, next) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

// ==========================================
// 4. CENTRALIZED ERROR HANDLING MIDDLEWARE
// ==========================================
// Any time you call next(err) in your controllers, it lands straight here
app.use((err, req, res, next) => {
  console.error('❌ Error Stack:', err.stack);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    // Only show error stack details when you're testing locally
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

// ==========================================
// 5. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});