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
    const { answer, timer, playerLocation, pause } = getState();
    const [goalX, goalY] = answer[answer.length - 1];
    const [x, y] = playerLocation;
    if (pause || timer.intervalNumber > 0 || (x === goalX && y === goalY)) {
      return;
    }
    const intervalNumber = window.setInterval(() => {
      dispatch(tick());
    }, 30);
    dispatch(setIntevalNumber(intervalNumber));
  },
);

export { startTick };
