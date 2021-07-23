import { Point } from '../module/appModule';

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

class Digger {
  private mazeArray: boolean[][];
  private diggableRoads: Point[];

  constructor(mazeArray: boolean[][], diggableLoads: Point[]) {
    this.mazeArray = [...mazeArray];
    this.diggableRoads = [...diggableLoads];
  }

  public dig() {
    const firstLoadIndex = Math.floor(
      Math.random() * this.diggableRoads.length,
    );
    const digPosition = this.diggableRoads[firstLoadIndex];
    let nextPositions = this.getNextPositions(digPosition);
    while (nextPositions.length > 0) {
      const positionIndex = Math.floor(Math.random() * nextPositions.length);
      const digPositions = nextPositions[positionIndex];
      digPositions.forEach(([x, y]) => {
        this.mazeArray[y][x] = true;
      });
      this.diggableRoads = [...this.diggableRoads, digPositions[1]];
      nextPositions = this.getNextPositions(digPositions[1]);
    }
    const nextDiggableRoads = this.diggableRoads.filter(
      (loadPosition) => this.getNextPositions(loadPosition).length !== 0,
    );
    return {
      mazeArray: this.mazeArray,
      nextDiggableRoads,
    };
  }

  private getNextPositions([digX, digY]: Point) {
    return DIRECTIONS.filter(([nextX, nextY]) =>
      this.canDigNext([digX + nextX, digY + nextY], [digX, digY]),
    ).map(
      ([nextX, nextY]) =>
        [
          [digX + nextX, digY + nextY],
          [digX + 2 * nextX, digY + 2 * nextY],
        ] as [Point, Point],
    );
  }

  private canDigNext(position: Point, [excludeX, excludeY]: Point) {
    const [positionX, positionY] = position;
    if (
      this.mazeArray[positionY][positionX] ||
      position.some((xy) => xy < 1 || xy >= this.mazeArray.length - 1)
    ) {
      return false;
    }
    return DIRECTIONS.every(([nextX, nextY]) => {
      const x = positionX + nextX;
      const y = positionY + nextY;
      return (x === excludeX && y === excludeY) || !this.mazeArray[y][x];
    });
  }
}

export { Digger, DIRECTIONS };
