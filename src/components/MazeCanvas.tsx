import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';
import { useKeyboard } from '../hooks/useKeyboard';
import { useMediaQuery } from '../hooks/useMediaQuery';

const MazeCanvas: React.FC = () => {
  const mazeSize = useAppSelector(({ mazeSize }) => mazeSize);
  const { windowWidth } = useMediaQuery();
  const canvasSize = getCanvasWidth(mazeSize + 2, windowWidth);
  useDrawingMaze();
  useKeyboard();
  return <canvas id="mazeCanvas" width={canvasSize} height={canvasSize} />;
};

export { MazeCanvas };
