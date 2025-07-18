const { MongoClient } = require('mongodb');
require('dotenv').config();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(process.env.DB_NAME);
  cachedDb = db;
  return db;
}

module.exports = { connectToDatabase };