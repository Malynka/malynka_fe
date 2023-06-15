import type { FunctionComponent } from 'react';
import { IMenuIconProps } from '../types';

const HomeIcon: FunctionComponent<IMenuIconProps> = ({
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
      d="M42.8 8.8H5.2A1.2 1.2 0 0 1 4 7.6V5.2A1.2 1.2 0 0 1 5.2 4h37.6A1.2 1.2 0 0 1 44 5.2v2.4a1.2 1.2 0 0 1-1.2 1.2ZM42.4 11.2v21.6a1.6 1.6 0 0 1-1.6 1.6H7.2a1.6 1.6 0 0 1-1.6-1.6V11.2M24 36.8v9.6M31.7 36.917l3.783 9.317"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M31.2 22.4a7.2 7.2 0 0 1-7.2 7.2 7.2 7.2 0 0 1-7.2-7.2 7.2 7.2 0 0 1 7.2-7.2v7.2h7.2Z"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M27.2 19.2V12a7.2 7.2 0 0 1 7.2 7.2h-7.2ZM36.8 13.6H40"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M9.6 30.4H8V32h1.6v-1.6ZM12.8 30.4h-1.6V32h1.6v-1.6ZM16 30.4h-1.6V32H16v-1.6Z"
      stroke={color}
    />
    <path
      d="m16.3 36.917-3.783 9.317"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </svg>
);

export default HomeIcon;