import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule, Point } from '../module/appModule';
import { useMediaQuery } from './useMediaQuery';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = () => {
  const dispatch = useDispatch();
  const { mazeArray, answer, playerLocation, start, pause } =
    useShallowEqualSelector(
      ({ mazeArray, answer, playerLocation, start, pause }) => ({
        mazeArray,
        answer,
        playerLocation,
        start,
        pause,
      }),
    );

  const { windowWidth } = useMediaQuery();

  useEffect(() => {
    dispatch(appModule.actions.generateMaze());
  }, []);
  useEffect(() => {
    const goal = answer[answer.length - 1];
    const isGoal =
      playerLocation[0] === goal[0] && playerLocation[1] === goal[1];
    const blind = !isGoal && (!start || pause);
    drawMaze(mazeArray, answer, playerLocation, windowWidth, blind);
  }, [mazeArray, playerLocation, windowWidth, start, pause]);
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
  answer: Point[],
  [playerLocationX, playerLocationY]: Point,
  windowWidth: number,
  blind: boolean,
) => {
  const squareWidth = getSquareWidth(mazeArray.length, windowWidth);
  const canvas = document.querySelector('#mazeCanvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const fillRect = (x: number, y: number) => {
    context.fillRect(
      x * squareWidth,
      y * squareWidth,
      squareWidth,
      squareWidth,
    );
  };
  if (blind) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    const fillPlayerAndStart = (y: number) => {
      context.fillStyle =
        playerLocationX === 1 && y === playerLocationY ? 'cyan' : 'white';
      fillRect(1, y);
    };
    fillPlayerAndStart(mazeArray.length - 1);
    fillPlayerAndStart(mazeArray.length - 2);
    return;
  }
  const [goalX, goalY] = answer[answer.length - 1];
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  mazeArray.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      if (!isLoad) {
        fillRect(xIndex, yIndex);
      }
      if (xIndex === goalX && yIndex === goalY) {
        context.fillStyle = '#ff5c5c';
        fillRect(xIndex, yIndex);
        context.fillStyle = 'black';
      }
      if (xIndex === playerLocationX && yIndex === playerLocationY) {
        context.fillStyle = 'cyan';
        fillRect(xIndex, yIndex);
        context.fillStyle = 'black';
      }
    });
  });
};
