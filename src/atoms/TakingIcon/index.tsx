
import React, { FunctionComponent } from 'react';
import { IMenuIconProps } from '../types';

const TakingIcon: FunctionComponent<IMenuIconProps> = ({
  width = 48,
  height = 48,
  color = '#000',
  ...props
}) => (
   <svg
    viewBox="0 0 48 48"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m38.614 46.275-.855-1.486a5.74 5.74 0 0 0-2.414-2.28c-2.565-1.282-7.667-3.832-10.24-5.12A2.001 2.001 0 0 1 26 33.6c.322 0 .624.079.893.21 1.107.545 4.445 2.145 4.445 2.145.42.196.836-.278.587-.668l-6.083-9.638A1.6 1.6 0 0 1 27.2 23.2c.574 0 1.07.304 1.358.754a967.016 967.016 0 0 0 4.252 6.503l4.99-2.168c.396-.172.82-.285 1.251-.289 1.386 0 2.58.853 3.049 2.13l4.722 12.869M42.714 25.872c1.07.739 1.903 1.825 2.39 3.156l1.626 4.428M39.2 24.8c.513 0 1.008.059 1.48.17"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="m29.341 39.508-13.464 2.84a2.45 2.45 0 0 1-2.905-1.881L6.452 9.853a2.439 2.439 0 0 1 1.89-2.89l21.381-4.51a2.45 2.45 0 0 1 2.905 1.88l5.108 23.99"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M19.908 7.794 9.744 9.938l1.276 6 19.913-4.2-1.278-6-4.75 1.002M23.082 7.124l-1.354.286M24.343 36.711l-8.517 1.796-4.11-19.296 19.914-4.2 3.11 14.613M29.783 22.264l3.245-.684M13.117 25.78l10.706-2.258M14.469 32.133l10.921-2.304M21.826 34.266l-3.504-16.452M26.073 20.656l-.912-4.284"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M15.2 11.2h-1.6v1.6h1.6v-1.6ZM18.4 10.4h-1.6V12h1.6v-1.6ZM21.6 9.6H20v1.6h1.6V9.6Z"
      fill={color}
    />
    <path
      d="M4.8 33.6v3.2M4.8 40v3.2M9.6 38.4H6.4M3.2 38.4H0M41.6 1.6v4M41.6 8.8v4M47.2 7.2h-4M40 7.2h-4"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </svg>
);

export default TakingIcon;