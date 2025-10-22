const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Hashed password
  role: { type: String, enum: ['client', 'advertiser', 'brand owner', 'admin'], required: true },
  // Add more fields as needed, e.g., email
});

module.exports = mongoose.model('User', userSchema);
