import React, { FunctionComponent } from 'react';
import { IMenuIconProps } from '../types';

const OwnTakingIcon: FunctionComponent<IMenuIconProps> = ({
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
      d="M17.004 19.2a5.6 5.6 0 1 0 3.767-2.338M15.2 28H28"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M22.4 30.4h-1.6V32h1.6v-1.6ZM22.4 33.6h-1.6v1.6h1.6v-1.6ZM22.4 36.8h-1.6v1.6h1.6v-1.6Z"
      stroke={color}
    />
    <path
      d="M13.45 26.131C6.886 29.323 2.4 35.768 2.4 43.201c0 .812.054 1.613.158 2.4M40.975 45.125l4.538-2.283a1.6 1.6 0 0 0 .887-1.432v-3.456c0-.689-.44-1.3-1.094-1.519l-3.09-1.028a2.467 2.467 0 0 1-1.363-1.158 19.445 19.445 0 0 0-5.198-5.98l1.083-3.829a1.6 1.6 0 0 0-2.253-1.872l-4.776 2.388M40.8 11.2V2.4M37.6 14.4V5.6M37.6 18.4V16M2.4 4.8c1.594 0 3.182-.195 4.728-.582A34.101 34.101 0 0 1 15.397 3.2h4.877c.85 0 1.663.337 2.263.938l6.125 6.125c.6.6.938 1.415.938 2.263V20"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M25.6 15.2v-.137a1.6 1.6 0 0 0-.469-1.13l-3.062-3.063c-.3-.301-.708-.47-1.132-.47H14.8a2 2 0 0 0-.36 3.968l4.72.865a2 2 0 0 1-.36 3.967h-5.65a13.05 13.05 0 0 1-7.831-2.61l-2.58-1.935"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </svg>
);

export default OwnTakingIcon;