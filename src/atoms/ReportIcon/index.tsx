import React, { FunctionComponent } from 'react';
import { IMenuIconProps } from '../types';

const ReportIcon: FunctionComponent<IMenuIconProps> = ({
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
      d="M10.4 36.8c0 1.326 1.433 2.4 3.2 2.4 1.767 0 3.2-1.074 3.2-2.4 0-1.325-1.433-2.4-3.2-2.4-1.767 0-3.2-1.074-3.2-2.4 0-1.325 1.433-2.4 3.2-2.4 1.767 0 3.2 1.075 3.2 2.4M13.6 29.6v-2.4M13.6 41.6v-2.4"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M32.4 44H10a2.8 2.8 0 0 1-2.8-2.8V16.8M12.8 7.2v-.4A2.8 2.8 0 0 1 15.6 4H38M37.6 28.8h6a2.8 2.8 0 0 0 2.8-2.8v-2h-5.6M12 14.4H1.6v-2a2.8 2.8 0 0 1 2.8-2.8h22.4"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M43.6 28.8a2.8 2.8 0 0 1-2.8-2.8V6.8a2.8 2.8 0 1 0-5.6 0v34.4a2.8 2.8 0 1 1-5.6 0V12.4a2.8 2.8 0 0 0-5.6 0v2H11.197"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M40 33.6h-1.6v1.6H40v-1.6ZM40 36.8h-1.6v1.6H40v-1.6ZM40 40h-1.6v1.6H40V40Z"
      fill={color}
    />
  </svg>
);

export default ReportIcon;