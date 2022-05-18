import { Color, PlayerName } from '../types';

export const colorToPlayerName = (color: Color): PlayerName => {
  return color === Color.R ? 'red' : 'yellow';
};

export const sigmoide = (x: number): number => 1 / (1 + Math.exp(-x));

export const download = (data: string, filename: string) => {
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};
