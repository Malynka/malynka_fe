import type { FunctionComponent, MouseEventHandler } from "react";
import type { DialogProps } from "@mui/material";
import { DialogContent, DialogActions } from '@mui/material';
import { CheckCircleOutlineRounded as SuccessIcon, CancelRounded as FailIcon } from '@mui/icons-material';
import { Body } from '@typography';
import { RoundedButton } from '@molecules';
import { StyledDialog, StyledTitle } from "./styles";


export interface IInfoDialogProps extends Pick<DialogProps, 'open'> {
  status?: 'success' | 'error';
  title: string;
  message: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const InfoDialog: FunctionComponent<IInfoDialogProps> = ({
  open,
  status,
  title,
  message,
  onClose,
}) => (
  <StyledDialog open={open} onClose={onClose}>
    <StyledTitle>{title}</StyledTitle>
    <DialogContent sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
      {status === "success" ? <SuccessIcon fontSize="large" color="success" /> : <FailIcon fontSize="large" color="error" />}
      <Body>{message}</Body>
    </DialogContent>
    <DialogActions sx={{ textAlign: 'right' }}>
      <RoundedButton text="ОК" variant="contained" onClick={onClose} />
    </DialogActions>
  </StyledDialog>
);

export default InfoDialog;
