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
  pause: true,
  timer: {
    time: 0,
    startUnixtime: new Date().getTime(),
    pausedUnixtime: 0,
    pauseInterval: 0,
    intervalNumber: 0,
  },
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
      if (state.timer.intervalNumber > 0) {
        clearInterval(state.timer.intervalNumber);
      }
      return {
        ...state,
        mazeArray,
        goalX: mazeArray[0].findIndex((isLoad) => isLoad),
        playerLocation: [1, state.mazeSize + 1],
        start: false,
        pause: false,
        timer: {
          ...state.timer,
          time: 0,
          intervalNumber: 0,
          pauseInterval: 0,
          pausedUnixtime: 0,
        },
      };
    },
    move: (state, { payload }: PayloadAction<Direction>) => {
      moveSquare(state, payload);
    },
    pauseMaze: (state) => {
      state.pause = true;
      clearInterval(state.timer.intervalNumber);
      state.timer.intervalNumber = 0;
      state.timer.pausedUnixtime = new Date().getTime();
    },
    restartMaze: (state) => {
      state.pause = false;
    },
    tick: (state) => {
      let { pauseInterval } = state.timer;
      const { pausedUnixtime, startUnixtime } = state.timer;
      if (pausedUnixtime > 0) {
        pauseInterval += new Date().getTime() - pausedUnixtime;
        state.timer.pauseInterval = pauseInterval;
        state.timer.pausedUnixtime = 0;
      }
      const time = new Date().getTime() - startUnixtime - pauseInterval;
      state.timer.time = time;
    },
    setIntevalNumber: (state, { payload }: PayloadAction<number>) => {
      state.timer.intervalNumber = payload;
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
