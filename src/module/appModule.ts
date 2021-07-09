/* eslint-disable no-param-reassign */

import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { MazeGenerator } from '../mazeUtility/MazeGenerator';
import { moveSquare } from '../reducers/appReducer';

const mazeSize = localStorage.mazeSize * 1 || 20;
let bestTime = JSON.parse(localStorage.bestTime || '{}') as {
  [key in Mode]: BestTime;
};

if (!Object.keys(bestTime).includes('reach')) {
  bestTime = {
    reach: bestTime as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    longest: {},
  };
}

type BestTime = { [key in number]: number | undefined };
type Mode = 'reach' | 'longest';
type Point = [number, number];

const initialState = {
  mode: 'reach' as Mode,
  mazeSize,
  mazeArray: [...Array(mazeSize + 2)].map(() =>
    [...Array(mazeSize + 2)].map(() => true),
  ),
  answer: [] as Point[],
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
  bestTime,
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
      const mazeArray = mazeGenerator.generate(state.mode);
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
      if (state.pause) {
        return;
      }
      state.pause = true;
      clearInterval(state.timer.intervalNumber);
      state.timer.intervalNumber = 0;
      state.timer.pausedUnixtime = new Date().getTime();
    },
    restartMaze: (state) => {
      const { playerLocation, goalX } = state;
      if (playerLocation[0] === goalX && playerLocation[1] === 0) {
        return;
      }
      state.pause = false;
      const { pausedUnixtime } = state.timer;
      state.timer.pauseInterval += new Date().getTime() - pausedUnixtime;
      state.timer.pausedUnixtime = 0;
    },
    tick: (state) => {
      const { pauseInterval, startUnixtime } = state.timer;
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
