import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../../services';
import { Board } from '../../../shared';
import { Color } from '../../../types';

const PvP: React.FC = () => {
  const { setAI } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    setAI([Color.R]);

    return () => setAI([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Board />

      <button
        onClick={() => {
          navigate('/game/cvc');
        }}>
        {' '}
        improve ai
      </button>
    </>
  );
};

export default PvP;
