import React from 'react';
import { HeaderState } from './state';

const Header: React.FC = () => {
  const state = HeaderState();
  const gameCount = state.boardState.gameCounter;

  return state.hasWinner ? (
    <div>{state.winnerName} won!</div>
  ) : (
    <div>
      {state.playerName} plays, games played {gameCount}
    </div>
  );
};

export default Header;
