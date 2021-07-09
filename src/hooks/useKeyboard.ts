import { useEffect } from 'react';
import { Direction } from '../module/appModule';
import { useController } from './useController';

type Arrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const keyToDirection: { [key in Arrow]: Direction } = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
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
    if (Object.keys(keyToDirection).includes(key)) {
      event.preventDefault();
      go(keyToDirection[key]);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (Object.keys(keyToDirection).includes(event.key)) {
      event.preventDefault();
      stop();
    }
  };
};

export { useKeyboard };
