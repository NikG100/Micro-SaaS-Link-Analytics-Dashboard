const express = require('express');
const router = express.Router();
const { createLink, getLinks, getLinkAnalytics, redirectLink } = require('../controllers/linkController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/', createLink);
router.get('/', getLinks);
router.get('/:shortUrl/analytics', getLinkAnalytics);

// Public route for redirection
router.get('/:shortUrl', redirectLink);

module.exports = router; 