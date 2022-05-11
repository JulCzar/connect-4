import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => () => navigate(`/game/${path}`);

  return (
    <div>
      <h1>Connect 4</h1>
      <button onClick={handleClick('')}>Player vs Player!</button>
      <button onClick={handleClick('pvc')}>Player vs Computador!</button>
      <button onClick={handleClick('cvc')}>Treinar IA!</button>
    </div>
  );
};

export default Home;
