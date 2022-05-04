import { createContext, useContext } from 'react';

const OUT_OF_CONTEXT = new Error(
  'o hook useBoardContext precisa ser utilizado sobre dentro do contexto do BoardProvider'
);

interface iBoardContext {}

const INITIAL_STATE: iBoardContext = {};

export const BoardContext = createContext(INITIAL_STATE);

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) throw OUT_OF_CONTEXT;

  return context;
};
