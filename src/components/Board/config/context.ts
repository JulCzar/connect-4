import { createContext, useContext } from 'react';
import { BoardState } from './state';

const OUT_OF_CONTEXT = new Error(
  'o hook useBoardContext precisa ser utilizado sobre dentro do contexto do BoardProvider'
);

type iBoardContext = ReturnType<typeof BoardState>;

export const BoardContext = createContext({} as iBoardContext);

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) throw OUT_OF_CONTEXT;

  return context;
};
