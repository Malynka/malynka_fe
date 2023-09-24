import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import type { DialogProps } from "@mui/material";
import { DialogContent, DialogActions } from '@mui/material';
import AuthCode from 'react-auth-code-input';
import { RoundedButton } from '@molecules';
import { StyledDialog, StyledTitle, AuthCodeWrapper } from "./styles";


export interface IInfoDialogProps extends Pick<DialogProps, 'open'> {
  onClose: (password: string | undefined) => void;
}

const InfoDialog: FunctionComponent<IInfoDialogProps> = ({
  open,
  onClose,
}) => {
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (password.length === 4) {
      onClose(password);
    }
  }, [password]);

  return (
    <StyledDialog open={open} onClose={() => onClose("")}>
      <StyledTitle>Пароль</StyledTitle>
      <DialogContent>
        <AuthCodeWrapper>
          <AuthCode
            containerClassName="authcode_container"
            allowedCharacters="numeric"
            length={4}
            onChange={(pass) => setPassword(pass)}
            isPassword
          />
        </AuthCodeWrapper>
      </DialogContent>
      <DialogActions sx={{ textAlign: "right" }}>
        <RoundedButton
          text="Відмінити"
          variant="contained"
          color="secondary"
          onClick={() => onClose("")}
        />
      </DialogActions>
    </StyledDialog>
  );
};

export default InfoDialog;
