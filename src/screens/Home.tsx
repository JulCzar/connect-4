import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dataset, WekaJSON } from '../services';
import { persistentStorage } from '../services/persistorStorage';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => () => navigate(`/game/${path}`);
  const downloadDataset = () => {
    const moves = persistentStorage.getItem<Dataset>('yellow') ?? [];

    const moveSet = moves[0].board
      .map((_, i) => _.map((_, j) => `${i}-${j}`))
      .flat(1)
      .map(name => ({
        name,
        type: 'nominal',
        weight: 1.1,
        labels: ['-1', '0', '1'],
      }));

    const wekaJson: WekaJSON = {
      header: {
        relation: 'connect4',
        attributes: [
          ...moveSet,
          {
            name: 'move',
            type: 'nominal',
            class: true,
            weight: 1.1,
            labels: ['0', '1', '2', '3', '4', '5', '6'],
          },
        ],
      },
      data: moves.map(({ board, move }) => ({
        sparse: false,
        values: [...board.flat(1).map(String), String(move)],
        weight: 1.1,
      })),
    };

    const blob = new Blob([JSON.stringify(wekaJson)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: 'connect4.json',
      hidden: true,
    });

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Connect 4</h1>
      <button onClick={handleClick('')}>Player vs Player!</button>
      <button onClick={handleClick('pvc')}>Player vs Computador!</button>
      <button onClick={handleClick('cvc')}>Treinar IA!</button>
      <button onClick={downloadDataset}>Baixar Dataset</button>
    </div>
  );
};

export default Home;
