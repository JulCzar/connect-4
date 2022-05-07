import React from 'react';
import { GameBoardContainer, GameContainer } from '../../styles';
import Row from '../Row';
import Header from './components/Header';
import { BoardContext } from './config/context';
import { BoardState } from './config/state';

const Board: React.FC = () => {
  const state = BoardState();

  return (
    <BoardContext.Provider value={state}>
      <Header />
      <GameContainer>
        <GameBoardContainer>
          {state.board.map((colors, i) => (
            <Row key={`column-${i}`} colors={colors} row={i} />
          ))}
        </GameBoardContainer>
      </GameContainer>
    </BoardContext.Provider>
  );
};

export default Board;
