import type { FunctionComponent } from "react"
import { IMenuIconProps } from '../types';

const SalesIcon: FunctionComponent<IMenuIconProps> = ({
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
      d="M24 47c3.866 0 7-1.567 7-3.5S27.866 40 24 40s-7 1.567-7 3.5 3.134 3.5 7 3.5Z"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M30.987 43.29C32.209 44.314 34.442 45 37 45c3.866 0 7-1.567 7-3.5S40.866 38 37 38s-7 1.567-7 3.5c0 .07 0 .134.008.203M17 48.5c0 1.933 3.134 3.5 7 3.5s7-1.567 7-3.5"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M31 43.5v10c0 1.933-3.134 3.5-7 3.5s-7-1.567-7-3.5v-10M31.002 53.302C32.226 54.319 34.452 55 37 55c3.866 0 7-1.567 7-3.5v-10"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M31 48.3c1.224 1.018 3.45 1.7 6 1.7 3.866 0 7-1.567 7-3.5M29 6h-3.757a2.996 2.996 0 0 1-2.12-.88L20.39 2.39M11.391 10.391l6.61 6.61"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="m39.531 1.469-1.653 1.653A3 3 0 0 1 35.757 4h-3.101a3.995 3.995 0 0 0-2.828 1.172l-4 4a2.83 2.83 0 0 0 4 4l2.465-2.465a2.416 2.416 0 0 1 3.412 0L37 12l6.298 6.294c.449.452.702 1.068.702 1.706 0 .64-.254 1.254-.707 1.707l-8.586 8.586a2.414 2.414 0 0 1-3.414 0L30 29M48.531 10.469 42 17"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <path
      d="M27 31c-.64 0-1.254-.254-1.707-.707l-8.586-8.586a2.414 2.414 0 0 1 0-3.414l2.586-2.586a2.414 2.414 0 0 1 3.414 0l8.586 8.586a2.414 2.414 0 0 1 0 3.414l-2.586 2.586A2.414 2.414 0 0 1 27 31ZM51.602 19.398l-2.188 2.188M55.602 15.398l-2.204 2.204M59 31h-8M51.602 42.602l-2.188-2.188M55.602 46.602l-2.204-2.204M8.398 19.398l2.188 2.188M4.398 15.398l2.204 2.204M1 31h8M8.398 42.602l2.188-2.188M4.398 46.602l2.204-2.204"
      stroke={color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </svg>
)

export default SalesIcon;

