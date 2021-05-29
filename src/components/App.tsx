import React from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import { MazeCanvas } from './MazeCanvas';

const App: React.FC = () => (
  <StylesProvider injectFirst>
    <AppWrapper>
      うんちぶり
      <MazeCanvas />
    </AppWrapper>
  </StylesProvider>
);

export { App };

const AppWrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
