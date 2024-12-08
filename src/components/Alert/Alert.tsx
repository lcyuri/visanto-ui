import React from 'react';
import { AlerProps } from '../../models/component';
import './Alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Alert: React.FC<AlerProps> = ({ status, message, hasClose, close }) => {
  const getIcon = (): React.ReactElement | null => {
    switch (status) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className='alert-icon' />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationCircle} className='alert-icon' />;
      case 'warning':
        return <FontAwesomeIcon icon={faInfoCircle} className='alert-icon' />;
      default:
        return null;
    }
  }

  const handleClick = (): void => {
    if (hasClose && close) {
      close();
    }
  }

  return (
    <div className={`${status}-alert`}>
      {getIcon()}
      <span>{message}</span>
      {hasClose && (
        <span className='alert-close-button' onClick={handleClick}>x</span>
      )}
    </div>
  );
};

export default Alert;
