const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/bookController");

// Routes
router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/search", searchBooks);
module.exports = router;
