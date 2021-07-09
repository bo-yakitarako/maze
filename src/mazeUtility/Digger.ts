const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

class Digger {
  private mazeArray: boolean[][];
  private addedLoads: [number, number][];
  private diggableLoads: [number, number][];
  private mazeWidth: number;

  constructor(
    originalMazeArray: boolean[][],
    diggableLoads: [number, number][],
  ) {
    this.mazeArray = originalMazeArray.map((row) => [...row]);
    this.mazeWidth = this.mazeArray.length;
    this.diggableLoads = diggableLoads.map(
      (position) => [...position] as [number, number],
    );
    this.addedLoads = [...this.diggableLoads];
  }

  public dig() {
    const firstLoadIndex = Math.floor(
      Math.random() * this.diggableLoads.length,
    );
    let digPosition = this.diggableLoads[firstLoadIndex];
    let nextPositions = this.getNextPositions(digPosition);
    while (nextPositions.length > 0) {
      const positionIndex = Math.floor(Math.random() * nextPositions.length);
      digPosition = nextPositions[positionIndex];
      this.mazeArray[digPosition[1]][digPosition[0]] = true;
      this.addedLoads = [...this.addedLoads, digPosition];
      nextPositions = this.getNextPositions(digPosition);
    }
    const nextAvailableLoads = this.addedLoads.filter(
      (loadPosition) => this.getNextPositions(loadPosition).length !== 0,
    );
    return {
      mazeArray: this.mazeArray,
      nextAvailableLoads,
    };
  }

  private getNextPositions([digX, digY]: [number, number]) {
    return DIRECTIONS.filter(([nextX, nextY]) =>
      this.canDigNext([digX + nextX, digY + nextY], [digX, digY]),
    ).map(([nextX, nextY]) => [digX + nextX, digY + nextY] as [number, number]);
  }

  private canDigNext(
    [positionX, positionY]: [number, number],
    [excludeX, excludeY]: [number, number],
  ) {
    if (
      this.mazeArray[positionY][positionX] ||
      positionX < 1 ||
      positionY < 1 ||
      positionX >= this.mazeWidth - 1 ||
      positionY >= this.mazeWidth - 1
    ) {
      return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const [nextX, nextY] of DIRECTIONS) {
      const x = positionX + nextX;
      const y = positionY + nextY;
      if (x === excludeX && y === excludeY) {
        continue; // eslint-disable-line no-continue
      }
      if (this.mazeArray[y][x]) {
        return false;
      }
    }
    return true;
  }
}

export { Digger };
