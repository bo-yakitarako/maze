import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule } from '../module/appModule';
import { useAppSelector } from './useAppSelector';

const useDrawingMaze = () => {
  const dispatch = useDispatch();
  const mazeArray = useAppSelector(({ mazeArray }) => mazeArray);
  useEffect(() => {
    dispatch(appModule.actions.generateMaze());
  }, []);
  useEffect(() => {
    drawMaze(mazeArray);
  }, [mazeArray]);
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
  if (window.innerWidth < 377) {
    return 300;
  }
  if (window.innerWidth < 520) {
    return 360;
  }
  if (window.innerWidth < 640) {
    return 480;
  }
  if (window.innerWidth < 778) {
    return 600;
  }
  return 640;
};

const drawMaze = (mazeArray: boolean[][]) => {
  if (mazeArray[1][mazeArray[1].length - 1]) {
    return;
  }
  const squareWidth = getSquareWidth(mazeArray.length);
  const canvas = document.querySelector('#mazeCanvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  mazeArray.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      if (!isLoad) {
        context.fillRect(
          xIndex * squareWidth,
          yIndex * squareWidth,
          squareWidth,
          squareWidth,
        );
      }
    });
  });
};
