import React, { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import styled from 'styled-components';

type Props = {
  open: boolean;
  handleThisDialog: (status: boolean) => void;
  handleSettingDialog: (status: boolean) => void;
};

const ModeDescriptionDialog: React.FC<Props> = ({
  open,
  handleThisDialog,
  handleSettingDialog,
}) => {
  const handleClose = useCallback(() => {
    handleThisDialog(false);
    handleSettingDialog(true);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>モードを説明するよ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <ModeTitle>到達モード</ModeTitle>
          <br />
          <span>ゴールが右上に固定されているよ。脱出的な感じだね</span>
        </DialogContentText>
        <DialogContentText>
          <ModeTitle>最長モード</ModeTitle>
          <br />
          <span>
            ゴールの置いてある位置が、スタートから最も遠い地点になっているよ。ながいよー
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModeDescriptionDialog };

const ModeTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
