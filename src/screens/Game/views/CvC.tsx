import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../../services';
import { Board } from '../../../shared';
import { Color } from '../../../types';

const PvP: React.FC = () => {
  const { setAI, setAutoReset, resetBoard } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    setAI([Color.R, Color.Y]);
    setAutoReset(true);

    return () => {
      setAI([]);
      setAutoReset(false);
      resetBoard();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Board />
      <button
        onClick={() => {
          navigate('/game/pvc');
        }}>
        {' '}
        stop and go to Player vs Ai
      </button>
    </>
  );
};

export default PvP;
