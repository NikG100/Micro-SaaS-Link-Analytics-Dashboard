const Link = require('../models/Link');
const shortid = require('shortid');

const createLink = async (req, res) => {
  try {
    const { originalUrl, alias, expirationDate } = req.body;
    const index = originalUrl.indexOf('.com/');
    let front = originalUrl.slice(0, index + 5);
    const back = alias || shortid.generate();
    const shortUrl = front + back;

    const link = new Link({
      originalUrl,
      shortUrl,
      clicks : 0
    });

    await link.save();
    res.status(201).json(link);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Short URL or alias already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getLinkAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl, userId: req.user._id });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json({
      totalClicks: link.clicks,
      analytics: link.analytics
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const redirectLink = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    if (link.expirationDate && new Date(link.expirationDate) < new Date()) {
      return res.status(400).json({ message: 'Link has expired' });
    }

    // Update analytics asynchronously
    const analyticsData = {
      timestamp: new Date(),
      device: req.headers['user-agent'],
      ip: req.ip,
      location: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    link.clicks += 1;
    link.analytics.push(analyticsData);
    link.save();

    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createLink,
  getLinks,
  getLinkAnalytics,
  redirectLink
}; 