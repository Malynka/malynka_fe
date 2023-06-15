import type {
  ChangeEventHandler,
  FunctionComponent,
} from "react";
import {
  useEffect,
  useState,
} from 'react';
import { Body } from '@typography';
import { Input, Slider, SwitchContainer, SwitchIndicator } from './styles';

export interface SwitchProps {
  labels: {
    checked: string;
    unchecked: string;
  }
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switch: FunctionComponent<SwitchProps> = ({
  id,
  labels,
  checked,
  disabled,
  onChange,
}) => {
  const [selfChecked, setSelfChecked] = useState(false);

  useEffect(() => {
    setSelfChecked(!!checked);
  }, [checked]);

  return (
    <SwitchContainer>
      <SwitchIndicator disabled={disabled}>
        <Input
          disabled={disabled}
          id={id}
          type="checkbox"
          checked={selfChecked}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            } else if (checked === undefined) {
              setSelfChecked(prev => !prev);
            }
          }}
        />
        <Slider />
      </SwitchIndicator>
      <Body>{ labels[selfChecked ? 'checked' : 'unchecked']  }</Body>
    </SwitchContainer>
  );
};


export default Switch;