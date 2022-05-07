import React from 'react';
import { HeaderState } from './state';

const Header: React.FC = () => {
  const { playerName, hasWinner, winnerName } = HeaderState();

  return hasWinner ? (
    <div>{winnerName} won!</div>
  ) : (
    <div>{playerName} plays</div>
  );
};

export default Header;
