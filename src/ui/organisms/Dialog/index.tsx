import type { FunctionComponent, PropsWithChildren } from 'react';
import { DialogProps, DialogContent, DialogActions } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { RoundedButton } from '@molecules';
import { StyledDialog, StyledTitle, ButtonsWrapper, PreButtonsComponentWrapper } from './styles';
import { KeyboardEventHandler } from 'react';

export interface IDialogProps extends Pick<DialogProps, 'open'> {
  title: string;
  disableConfirm?: boolean; 
  preButtonsComponent?: JSX.Element;
  confirmTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

const Dialog: FunctionComponent<PropsWithChildren<IDialogProps>> = ({
  open,
  title,
  disableConfirm,
  confirmTitle,
  onKeyDown,
  onConfirm,
  onCancel,
  preButtonsComponent,
  children
}) => {
  return (
    <StyledDialog open={open} onClose={onCancel} onKeyDown={onKeyDown}>
      <StyledTitle>{title}</StyledTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <PreButtonsComponentWrapper>
          {preButtonsComponent}
        </PreButtonsComponentWrapper>
        <ButtonsWrapper>
          <RoundedButton
            text={confirmTitle || 'Підвердити'}
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
      </DialogActions>
    </StyledDialog>
  );
};

export default Dialog;
