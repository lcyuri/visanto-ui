import React from 'react';
import { AlerProps } from '../../models/component';
import './Alert.css';

const Alert: React.FC<AlerProps> = ({ status, message, hasClose, close }) => {
  const handleClick = (): void => {
    if (hasClose && close) {
      close();
    }
  }

  return (
    <div className={`${status}-alert`}>
      <span>{message}</span>
      {hasClose && (
        <span className='altert-close-buton' onClick={handleClick}>x</span>
      )}
    </div>
  );
};

export default Alert;