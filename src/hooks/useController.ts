import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appModule, Direction } from '../module/appModule';

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
      dispatch(appModule.actions.move(direction));
    }, 50);
    return () => {
      clearInterval(intervalHandler);
    };
  }, [direction, pressedTime]);

  const go = (direction: Direction) => {
    dispatch(appModule.actions.move(direction));
    setDirection(direction);
    setPressedTime(0);
  };
  const stop = () => {
    setDirection(null);
  };

  return { go, stop };
};

export { useController };
