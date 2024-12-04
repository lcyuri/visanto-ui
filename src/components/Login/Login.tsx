import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getUserAuth, getUserByID } from '../../services/userService';
import { LoginProps } from '../../models/component';

const Login: React.FC<LoginProps> = ({ loginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent): Promise<void> => {
    try {
      event.preventDefault();
      const userID = await getUserAuth(username, password);
      const user = await getUserByID(userID);
      loginSuccess(user);
    } catch (error) {
      console.error('handleLogin -', error);
    }
  };

  const isFormValid = username && password;

  return (
    <div  className='login'>
      <div className='login-container'>
        <div className='login-header'>
          <FontAwesomeIcon icon={faChartLine} className='login-header-icon' />
          Visanto
        </div>
        <div>
        </div>
        <form onSubmit={handleLogin} className='login-form'>
          <div className='login-input-group'>
            <label htmlFor='username'>Usuário</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='login-input-group'>
            <label htmlFor='password'>Senha</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='login-footer'>
            <div></div>
            <button
              type='submit'
              className={`login-footer-button ${isFormValid ? '' : 'disabled'}`}
            >
              Entrar
            </button>
          </div>
        </form>
        <Link to='/signup' className='signup-link'>Criar novo usuário</Link>
      </div>
    </div>
  );
};

export default Login;
