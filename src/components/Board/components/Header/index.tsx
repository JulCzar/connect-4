import React from 'react';
import { iBoard } from '../../config/types';
import { HeaderState } from './state';

const Header: React.FC<iBoard> = props => {
  const { playerName, hasWinner, winnerName } = HeaderState(props);
  if (hasWinner) return <div>{winnerName} won!</div>;

  return <div>{playerName} plays</div>;
};

export default Header;
