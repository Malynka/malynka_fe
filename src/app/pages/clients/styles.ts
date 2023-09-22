import styled from "styled-components";
import { inputBaseClasses, inputAdornmentClasses } from '@mui/material';

export const ClientsContainer = styled.div`
`;

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  &&& .${inputBaseClasses.root} .${inputAdornmentClasses.root} {
    margin-top: 0;
  }
`;