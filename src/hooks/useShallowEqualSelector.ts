import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../module/appModule';

const useShallowEqualSelector: TypedUseSelectorHook<AppState> = (selector) =>
  useSelector(selector, shallowEqual);

export { useShallowEqualSelector };
