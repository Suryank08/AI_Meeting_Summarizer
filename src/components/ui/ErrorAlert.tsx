import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="mb-6 p-4 text-sm text-red-400 bg-red-900 rounded-lg border border-red-700" role="alert">
    {message}
  </div>
);

export default ErrorAlert;
