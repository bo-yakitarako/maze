import { createContext, useContext } from 'react';

const BREAKPOINTS = {
  SP: 767,
  SP_SMALL: 365,
};

type TypeWindowContext = {
  isSp: () => boolean;
  isPc: () => boolean;
  isSpSmall: () => boolean;
};

const WindowContext = createContext<TypeWindowContext>({
  isSp: () => window.innerWidth <= BREAKPOINTS.SP,
  isPc: () => window.innerWidth > BREAKPOINTS.SP,
  isSpSmall: () => window.innerWidth <= BREAKPOINTS.SP_SMALL,
});

const useMediaQuery = (): TypeWindowContext => useContext(WindowContext);

export { useMediaQuery };
