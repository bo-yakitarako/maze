import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';
import { useKeyboard } from '../hooks/useKeyboard';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { SettingDialog } from './SettingDialog';

const MazeCanvas: React.FC = () => {
  const mazeSize = useAppSelector(({ mazeSize }) => mazeSize);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { windowWidth } = useMediaQuery();
  const canvasSize = getCanvasWidth(mazeSize + 2, windowWidth);
  useDrawingMaze(canvasRef.current as HTMLCanvasElement);
  useKeyboard();
  return (
    <MazeWrapper>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
      <SettingDialog />
    </MazeWrapper>
  );
};

export { MazeCanvas };

const MazeWrapper = styled.div`
  position: relative;
`;
