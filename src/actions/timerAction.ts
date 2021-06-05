import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { AppState, appModule } from '../module/appModule';

const { tick, setIntevalNumber } = appModule.actions;

type ThunkAction = {
  dispatch: Dispatch;
  state: AppState;
};

const startTick = createAsyncThunk<void, void, ThunkAction>(
  'startTick',
  async (v, { dispatch, getState }) => {
    const { timer, playerLocation, goalX, pause } = getState();
    const [x, y] = playerLocation;
    if (pause || timer.intervalNumber > 0 || (x === goalX && y === 0)) {
      return;
    }
    const intervalNumber = window.setInterval(() => {
      dispatch(tick());
    }, 10);
    dispatch(setIntevalNumber(intervalNumber));
  },
);

export { startTick };
