const mongoose = require('mongoose');
require('dotenv').config();

// Singleton Pattern for Database Connection
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connection = null;
    DatabaseConnection.instance = this;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/echelon_ecommerce';
      
      this.connection = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferMaxEntries: 0 // Disable mongoose buffering
      });

      console.log('✅ MongoDB connected successfully');
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
      });

      return this.connection;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('🔌 MongoDB disconnected');
    }
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new DatabaseConnection();
