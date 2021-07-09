import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule, Point } from '../module/appModule';
import { useMediaQuery } from './useMediaQuery';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = (canvas: HTMLCanvasElement) => {
  const dispatch = useDispatch();
  const { mazeArray, answer, playerLocation, start, pause, showAnswer } =
    useShallowEqualSelector(
      ({ mazeArray, answer, playerLocation, start, pause, showAnswer }) => ({
        mazeArray,
        answer,
        playerLocation,
        start,
        pause,
        showAnswer,
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
    const blind = !isGoal && !showAnswer && (!start || pause);
    drawMaze(
      canvas,
      mazeArray,
      answer,
      playerLocation,
      windowWidth,
      blind,
      showAnswer,
    );
  }, [
    canvas,
    mazeArray,
    playerLocation,
    windowWidth,
    start,
    pause,
    showAnswer,
  ]);
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
  canvas: HTMLCanvasElement,
  mazeArray: boolean[][],
  answer: Point[],
  [playerLocationX, playerLocationY]: Point,
  windowWidth: number,
  blind: boolean,
  showAnswer: boolean,
) => {
  if (canvas === null) {
    return;
  }
  const squareWidth = getSquareWidth(mazeArray.length, windowWidth);
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
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'white';
  mazeArray.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      if (isLoad) {
        fillRect(xIndex, yIndex);
      }
    });
  });
  if (showAnswer) {
    context.fillStyle = '#d4fccc';
    answer.slice(0, answer.length - 1).forEach(([x, y]) => {
      fillRect(x, y);
    });
    context.fillStyle = '#ff5c5c';
    fillRect(goalX, goalY);
  } else {
    context.fillStyle = '#ff5c5c';
    fillRect(goalX, goalY);
    context.fillStyle = 'cyan';
    fillRect(playerLocationX, playerLocationY);
  }
};
