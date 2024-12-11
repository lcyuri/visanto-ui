import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled}) => {
  return (
    <button className='visanto-button' onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
