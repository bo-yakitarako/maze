import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';

const MazeCanvas: React.FC = () => {
  const mazeSize = useAppSelector(({ mazeSize }) => mazeSize);
  const canvasSize = getCanvasWidth(mazeSize + 2);
  useDrawingMaze();
  return <canvas id="mazeCanvas" width={canvasSize} height={canvasSize} />;
};

export { MazeCanvas };
