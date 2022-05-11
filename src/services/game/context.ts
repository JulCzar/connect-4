import { createContext, useContext } from 'react';
import { GameState } from './state';

const OUT_OF_CONTEXT = new Error(
  'o hook useGameContext precisa ser utilizado sobre dentro do contexto do GameProvider'
);

type iGameContext = ReturnType<typeof GameState>;

export const GameContext = createContext({} as iGameContext);

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) throw OUT_OF_CONTEXT;

  return context;
};
