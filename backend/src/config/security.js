const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const securityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Limit requests from same IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });

  // Apply rate limiting to all routes
  app.use(limiter);

  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
};

module.exports = securityMiddleware; 