import React, { useEffect, useState } from "react";
import booklibrarydetails from "./booklibrarydetails";
import { useNavigate } from "react-router-dom";
import "./stylesbook.css";

const Biography = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    booklibrarydetails.getBooksByGenre("biography")
      .then(response => {
        const biographyBooks = response.data.filter(book =>
          book.genre.toLowerCase() === "biography"
        );
        setBooks(biographyBooks);
      })
      .catch(error => {
        console.error('Error fetching biography books:', error);
      });
  }, []);


  

  return (
    <div className="scifi-container">
      <h1 className="scifi-title">Biography Books</h1>
      <button onClick={() => navigate("/")} className="scifi-back-button">
        Back
      </button>
      {books.length === 0 ? (
        <p>No biography books found.</p>
      ) : (
        books.map(book => (
          <div className="scifi-book-card" key={book.id}>
            <h2 className="scifi-book-title">{book.title}</h2>
            <p className="scifi-book-author">Author: {book.author}</p>
            <p className="scifi-book-genre">Genre: {book.genre}</p>
            <p className="scifi-book-year">Published: {book.publication_year}</p>
            <p className="scifi-book-meta">
              Added on: {new Date(book.created_at).toISOString().split('T')[0]}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Biography;
