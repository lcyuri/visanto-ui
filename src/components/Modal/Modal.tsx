import React from 'react';
import './Modal.css';
import { ModalProps } from '../../models/component';

const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <header className='modal-header'>
          <h2>{title}</h2>
          <hr />
          <button className='modal-close-button' onClick={onClose}>
            &times;
          </button>
        </header>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;