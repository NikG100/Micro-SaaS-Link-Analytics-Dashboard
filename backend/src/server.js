const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const securityMiddleware = require('./config/security');
const { errorHandler } = require('./config/errorHandler');
const logger = require('./config/logger');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

const app = express();

// Security middleware
securityMiddleware(app);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/links', linkRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server is running on port ${PORT}`);
}); 