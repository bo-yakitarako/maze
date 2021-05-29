import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appModule } from '../module/appModule';

const { move } = appModule.actions;

type Arrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

const useKeyboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key as Arrow) {
      case 'ArrowUp':
        dispatch(move('up'));
        break;
      case 'ArrowDown':
        dispatch(move('down'));
        break;
      case 'ArrowLeft':
        dispatch(move('left'));
        break;
      case 'ArrowRight':
        dispatch(move('right'));
        break;
      default:
        break;
    }
  };
};

export { useKeyboard };
