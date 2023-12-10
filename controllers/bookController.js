// booksController.js

const db = require("../db.json");

// Controller functions
exports.getBooks = (req, res) => {
  res.json(db.books);
};

exports.getBook = (req, res) => {
  const id = req.params.id;
  const book = db.books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

exports.addBook = (req, res) => {
  const newBook = req.body;
  newBook.id = Math.floor(Math.random() * 100000) + 1;
  db.books.push(newBook);
  res.json(newBook);
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;
  const index = db.books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  db.books[index] = updatedBook;
  res.json(updatedBook);
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  db.books = db.books.filter((b) => b.id !== id);
  res.json({ message: "Book deleted successfully" });
};

exports.searchBooks = (req, res) => {
  const { title, author, genre } = req.body;

  let matchingBooks = db.books;

  if (title) {
    matchingBooks = matchingBooks.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    matchingBooks = matchingBooks.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (genre) {
    matchingBooks = matchingBooks.filter((book) =>
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (matchingBooks.length === 0) {
    return res.json([]);
  }
  res.json(matchingBooks);
};
