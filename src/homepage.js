import './homepage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Book Library</h1>
        <button onClick={() => navigate("/dash")}>My Books</button>
      </div>

 <div className="homepage-genre-buttons">
        <div className="homepage-genre-button" onClick={() => navigate("/sci-fi")}>
          <img src="Images/sct-fi.png" alt="sci-fi" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/horror")}>
          <img src="Images/horror.png" alt="horror" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/mystery")}>
          <img src="Images/mystery.png" alt="mystery" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/adventure")}>
          <img src="Images/adventure.png" alt="adventure" />
        </div></div>
        <div className="homepage-genre-buttons">
        <div className="homepage-genre-button" onClick={() => navigate("/romance")}>
          <img src="Images/romance.png" alt="romance" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/fantasy")}>
          <img src="Images/fantasy.png" alt="fantasy" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/history")}>
          <img src="Images/history.png" alt="history" />
        </div>
        <div className="homepage-genre-button" onClick={() => navigate("/biography")}>
          <img src="Images/biography.png" alt="biography" />
        </div>
      </div>
    </div>
  );
};

export default Home;
