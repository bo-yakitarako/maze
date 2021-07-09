import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useAppSelector } from '../hooks/useAppSelector';
import { appModule, Mode } from '../module/appModule';
import { startTick } from '../actions/timerAction';
import { ModeDescriptionDialog } from './ModeDescriptionDialog';

const {
  setMode,
  setMazeSize,
  generateMaze,
  pauseMaze,
  restartMaze,
  displayAnswer,
} = appModule.actions;

const modeTitle: { [key in Mode]: string } = {
  reach: '到達モード',
  longest: '最長モード',
};

const SettingDialog: React.FC = () => {
  const dispatch = useDispatch();

  const { mode, modes, mazeSize, start, showAnswer } = useAppSelector(
    ({ mode, mazeSize, start, bestTime, showAnswer }) => ({
      mode,
      modes: Object.keys(bestTime) as Mode[],
      mazeSize,
      start,
      showAnswer,
    }),
  );

  const [formMode, setFormMode] = useState(mode);
  const [formMazeSize, setFormMazeSize] = useState(mazeSize);

  const [open, setOpen] = useState(false);
  const [modeDescriptionOpen, setModeDescriptionOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (start) {
      dispatch(pauseMaze());
    }
  }, [start]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (start) {
      dispatch(restartMaze());
      dispatch(startTick());
    }
  }, [start]);

  const handleModeDescriptionOpen = useCallback(() => {
    setOpen(false);
    setModeDescriptionOpen(true);
  }, []);

  const handleModeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const mode = event.target.value as Mode;
      setFormMode(mode);
    },
    [],
  );

  const handleSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const mazeSize = parseInt(event.target.value, 10);
      setFormMazeSize(mazeSize);
    },
    [],
  );

  const handleRegenerate = useCallback(() => {
    dispatch(setMode(formMode));
    dispatch(setMazeSize(formMazeSize));
    dispatch(generateMaze());
    setOpen(false);
  }, [formMode, formMazeSize]);

  const handleDiaplayAnswer = useCallback(() => {
    dispatch(displayAnswer());
    setOpen(false);
  }, []);

  return (
    <FabLayout>
      <Fab color="primary" onClick={handleOpen}>
        <Settings />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>迷路だよ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            PCの場合は十字キーで、スマホの場合は画面下部のコントローラーで操作できるよ。たぶんね
          </DialogContentText>
          <DialogContentText>
            迷路を作り直したり、迷路の大きさを変えたい場合は好きなサイズを選んで「再生成」を押そうね
          </DialogContentText>
          <DialogContentText color="primary">
            <AboutMode onClick={handleModeDescriptionOpen}>
              モードについて
            </AboutMode>
          </DialogContentText>
          <TextFieldLayout>
            <StyledTextField
              select
              label="モード"
              value={formMode}
              variant="outlined"
              onChange={handleModeChange}
            >
              {modes.map((value) => (
                <MenuItem key={value} value={`${value}`}>
                  {modeTitle[value]}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              select
              label="迷路の大きさ"
              value={`${formMazeSize}`}
              variant="outlined"
              onChange={handleSizeChange}
            >
              {[10, 20, 30, 40, 50].map((value) => (
                <MenuItem key={value} value={`${value}`}>
                  {value}
                </MenuItem>
              ))}
            </StyledTextField>
          </TextFieldLayout>
        </DialogContent>
        <DialogActions>
          {!showAnswer && (
            <Button onClick={handleDiaplayAnswer} color="primary">
              答えを見る
            </Button>
          )}
          <Button onClick={handleRegenerate} color="primary">
            再生成
          </Button>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
      <ModeDescriptionDialog
        open={modeDescriptionOpen}
        handleThisDialog={setModeDescriptionOpen}
        handleSettingDialog={setOpen}
      />
    </FabLayout>
  );
};

export { SettingDialog };

const FabLayout = styled.div`
  position: absolute;
  right: 8px;
  bottom: -60px;
`;

const AboutMode = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const TextFieldLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 200px;
  margin-bottom: 16px;
`;
