const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env['ATLAS_URI'];

const connectDB = async () => {
  try {
    console.log(db);
    const conn = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
