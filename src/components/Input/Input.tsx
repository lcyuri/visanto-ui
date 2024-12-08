import React, { ReactNode, useState } from 'react';
import './Input.css';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  status?: 'error';
  inlineStatus?: 'error';
  inlineMessage?: string;
  icon?: IconProp
}

const Input: React.FC<InputProps> = ({
  value = '',
  type = 'text',
  onChange,
  label,
  status,
  inlineMessage,
  icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClass = `visanto-input ${isFocused || value ? 'focused' : ''} ${status}`;

  return (
    <>
      <div className={inputClass}>
        <label className='visanto-input-label'>
          {icon && <FontAwesomeIcon icon={icon} className='visanto-input-icon' />}
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
      {inlineMessage && (
        <div className={`inline-status ${status}`}>
          <FontAwesomeIcon icon={faExclamationCircle} className='inline-status-icon' />
          {inlineMessage}
        </div>
      )}
    </>

  );
};

export default Input;