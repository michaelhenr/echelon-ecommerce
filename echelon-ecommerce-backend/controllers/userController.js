const Ad = require('../models/adModel');

exports.createAd = async (req, res) => {
  try {
    const { title, content, schedule } = req.body;  // From FR2
    if (!title || !content || !schedule) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newAd = new Ad({ title, content, schedule });
    await newAd.save();
    res.status(201).json(newAd);  // Return the created ad
  } catch (error) {
    res.status(500).json({ message: 'Error creating ad', error });
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();  // Fetch all ads
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ads', error });
  }
};

// Add more methods as needed, e.g., for scheduling or updating ads
