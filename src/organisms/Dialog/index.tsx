import React, { FunctionComponent, PropsWithChildren, MouseEventHandler, useEffect } from 'react';
import { DialogProps, DialogContent } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { RoundedButton } from '@molecules';
import { StyledDialog, StyledTitle, ButtonsWrapper } from './styles';
import { KeyboardEventHandler } from 'react';

export interface IDialogProps extends Pick<DialogProps, 'open'> {
  title: string;
  disableConfirm?: boolean; 
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

const Dialog: FunctionComponent<PropsWithChildren<IDialogProps>> = ({ open, title, disableConfirm, onKeyDown, onConfirm, onCancel, children }) => {
  return (
    <StyledDialog open={open} onClose={onCancel} onKeyDown={onKeyDown}>
      <StyledTitle>{title}</StyledTitle>
      <DialogContent >
        {children}
        <ButtonsWrapper>
          <RoundedButton
            text="Підвердити"
            icon={<CheckIcon />}
            variant="contained"
            color="secondary"
            disabled={disableConfirm}
            onClick={onConfirm}
          />
          <RoundedButton
            text="Скасувати"
            icon={<CloseIcon />}
            variant="contained"
            onClick={onCancel}
          />
        </ButtonsWrapper>
      </DialogContent>
    </StyledDialog>
  );
};

export default Dialog;
