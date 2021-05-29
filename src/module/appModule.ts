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
  mazeArray: [...Array(mazeSize)].map(() =>
    [...Array(mazeSize)].map(() => true),
  ),
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
  },
});

const store = configureStore({
  middleware: [...getDefaultMiddleware()],
  reducer: appModule.reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export { appModule, store };
