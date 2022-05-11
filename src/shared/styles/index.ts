import styled, { createGlobalStyle } from 'styled-components';

export const AppStyles = createGlobalStyle`
  #root, html, body {
    height: 100%;
    width: 100%;
  }

  @keyframes animated {
    50% {
      transform: rotateY(180deg);
    }
  }
`;

export const GameContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

export const GameBoardContainer = styled('div')`
  background-color: #0077ee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

export const CellStyle = styled('div')`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  background-color: white;
  margin: 5px;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.yellow {
    background-color: yellow;
    cursor: not-allowed;
  }

  &.red {
    background-color: red;
    cursor: not-allowed;
  }

  &.animate {
    animation-name: animated;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    transform-style: preserve-3d;

    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 40px;
    color: black;

    .after {
      content: '×';
    }
  }
`;

export const GameRow = styled('div')`
  display: flex;
  flex-direction: row;
`;
