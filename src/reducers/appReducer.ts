/* eslint-disable no-param-reassign */

import { AppState, Direction } from '../module/appModule';

// eslint-disable-next-line complexity
const moveSquare = (state: AppState, payload: Direction) => {
  const { mazeArray, goalX, playerLocation, start, pause } = state;
  if (pause) {
    return;
  }
  const [currentX, currentY] = playerLocation;
  const [moveX, moveY] = parseDirectionArray(payload);
  const [nextX, nextY] = [currentX + moveX, currentY + moveY];

  if (currentX === 1 && currentY === mazeArray.length - 1 && !start) {
    state.start = true;
    state.timer.startUnixtime = new Date().getTime();
  }

  if (
    nextX < 0 ||
    nextX > mazeArray.length - 1 ||
    nextY < 0 ||
    nextY > mazeArray.length - 1
  ) {
    return;
  }
  if (!mazeArray[nextY][nextX]) {
    return;
  }
  state.playerLocation = [nextX, nextY];

  if (nextX === goalX && nextY === 0) {
    state.pause = true;
    clearInterval(state.timer.intervalNumber);
    state.timer.intervalNumber = 0;
    const bestTime = state.bestTime[state.mazeSize];
    if (typeof bestTime === 'undefined' || state.timer.time < bestTime) {
      state.bestTime = {
        ...state.bestTime,
        [state.mazeSize]: state.timer.time,
      };
      localStorage.bestTime = JSON.stringify(state.bestTime);
    }
  }
};

export { moveSquare, parseDirectionArray };

const parseDirectionArray = (direction: Direction): [number, number] => {
  switch (direction) {
    case 'up':
      return [0, -1];
    case 'down':
      return [0, 1];
    case 'left':
      return [-1, 0];
    case 'right':
      return [1, 0];
    default:
      return [0, 0];
  }
};
