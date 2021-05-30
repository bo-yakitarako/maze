import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule } from '../module/appModule';
import { useMediaQuery } from './useMediaQuery';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = () => {
  const dispatch = useDispatch();
  const { mazeArray, playerLocation } = useShallowEqualSelector(
    ({ mazeArray, playerLocation }) => ({
      mazeArray,
      playerLocation,
    }),
  );

  const { windowWidth } = useMediaQuery();

  useEffect(() => {
    dispatch(appModule.actions.generateMaze());
  }, []);
  useEffect(() => {
    drawMaze(mazeArray, playerLocation, windowWidth);
  }, [mazeArray, playerLocation, windowWidth]);
};

export { useDrawingMaze, getCanvasWidth };

const getCanvasWidth = (mazeSize: number, windowWidth: number) =>
  getSquareWidth(mazeSize, windowWidth) * mazeSize;

const getSquareWidth = (mazeSize: number, windowWidth: number) => {
  const rawCanvasSize = getRawCanvasWidth(windowWidth);
  const squareWidth = Math.floor(rawCanvasSize / mazeSize);
  return squareWidth;
};

const getRawCanvasWidth = (windowWidth: number) => {
  if (windowWidth < 448) {
    return windowWidth * 0.9;
  }
  if (windowWidth < 778) {
    return windowWidth * 0.75;
  }
  return 560;
};

const drawMaze = (
  mazeArray: boolean[][],
  [playerLocationX, playerLocationY]: [number, number],
  windowWidth: number,
) => {
  const squareWidth = getSquareWidth(mazeArray.length, windowWidth);
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
