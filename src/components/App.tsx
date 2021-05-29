import React from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import { MazeCanvas } from './MazeCanvas';
import { SPController } from './SPController';
import { SettingDialog } from './SettingDialog';

const App: React.FC = () => (
  <StylesProvider injectFirst>
    <AppWrapper>
      <MazeCanvas />
      <SPController />
      <SettingDialog />
    </AppWrapper>
  </StylesProvider>
);

export { App };

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 95vh;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
