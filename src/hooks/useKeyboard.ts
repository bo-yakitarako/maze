import { useEffect } from 'react';
import { Direction } from '../module/appModule';
import { useController } from './useController';

type Arrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const keyToDirection: { [key in Arrow]: Direction } = {
  ArrowUp: 'up', // eslint-disable-line @typescript-eslint/naming-convention
  ArrowDown: 'down', // eslint-disable-line @typescript-eslint/naming-convention
  ArrowLeft: 'left', // eslint-disable-line @typescript-eslint/naming-convention
  ArrowRight: 'right', // eslint-disable-line @typescript-eslint/naming-convention
};

const useKeyboard = () => {
  const { go, stop } = useController();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key as Arrow;
    go(keyToDirection[key]);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (Object.keys(keyToDirection).includes(event.key)) {
      stop();
    }
  };
};

export { useKeyboard };
