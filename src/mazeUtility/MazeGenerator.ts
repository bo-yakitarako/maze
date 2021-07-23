import { Mode } from '../module/appModule';
import { Digger } from './Digger';

class MazeGenerator {
  private mazeArray: boolean[][];
  private mazeWidth: number;

  constructor(width: number) {
    this.mazeWidth = width + 3;
    this.mazeArray = [...Array(this.mazeWidth)].map(() =>
      [...Array(this.mazeWidth)].map(() => false),
    );
    // eslint-disable-next-line no-multi-assign
    this.mazeArray[width + 2][1] = this.mazeArray[width + 1][1] = true;
  }

  public generate(mode: Mode) {
    let diggableRoads = [[1, this.mazeWidth - 2]] as [number, number][];
    while (diggableRoads.length > 0) {
      const digger = new Digger(this.mazeArray, diggableRoads);
      const { mazeArray, nextDiggableRoads } = digger.dig();
      this.mazeArray = mazeArray;
      diggableRoads = nextDiggableRoads;
    }
    if (mode === 'reach') {
      this.mazeArray[0][this.mazeWidth - 2] = true;
    }
    return this.mazeArray;
  }
}

export { MazeGenerator };
