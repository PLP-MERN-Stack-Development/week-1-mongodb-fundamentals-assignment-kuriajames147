const { connectToDatabase } = require('../config/db');
const Book = require('../models/Book');

async function getAllBooks() {
  const db = await connectToDatabase();
  return db.collection(Book.collectionName).find().toArray();
}

async function createBook(bookData) {
  const db = await connectToDatabase();
  const result = await db.collection(Book.collectionName).insertOne(bookData);
  return { ...bookData, _id: result.insertedId };
}

// Add more controller functions as needed

module.exports = {
  getAllBooks,
  createBook
};