import React, { useState } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ value = '', type = 'text', onChange, label, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`visanto-input ${isFocused || value ? 'focused' : ''}`}>
      <label className='visanto-input-label'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </div>
  );
};

export default Input;