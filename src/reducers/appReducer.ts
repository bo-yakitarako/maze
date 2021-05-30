/* eslint-disable no-param-reassign */

import { AppState, Direction } from '../module/appModule';

// eslint-disable-next-line complexity
const moveSquare = (state: AppState, payload: Direction) => {
  const { mazeArray, goalX, playerLocation, start, goal } = state;
  if (goal) {
    return;
  }
  const [currentX, currentY] = playerLocation;
  const [moveX, moveY] = parseDirectionArray(payload);
  const [nextX, nextY] = [currentX + moveX, currentY + moveY];

  if (currentX === 1 && currentY === mazeArray.length - 1 && !start) {
    state.start = true;
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

  if (nextX === goalX && nextY === 0 && !goal) {
    state.goal = true;
  }
};

export { moveSquare };

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
