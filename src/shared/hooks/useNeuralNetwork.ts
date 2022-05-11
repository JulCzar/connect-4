/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { Network } from '../../services';
import { Color, Nullable } from '../../types';

interface UseNeuralNetwork {
  population: number;
}

export const useNeuralNetwork = (props: UseNeuralNetwork) => {
  const [nets, setNets] = useState<Network[]>([
    new Network([25, 25], null),
    new Network([25, 25], null),
  ]);
  const [generation, setGeneration] = useState(0);

  const increaseGeneration = useCallback(() => setGeneration(s => s + 1), []);

  const findExceptions = (board: number[][]) => {
    let result = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== 0) {
        result.push(i);
      }
    }
    return result;
  };

  const findBestPlay = (outputs: number[], exclusions: number[]) => {
    var order = [];
    let tempOut = outputs.slice(0);
    outputs.sort((a, b) => b - a);

    for (let i = 0; i < outputs.length; i++)
      order.push(tempOut.indexOf(outputs[i]));

    if (outputs[0] === 0) return Math.floor(Math.random() * 7);

    for (let i = 0; i < order.length; i++)
      if (!exclusions.includes(order[i])) return order[i];

    return -1;
  };

  function addToBoard(board: number[][], slot: number, token: number) {
    let arrEdit = board[slot].slice(0);
    for (let i = 0; i < arrEdit.length; i++) {
      if (arrEdit[i] !== 0 && arrEdit[i - 1] === 0) {
        arrEdit[i - 1] = token;
        break;
      } else if (i === arrEdit.length - 1 && arrEdit[i] === 0) {
        arrEdit[i] = token;
        break;
      }
    }
    board[slot] = arrEdit;
    return board;
  }

  function checkWin(gameBoard: number[][], token: number) {
    var inARow = 0;
    for (let c = 0; c < gameBoard.length; c++)
      for (let r = 0; r < gameBoard[c].length; r++)
        if (gameBoard[c][r] === token) {
          inARow++;
          if (inARow >= 4) return true;
        } else inARow = 0;

    inARow = 0;

    //horizontal
    inARow = 0;
    for (let r = 0; r < gameBoard[0].length; r++) {
      for (let c = 0; c < gameBoard.length; c++)
        if (gameBoard[c][r] === token) {
          inARow++;
          if (inARow >= 4) return true;
        } else inARow = 0;

      inARow = 0;
    }
    //diagonal negative slope
    inARow = 0;
    for (let c = -2; c < 4; c++) {
      for (let d = 0; d < 6; d++) {
        try {
          if (gameBoard[c + d][5 - d] === token) {
            inARow++;
            if (inARow >= 4) {
              return true;
            }
          } else {
            inARow = 0;
          }
        } catch {
          inARow = 0;
        }
      }
      inARow = 0;
    }
    //diagonal positive slope
    inARow = 0;
    for (let c = 3; c < 9; c++) {
      for (let d = 0; d < 6; d++) {
        try {
          if (gameBoard[c - d][5 - d] === token) {
            inARow++;
            if (inARow >= 4) {
              return true;
            }
          } else {
            inARow = 0;
          }
        } catch {
          inARow = 0;
        }
      }
      inARow = 0;
    }
    return false;
  }

  const runThroughGame = (net1: Network, net2: Network) => {
    let gameBoard: number[][] = [];
    for (let i = 0; i < 7; i++) gameBoard.push([0, 0, 0, 0, 0, 0]);

    let turn = true;
    let yellowWin = false;
    let redWin = false;
    let tie = false;
    let exceptions = [];

    for (let t = 0; t < 50; t++) {
      turn = !turn;
      exceptions = findExceptions(gameBoard);
      let slot;
      if (turn)
        slot = findBestPlay(net1.runThrough(gameBoard.flat(1))!, exceptions);
      else {
        slot = findBestPlay(
          net2.runThrough(gameBoard.flat(1).map(x => -x))!,
          exceptions
        );
      }
      if (slot === -1) {
        console.log('tie');
        tie = true;
        break;
      }
      if (turn)
        if (checkWin(addToBoard(gameBoard, slot, Color.Y), Color.Y)) {
          yellowWin = true;
          break;
        } else if (checkWin(addToBoard(gameBoard, slot, Color.R), Color.R)) {
          redWin = true;
          break;
        }
    }

    if (tie) return null;
    if (yellowWin) return net1;
    if (redWin) return net2;
    return null;
  };

  const train = useCallback(() => {
    const tempNet: Nullable<Network[]> = [];

    for (let n1 = 0; n1 < nets.length; n1 += 2) {
      const result = runThroughGame(nets[n1], nets[n1 + 1]);
      if (result != null) tempNet.push(result);
    }
    const _nets = tempNet.slice(0);

    while (tempNet.length) tempNet.pop();

    for (let n1 = 0; n1 < _nets.length - 1; n1 += 2) {
      const result = runThroughGame(_nets[n1], _nets[n1 + 1]);

      if (result != null) tempNet.push(result);
    }
    const __nets = tempNet.slice(0);

    while (tempNet.length) tempNet.pop();

    for (let n1 = 0; n1 < __nets.length - 1; n1 += 2) {
      let result: Nullable<Network>;

      if (n1 === 4) result = runThroughGame(__nets[n1]!, __nets[n1 + 1]!);
      else result = runThroughGame(__nets[n1]!, __nets[n1 + 1]!);

      if (result != null) tempNet.push(result);
    }
    increaseGeneration();

    if (tempNet.length > 1) {
      const ___nets = tempNet;
      let netsToGo = props.population - ___nets.length;
      for (let i = 0; i < netsToGo; i++)
        ___nets.push(new Network(null, tempNet));
    }
  }, [nets]);

  useEffect(() => {
    const _nets = [];

    for (let i = props.population; i > 0; i--)
      _nets.push(new Network([25, 25], null));

    setNets(_nets);
  }, []);

  return { nets, generation, train };
};
