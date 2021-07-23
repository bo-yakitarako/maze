import { Mode, Point } from '../module/appModule';

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const generate = (size: number, mode: Mode) => {
  const width = size + 3;
  const maze = [...Array(width)].map(() => [...Array(width)].map(() => false));
  maze[width - 1][1] = maze[width - 2][1] = true; // eslint-disable-line no-multi-assign
  let diggableRoads = [[1, width - 2]] as [number, number][];
  while (diggableRoads.length > 0) {
    diggableRoads = dig(maze, diggableRoads);
  }
  if (mode === 'reach') {
    maze[0][width - 2] = true;
  }
  return maze;
};

export { generate, DIRECTIONS };

/* eslint-disable no-param-reassign */
const dig = (maze: boolean[][], diggableRoads: Point[]) => {
  const firstLoadIndex = Math.floor(Math.random() * diggableRoads.length);
  const digPosition = diggableRoads[firstLoadIndex];
  let nextPositions = getNextPositions(maze, digPosition);
  while (nextPositions.length > 0) {
    const positionIndex = Math.floor(Math.random() * nextPositions.length);
    const digPositions = nextPositions[positionIndex];
    digPositions.forEach(([x, y]) => {
      maze[y][x] = true;
    });
    diggableRoads = [...diggableRoads, digPositions[1]];
    nextPositions = getNextPositions(maze, digPositions[1]);
  }
  return diggableRoads.filter(
    (roadPoint) => getNextPositions(maze, roadPoint).length !== 0,
  );
};

const getNextPositions = (maze: boolean[][], [digX, digY]: Point) => {
  return DIRECTIONS.filter(([nextX, nextY]) =>
    canDigNext(maze, [digX + nextX, digY + nextY], [digX, digY]),
  ).map(
    ([nextX, nextY]) =>
      [
        [digX + nextX, digY + nextY],
        [digX + 2 * nextX, digY + 2 * nextY],
      ] as [Point, Point],
  );
};

const canDigNext = (maze: boolean[][], position: Point, exclude: Point) => {
  const [positionX, positionY] = position;
  const [excludeX, excludeY] = exclude;
  if (
    maze[positionY][positionX] ||
    position.some((xy) => xy < 1 || xy >= maze.length - 1)
  ) {
    return false;
  }
  return DIRECTIONS.every(([nextX, nextY]) => {
    const x = positionX + nextX;
    const y = positionY + nextY;
    return (x === excludeX && y === excludeY) || !maze[y][x];
  });
};
