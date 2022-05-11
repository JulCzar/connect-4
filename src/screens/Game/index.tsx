import { Outlet } from 'react-router-dom';
import { GameContext, GameState } from '../../services';
import { Header } from '../../shared';

const Game: React.FC = () => {
  const state = GameState();

  return (
    <GameContext.Provider value={state}>
      <Header />
      <Outlet />
    </GameContext.Provider>
  );
};

export default Game;
