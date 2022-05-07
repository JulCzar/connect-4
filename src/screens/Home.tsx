import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/board');

  return (
    <div>
      <h1>Connect 4</h1>
      <button onClick={handleClick}>Começar!</button>
    </div>
  );
};

export default Home;
