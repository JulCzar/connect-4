import React from 'react';
import { useEffect } from 'react';
import { useGameContext } from '../../../services';
import { Board } from '../../../shared';
import { Color } from '../../../types';

const PvP: React.FC = () => {
  const { setAI } = useGameContext();

  useEffect(() => {
    setAI([Color.R]);

    return () => setAI([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Board />;
};

export default PvP;
