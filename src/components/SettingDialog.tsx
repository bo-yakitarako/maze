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
import { appModule } from '../module/appModule';
import { startTick } from '../actions/timerAction';

const { setMazeSize, generateMaze, pauseMaze, restartMaze } = appModule.actions;

const SettingDialog: React.FC = () => {
  const dispatch = useDispatch();

  const { mazeSize, start } = useAppSelector(({ mazeSize, start }) => ({
    mazeSize,
    start,
  }));

  const [formMazeSize, setFormMazeSize] = useState(mazeSize);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
    if (start) {
      dispatch(pauseMaze());
    }
  }, [start]);
  const handleClose = useCallback(() => {
    setFormMazeSize(mazeSize);
    setOpen(false);
    if (start) {
      dispatch(restartMaze());
      dispatch(startTick());
    }
  }, [start]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const mazeSize = parseInt(event.target.value, 10);
      setFormMazeSize(mazeSize);
    },
    [],
  );

  const handleRegenerate = useCallback(() => {
    dispatch(setMazeSize(formMazeSize));
    dispatch(generateMaze());
    setOpen(false);
  }, [formMazeSize]);

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
            スタート時や、この設定画面を開いたときは迷路の中身は見えないようになってるよ。タイマー停止状態で迷路の予習ができちゃうからね
          </DialogContentText>
          <DialogContentText>
            迷路を作り直したり、迷路の大きさを変えたい場合は好きなサイズを選んで「再生成」を押そうね
          </DialogContentText>
          <TextFieldLayout>
            <TextField
              autoFocus
              select
              label="迷路の大きさ"
              value={`${formMazeSize}`}
              helperText="迷路1辺のマスの数だよ"
              variant="outlined"
              onChange={handleChange}
            >
              {[10, 20, 30, 40, 50].map((value) => (
                <MenuItem key={value} value={`${value}`}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </TextFieldLayout>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegenerate} color="primary">
            再生成
          </Button>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </FabLayout>
  );
};

export { SettingDialog };

const FabLayout = styled.div`
  position: absolute;
  right: 8px;
  bottom: -60px;
`;

const TextFieldLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
