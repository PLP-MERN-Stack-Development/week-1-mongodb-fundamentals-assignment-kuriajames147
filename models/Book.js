const { ObjectId } = require('mongodb');

class Book {
  constructor({ _id, title, author, year, genres, rating }) {
    this._id = _id ? new ObjectId(_id) : null;
    this.title = title;
    this.author = author;
    this.year = year || null;
    this.genres = genres || [];
    this.rating = rating || null;
  }

  static get collectionName() {
    return 'books';
  }
}

module.exports = Book;