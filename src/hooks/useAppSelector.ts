import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../module/appModule';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useAppSelector };
