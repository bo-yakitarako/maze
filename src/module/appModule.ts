import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';

const initialState = {
  mazeSize: 20,
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
  },
});

const store = configureStore({
  middleware: [...getDefaultMiddleware()],
  reducer: appModule.reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export { appModule, store };
