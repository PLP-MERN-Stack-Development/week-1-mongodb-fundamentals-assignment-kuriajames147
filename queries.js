// queries.js

// Task 2: Basic CRUD Operations

// Find all books in a specific genre
function findBooksByGenre(genre) {
  return db.books.find({ genre: genre }).toArray();
}

// Find books published after a certain year
function findBooksPublishedAfter(year) {
  return db.books.find({ published_year: { $gt: year } }).toArray();
}

// Find books by a specific author
function findBooksByAuthor(author) {
  return db.books.find({ author: author }).toArray();
}

// Update the price of a specific book
function updateBookPrice(title, newPrice) {
  return db.books.updateOne(
    { title: title },
    { $set: { price: newPrice } }
  );
}

// Delete a book by its title
function deleteBookByTitle(title) {
  return db.books.deleteOne({ title: title });
}

// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010 (projection on title, author, price)
function findInStockBooksAfter2010() {
  return db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { projection: { title: 1, author: 1, price: 1, _id: 0 } }
  ).toArray();
}

// Sort books by price ascending
function sortBooksByPriceAsc() {
  return db.books.find().sort({ price: 1 }).toArray();
}

// Sort books by price descending
function sortBooksByPriceDesc() {
  return db.books.find().sort({ price: -1 }).toArray();
}

// Pagination: Get books for a given page number (5 books per page)
function getBooksByPage(pageNumber) {
  const limit = 5;
  const skip = (pageNumber - 1) * limit;
  return db.books.find().skip(skip).limit(limit).toArray();
}

// Task 4: Aggregation Pipeline

// Calculate average price of books by genre
function averagePriceByGenre() {
  return db.books.aggregate([
    {
      $group: {
        _id: "$genre",
        avgPrice: { $avg: "$price" }
      }
    }
  ]).toArray();
}

// Find the author with the most books
function authorWithMostBooks() {
  return db.books.aggregate([
    {
      $group: {
        _id: "$author",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]).toArray();
}

// Group books by publication decade and count them
function countBooksByDecade() {
  return db.books.aggregate([
    {
      $group: {
        _id: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
}

// Task 5: Indexing (run these in your Mongo shell or MongoDB driver, no return value)

// Create index on title field
function createTitleIndex() {
  return db.books.createIndex({ title: 1 });
}

// Create compound index on author and published_year
function createAuthorYearIndex() {
  return db.books.createIndex({ author: 1, published_year: -1 });
}

// Explain queries with index usage
function explainTitleQuery() {
  return db.books.find({ title: "Educated" }).explain("executionStats");
}

function explainAuthorYearQuery() {
  return db.books.find({ author: "Tara Westover", published_year: { $gt: 2015 } }).explain("executionStats");
}
