import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startTick } from '../actions/timerAction';
import { appModule, Direction } from '../module/appModule';

const { move } = appModule.actions;

const useController = () => {
  const dispatch = useDispatch();

  const [direction, setDirection] = useState<Direction | null>(null);
  const [pressedTime, setPressedTime] = useState(0);

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setPressedTime((prev) => (direction !== null ? prev + 50 : prev));
      if (direction === null || pressedTime < 200) {
        return;
      }
      dispatch(move(direction));
    }, 50);
    return () => {
      clearInterval(intervalHandler);
    };
  }, [direction, pressedTime]);

  const go = useCallback((direction: Direction) => {
    dispatch(move(direction));
    dispatch(startTick());
    setDirection(direction);
    setPressedTime(0);
  }, []);

  const stop = useCallback(() => {
    setDirection(null);
  }, []);

  return { go, stop };
};

export { useController };
