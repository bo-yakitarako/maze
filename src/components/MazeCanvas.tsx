import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';
import { useKeyboard } from '../hooks/useKeyboard';

const MazeCanvas: React.FC = () => {
  const mazeSize = useAppSelector(({ mazeSize }) => mazeSize);
  const canvasSize = getCanvasWidth(mazeSize + 2);
  useDrawingMaze();
  useKeyboard();
  return <canvas id="mazeCanvas" width={canvasSize} height={canvasSize} />;
};

export { MazeCanvas };
