const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', async (req, res) => {
  try {
    const books = await bookController.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newBook = await bookController.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;