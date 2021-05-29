import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { MazeGenerator } from '../mazeGenerator/MazeGenerator';

const mazeSize = 31;
const initialState = {
  mazeSize,
  mazeArray: [...Array(mazeSize + 2)].map(() =>
    [...Array(mazeSize + 2)].map(() => true),
  ),
  playerLocation: [1, mazeSize + 1] as [number, number],
};

const appModule = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    setMazeSize: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        mazeSize: payload,
      };
    },
    generateMaze: (state) => {
      const mazeGenerator = new MazeGenerator(state.mazeSize);
      return {
        ...state,
        mazeArray: mazeGenerator.generate(),
      };
    },
    move: (state, { payload }: PayloadAction<Direction>) => {
      const { mazeArray, playerLocation } = state;
      const [currentX, currentY] = playerLocation;
      const [moveX, moveY] = parseDirectionArray(payload);
      const [nextX, nextY] = [currentX + moveX, currentY + moveY];
      if (
        nextX < 0 ||
        nextX > mazeArray.length - 1 ||
        nextY < 0 ||
        nextY > mazeArray.length - 1
      ) {
        return { ...state };
      }
      if (!mazeArray[nextY][nextX]) {
        return { ...state };
      }
      return {
        ...state,
        playerLocation: [nextX, nextY],
      };
    },
  },
});

const store = configureStore({
  middleware: [...getDefaultMiddleware()],
  reducer: appModule.reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export { appModule, store };

export type Direction = 'up' | 'down' | 'left' | 'right';

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
