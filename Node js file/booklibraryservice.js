import cors from 'cors';
import express from 'express';
import mysql from 'mysql2';


const bookapp = express();
bookapp.use(cors());
bookapp.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'booklibrary'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});




// Create a new book
bookapp.post('/books', (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  const sql = 'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, author, genre, publication_year], (err, result) => {
    if (err) {
      console.error('Error inserting book:', err);
      return res.status(500).json({ error: 'Failed to add book' });
    }
    res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
  });
});

// Retrieve all books
bookapp.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Failed to retrieve books' });
    }
    res.status(200).json(results);
  });
});

// Update an existing book
bookapp.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_year } = req.body;
  const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?';
  db.query(sql, [title, author, genre, publication_year, id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ error: 'Failed to update book' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  });
});

// Delete a book
bookapp.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM books WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
});


// Get book by title
bookapp.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const sql = 'SELECT * FROM books WHERE title = ?';
  db.query(sql, [title], (err, results) => {
    if (err) {
      console.error('Error fetching book by title:', err);
      return res.status(500).json({ error: 'Failed to retrieve book by title' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(results[0]);
  });
});






bookapp.listen(2630, () => {
    console.log('Server is running on port 2630');
  });