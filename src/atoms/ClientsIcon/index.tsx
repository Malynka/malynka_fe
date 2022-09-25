import React, { FunctionComponent } from 'react';
import { IMenuIconProps } from '../types';

const ClientsIcon: FunctionComponent<IMenuIconProps> = ({
  width = 48,
  height = 48,
  color = '#000',
  ...props
}) => (
  <svg
    viewBox="0 0 60 60"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 12.8c-1.767 0-3.2-1.493-3.2-3.333V8.133C4.8 6.293 6.233 4.8 8 4.8c1.767 0 3.2 1.492 3.2 3.334v1.333c0 1.84-1.433 3.333-3.2 3.333ZM2.4 24v-4.8A3.2 3.2 0 0 1 5.6 16h4.8a3.2 3.2 0 0 1 3.2 3.2V24M32.8 30.4v-5.6a4 4 0 0 1 4-4h4.8a4 4 0 0 1 4 4v5.6M21.6 33.6c-1.767 0-3.2-1.493-3.2-3.333v-1.334c0-1.84 1.433-3.333 3.2-3.333 1.767 0 3.2 1.493 3.2 3.334v1.333c0 1.84-1.433 3.333-3.2 3.333ZM16 44.8V40a3.2 3.2 0 0 1 3.2-3.2H24a3.2 3.2 0 0 1 3.2 3.2v4.8M39.2 17.6c-2.234 0-4-1.791-4-4V12a4 4 0 0 1 8 0v1.6a4 4 0 0 1-4 4ZM20.223 6.335c1.134.252 2.151.55 2.977.865 2.378.911 4.737 1.998 8.525 5.355M16.995 5.8c.4.045.794.098 1.182.156M13.6 5.6c.466 0 .934.012 1.4.035M25.42 19.718C27.395 17.558 30.073 16 32 16M23.32 22.895c.15-.356.327-.708.527-1.054"
      strokeWidth={2}
      stroke={color}
      strokeMiterlimit={10}
    />
  </svg>
);

export default ClientsIcon;