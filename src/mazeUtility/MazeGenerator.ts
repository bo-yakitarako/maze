import { Mode } from '../module/appModule';
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
    this.mazeArray[width + 1][1] = this.mazeArray[width][1] = true;
  }

  public generate(mode: Mode) {
    let availableLoads = [[1, this.mazeWidth - 2]] as [number, number][];
    while (availableLoads.length > 0) {
      const digger = new Digger(this.mazeArray, availableLoads);
      const { mazeArray, nextAvailableLoads } = digger.dig();
      this.mazeArray = mazeArray;
      availableLoads = nextAvailableLoads;
    }
    if (mode === 'reach') {
      let goalX = this.mazeWidth - 2;
      while (goalX > 0) {
        if (this.mazeArray[1][goalX]) {
          this.mazeArray[0][goalX] = true;
          break;
        }
        goalX -= 1;
      }
    }
    return this.mazeArray;
  }
}

export { MazeGenerator };
