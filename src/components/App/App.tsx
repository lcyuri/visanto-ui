import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Operations from '../Operations/Operations';
import Login from '../Login/Login';
import Wallet from '../Wallet/Wallet';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import Signup from '../Signup/Signup';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const handleLoginSuccess = (user: User): void => {
    setUser(user);
    navigate('/wallet');
  }

  return (
    <div className='app'>
      {user && (
        <nav>
          <Link to='/' className='header-title'>
            <FontAwesomeIcon icon={faChartLine} className='header-title-icon' />
            Visanto
          </Link>
          <div className='nav-links'>
            <ul>
              <li>
                <NavLink to='/wallet'>Carteira</NavLink>
              </li>
              <li>
                <NavLink to='/analisys'>Analise de Carteira</NavLink>
              </li>
              <li>
                <NavLink to='/operations'>Operações</NavLink>
              </li>
            </ul>
          </div>
          <div className='header-profile'>
            <FontAwesomeIcon icon={faUser} className='header-profile-image' />
            <span className='header-profile-name'>{user.name}</span>
          </div>
        </nav>
      )}
      <Routes>
        <Route path='/login' element={<Login loginSuccess={handleLoginSuccess} />} />
        <Route path='/signup' element={<Signup />} />
        {user && (
          <>
            <Route path='/wallet' element={<Wallet userID={user.id} />} />
            <Route path='/operations' element={<Operations userID={user.id}/>} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
