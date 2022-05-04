import React from 'react';
import { CellStyle } from '../../styles';
import { CellState } from './state';
import { iCell } from './types';

const Cell: React.FC<iCell> = props => {
  const state = CellState(props);

  return <CellStyle onClick={props.onClick} className={state.className} />;
};

export default Cell;
