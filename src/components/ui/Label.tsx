import React from 'react';

type LabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, className = '', children }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);
