import { Point } from '../module/appModule';
import { DIRECTIONS } from './Digger';

type Road = { reach: Point[]; longest: Point[] };

const findAnswer = (mazeArray: boolean[][]) => {
  const foundRoads = [
    [1, mazeArray.length - 1],
    [1, mazeArray.length - 2],
  ] as Point[];
  return _findAnswer(mazeArray, foundRoads, [...foundRoads]);
};

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const _findAnswer = (maze: boolean[][], roads: Point[], longest: Point[]) => {
  let foundRoads = [...roads];
  let nextPoints = getNextPoints(maze, foundRoads);
  while (nextPoints.length === 1) {
    foundRoads = [...foundRoads, nextPoints[0]];
    if (nextPoints[0][1] === 0) {
      return { reach: foundRoads, longest };
    }
    nextPoints = getNextPoints(maze, foundRoads);
  }
  if (nextPoints.length === 0 && foundRoads.length > longest.length) {
    longest = foundRoads; // eslint-disable-line no-param-reassign
  }
  const defaultAnswer = { reach: [...foundRoads], longest };
  return nextPoints.reduce((pre, nextPoint) => {
    const afterBranch = [...foundRoads, nextPoint];
    if (nextPoint[1] === 0) {
      return { ...pre, reach: afterBranch };
    }
    const deadEnd = _findAnswer(maze, afterBranch, pre.longest) as Road;
    const [, reachLastY] = deadEnd.reach[deadEnd.reach.length - 1];
    const reach = reachLastY === 0 ? deadEnd.reach : pre.reach;
    if (pre.longest.length < deadEnd.longest.length) {
      return { reach, longest: deadEnd.longest };
    }
    return { ...pre, reach };
  }, defaultAnswer);
};

const getNextPoints = (mazeArray: boolean[][], foundRoads: Point[]) => {
  const [[currentX, currentY], [preX, preY]] = [...foundRoads].reverse();
  return DIRECTIONS.map(([x, y]) => [currentX + x, currentY + y]).filter(
    ([x, y]) => mazeArray[y][x] && !(x === preX && y === preY),
  ) as Point[];
};

export { findAnswer };
