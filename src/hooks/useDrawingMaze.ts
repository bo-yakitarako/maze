import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule } from '../module/appModule';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = () => {
  const dispatch = useDispatch();
  const { mazeArray, playerLocation } = useShallowEqualSelector(
    ({ mazeArray, playerLocation }) => ({
      mazeArray,
      playerLocation,
    }),
  );
  useEffect(() => {
    dispatch(appModule.actions.generateMaze());
  }, []);
  useEffect(() => {
    drawMaze(mazeArray, playerLocation);
  }, [mazeArray, playerLocation]);
};

export { useDrawingMaze, getCanvasWidth };

const getCanvasWidth = (mazeSize: number) =>
  getSquareWidth(mazeSize) * mazeSize;

const getSquareWidth = (mazeSize: number) => {
  const rawCanvasSize = getRawCanvasWidth();
  const squareWidth = Math.floor(rawCanvasSize / mazeSize);
  return squareWidth;
};

const getRawCanvasWidth = () => {
  if (window.innerWidth < 448) {
    return window.innerWidth * 0.9;
  }
  if (window.innerWidth < 778) {
    return window.innerWidth * 0.75;
  }
  return 640;
};

const drawMaze = (
  mazeArray: boolean[][],
  [playerLocationX, playerLocationY]: [number, number],
) => {
  const squareWidth = getSquareWidth(mazeArray.length);
  const canvas = document.querySelector('#mazeCanvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  const fillRect = (x: number, y: number) => {
    context.fillRect(
      x * squareWidth,
      y * squareWidth,
      squareWidth,
      squareWidth,
    );
  };
  mazeArray.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      if (!isLoad) {
        fillRect(xIndex, yIndex);
      }
      if (xIndex === playerLocationX && yIndex === playerLocationY) {
        context.fillStyle = 'cyan';
        fillRect(xIndex, yIndex);
        context.fillStyle = 'black';
      }
    });
  });
};
