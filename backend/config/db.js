const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const MONGO_URI = uri || process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI not set');
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connect failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
