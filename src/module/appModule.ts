/* eslint-disable no-param-reassign */

import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { MazeGenerator } from '../mazeGenerator/MazeGenerator';
import { moveSquare } from '../reducers/appReducer';

const mazeSize = localStorage.mazeSize * 1 || 20;
const initialState = {
  mazeSize,
  mazeArray: [...Array(mazeSize + 2)].map(() =>
    [...Array(mazeSize + 2)].map(() => true),
  ),
  goalX: mazeSize + 1,
  playerLocation: [1, mazeSize + 1] as [number, number],
  start: false,
  goal: false,
};

const appModule = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    setMazeSize: (state, { payload }: PayloadAction<number>) => {
      localStorage.mazeSize = payload;
      return {
        ...state,
        mazeSize: payload,
      };
    },
    generateMaze: (state) => {
      const mazeGenerator = new MazeGenerator(state.mazeSize);
      const mazeArray = mazeGenerator.generate();
      return {
        ...state,
        mazeArray,
        goalX: mazeArray[0].findIndex((isLoad) => isLoad),
        playerLocation: [1, state.mazeSize + 1],
        start: false,
        goal: false,
      };
    },
    move: (state, { payload }: PayloadAction<Direction>) => {
      moveSquare(state, payload);
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
