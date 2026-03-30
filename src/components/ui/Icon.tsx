import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  children: React.ReactNode; // Doit être un <path>, <circle>, etc.
}

export default function Icon({
  size = 24,
  className = "",
  children,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-colors duration-300 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}