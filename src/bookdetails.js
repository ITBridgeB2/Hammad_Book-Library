import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import booklibrarydetails from './booklibrarydetails';
import  './bookdetails.css';

const BookDetails = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    booklibrarydetails.getBookByTitle(title)
      .then(res => setBook(res.data))
      .catch(err => setError(err.response?.data?.error || 'Something went wrong'));
  }, [title]);

  return (
    <div className="book-details">
      {error && <p>{error}</p>}
      {book && (
        <>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Publication Year:</strong> {book.publication_year}</p>
        </>
      )}
    </div>
  );
};

export default BookDetails;
