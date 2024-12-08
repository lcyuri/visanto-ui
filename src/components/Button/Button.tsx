
import React from 'react';
import './Button.css';
import { ButtonProps } from '../../models/component';

const Button: React.FC<ButtonProps> = ({ label, width, height, click, disabled, type }) => {
  const handleClick = (): void => {
    if (click) {
      click()
    }
  }

  return (
    <button
      className={`button ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      type={type}
      style={{ 
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {label}
    </button>
  );
}

export default Button;