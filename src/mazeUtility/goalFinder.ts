type Point = [number, number];
type Road = {
  reach: Point[];
  longest: Point[];
};

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const findAnswer = (mazeArray: boolean[][]) => {
  const foundRoads = [
    [1, mazeArray.length - 1],
    [1, mazeArray.length - 2],
  ] as Point[];
  return findAnswerRecursion(mazeArray, foundRoads, foundRoads);
};

const findAnswerRecursion = (
  mazeArray: boolean[][],
  defaultFoundRoads: Point[],
  defaultLongest: Point[],
): Road => {
  let foundRoads = [...defaultFoundRoads];
  let nextPoints = getNextPoints(mazeArray, foundRoads);
  const answer = { reach: foundRoads, longest: defaultLongest };
  while (nextPoints.length === 1) {
    foundRoads = [...foundRoads, nextPoints[0]];
    if (nextPoints[0][1] === 0) {
      answer.reach = foundRoads;
      nextPoints = [];
      break;
    }
    nextPoints = getNextPoints(mazeArray, foundRoads);
  }
  return parseAnswer(mazeArray, answer, foundRoads, nextPoints);
};

const getNextPoints = (mazeArray: boolean[][], foundRoads: Point[]) => {
  const foundRoadsFromLast = [...foundRoads].reverse();
  const [currentX, currentY] = foundRoadsFromLast[0];
  const [preRoadX, preRoadY] = foundRoadsFromLast[1];
  return DIRECTIONS.map(([moveX, moveY]) => [
    currentX + moveX,
    currentY + moveY,
  ]).filter(
    ([x, y]) => mazeArray[y][x] && !(x === preRoadX && y === preRoadY),
  ) as Point[];
};

const parseAnswer = (
  mazeArray: boolean[][],
  answer: Road,
  foundRoads: Point[],
  nextPoints: Point[],
): Road => {
  let { reach, longest } = answer;
  if (nextPoints.length === 0 && foundRoads.length > longest.length) {
    longest = foundRoads;
  }
  nextPoints.forEach((nextPoint) => {
    const foundRoadsAfterCrossroad = [...foundRoads, nextPoint];
    if (nextPoint[1] === 0) {
      reach = foundRoadsAfterCrossroad;
      return;
    }
    const roadOnDeadEnd = findAnswerRecursion(
      mazeArray,
      foundRoadsAfterCrossroad,
      longest,
    );
    if (roadOnDeadEnd.reach[roadOnDeadEnd.reach.length - 1][1] === 0) {
      reach = roadOnDeadEnd.reach;
    }
    if (roadOnDeadEnd.longest.length > answer.longest.length) {
      longest = roadOnDeadEnd.longest;
    }
  });
  return { reach, longest };
};

export { findAnswer };
