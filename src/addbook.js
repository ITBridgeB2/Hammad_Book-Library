import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booklibrarydetails from './booklibrarydetails';
import './addbook.css'; 

const AddBook = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    if (!formData.publication_year.trim()) {
      newErrors.publication_year = 'Publication year is required';
    } else if (!/^\d{4}$/.test(formData.publication_year)) {
      newErrors.publication_year = 'Enter a valid 4-digit year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await booklibrarydetails.saveBooksDetails(formData);
        alert('Book added successfully');
        navigate('/dash'); 
      } catch (err) {
        alert('Failed to add book: ' + err.message);
      }
    }
  };

  return (
    <div className="add-book-form">
      <h1 className="add-book-form__title">Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-book-form__group">
          <label htmlFor="title" className="add-book-form__label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="add-book-form__input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <p className="add-book-form__error">{errors.title}</p>}
        </div>

        <div className="add-book-form__group">
          <label htmlFor="author" className="add-book-form__label">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            className="add-book-form__input"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <p className="add-book-form__error">{errors.author}</p>}
        </div>

        <div className="add-book-form__group">
          <label htmlFor="genre" className="add-book-form__label">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="add-book-form__input"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genre"
          />
          {errors.genre && <p className="add-book-form__error">{errors.genre}</p>}
        </div>

        <div className="add-book-form__group">
          <label htmlFor="publication_year" className="add-book-form__label">Publication Year</label>
          <input
            type="text"
            id="publication_year"
            name="publication_year"
            className="add-book-form__input"
            value={formData.publication_year}
            onChange={handleChange}
            placeholder="Enter publication year"
          />
          {errors.publication_year && <p className="add-book-form__error">{errors.publication_year}</p>}
        </div>

        <div className="add-book-form__buttons">
          <button type="submit" className="add-book-form__button add-book-form__button--submit">Add Book</button>
          <button type="button" className="add-book-form__button add-book-form__button--back" onClick={() => navigate("/dash")}>Back</button> 
        </div>
      </form>
    </div>
  );
};

export default AddBook;
