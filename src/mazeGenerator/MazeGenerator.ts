import { Digger } from './Digger';

class MazeGenerator {
  private mazeArray: boolean[][];
  private mazeWidth: number;

  constructor(width: number) {
    this.mazeWidth = width + 2;
    this.mazeArray = [...Array(this.mazeWidth)].map(() =>
      [...Array(this.mazeWidth)].map(() => false),
    );
    // eslint-disable-next-line no-multi-assign
    this.mazeArray[1][width + 1] = this.mazeArray[1][width] = true;
  }

  public generate() {
    let availableLoads = [[1, this.mazeWidth - 2]] as [number, number][];
    while (availableLoads.length > 0) {
      const digger = new Digger(this.mazeArray, availableLoads);
      const { mazeArray, nextAvailableLoads } = digger.dig();
      this.mazeArray = mazeArray;
      availableLoads = nextAvailableLoads;
    }
    let goalX = this.mazeWidth - 2;
    while (goalX > 0) {
      if (this.mazeArray[goalX][1]) {
        this.mazeArray[goalX][0] = true;
        break;
      }
      goalX -= 1;
    }
    return this.parseXY();
  }

  public displayMaze() {
    const displayArray = this.parseXY();
    displayArray.forEach((yArray) => {
      const rowText = yArray.map((isLoad) => (isLoad ? '□' : '■')).join(' ');
      console.log(rowText);
    });
  }

  private parseXY() {
    const displayArray = [...Array(this.mazeWidth)].map(() =>
      [...Array(this.mazeWidth)].map(() => false),
    );
    this.mazeArray.forEach((rowArray, xIndex) => {
      rowArray.forEach((isLoad, yIndex) => {
        displayArray[yIndex][xIndex] = isLoad;
      });
    });
    return displayArray;
  }
}

export { MazeGenerator };
