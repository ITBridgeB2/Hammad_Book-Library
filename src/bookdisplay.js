import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import booklibrarydetails from './booklibrarydetails';
import './bookdisplay.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate();
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    genre: '',
    author: '',
    publication_year: '',
  });

  useEffect(() => {
    booklibrarydetails.getBooks()
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      booklibrarydetails.deleteBooks(id)
        .then(() => {
          setPosts(posts.filter(post => post.id !== id));
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

  const handleEditClick = (post) => {
    setEditPostId(post.id);
    setEditFormData({
      title: post.title,
      author: post.author,
      genre: post.genre,
      publication_year: post.publication_year,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSave = (id) => {
    booklibrarydetails.updateBooks(id, editFormData)
      .then(() => {
        setPosts(posts.map(post => post.id === id ? { ...post, ...editFormData } : post));
        setEditPostId(null);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

const handleSearch = () => {
    if (searchTitle.trim()) {
      navigate(`/book/${encodeURIComponent(searchTitle.trim())}`);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-actions">
        <h1>Book Library</h1>
        <button onClick={() => navigate("/addbook")}>Add Book</button>
        <button onClick={() => navigate("/")}>Home</button>
        
      </div>
      <div className="dashboard-my"><h2>MY BOOKS</h2></div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search book by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {posts.length === 0 ? (
        <p>No books found.</p>
      ) : (
        posts.map(post => (
          <div className="book-card" key={post.id}>
            {editPostId === post.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                  placeholder="Author"
                />
                <input
                  type="text"
                  name="genre"
                  value={editFormData.genre}
                  onChange={handleEditChange}
                  placeholder="Genre"
                />
                <input
                  type="text"
                  name="publication_year"
                  value={editFormData.publication_year}
                  onChange={handleEditChange}
                  placeholder="Publication Year"
                />
                <div className="post-actions">
                  <button onClick={() => handleEditSave(post.id)}>Save</button>
                  <button onClick={() => setEditPostId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
                <p>{post.genre}</p>
                <p>{post.publication_year}</p>
                <p>
                  By: {post.author} | Date: {new Date(post.created_at).toISOString().split('T')[0]}
                </p>
                <div className="post-actions">
                  <button onClick={() => handleEditClick(post)}>Edit Book</button>
                  <button onClick={() => handleDelete(post.id)}>Delete Book</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
