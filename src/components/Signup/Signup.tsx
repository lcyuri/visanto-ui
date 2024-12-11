import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import { ActionMeta } from 'react-select';
import { AlerProps, SelectOption } from '../../models/component';
import Select from '../Select/Select';
import ReactInputMask from 'react-input-mask';
import Button from '../Button/Button';
import { postUser } from '../../services/userService';
import Alert from '../Alert/Alert';

const Signup: React.FC = ({ }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState('');
  const [selectedDay, setSelectedDay] = useState<SelectOption | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<SelectOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(null);
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [jobTitle, setJobTitle] = useState('');
  const [selectedEducation, setSelectedEducation] = useState<SelectOption | null>(null);
  const [alert, setAlert] = useState<AlerProps | null>(null);

  const setDayOptions = (): SelectOption[] => {
    return Array.from({ length: 31 }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString()
    }));
  };

  const handleSelectedDay = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    setSelectedDay(newValue as SelectOption);
  };

  const setMonthOptions = (): SelectOption[] => {
    return Array.from({ length: 12 }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString()
    }));
  };

  const handleSelectedMonth = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    setSelectedMonth(newValue as SelectOption);
  };

  const setYearOptions = (): SelectOption[] => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
      value: currentYear - index,
      label: (currentYear - index).toString()
    }));
  };

  const handleSelectedYear = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    setSelectedYear(newValue as SelectOption);
  }

  const setEducationOptions = (): SelectOption[] => {
    return [
      { value: 'ensino_fundamental', label: 'Ensino Fundamental' },
      { value: 'ensino_medio', label: 'Ensino Médio' },
      { value: 'ensino_superior', label: 'Ensino Superior' },
      { value: 'pos_graduacao', label: 'Pós-graduação' },
      { value: 'mestrado', label: 'Mestrado' },
      { value: 'doutorado', label: 'Doutorado' }
    ];
  };

  const handleEducationChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    setSelectedEducation(newValue as SelectOption);
  };

  const handleSubmit = async (): Promise<void> => {
    if (password !== confirmedPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    try {
      await postUser({
        email,
        password,
        name,
        birthday: setBirthday(),
        documentNumber,
        jobTitle,
        education: selectedEducation?.value
      });
    } catch (error) {
      console.error('handleSubmit - ', error);
      setAlert({
        message: 'Erro ao cadastrar usuário.',
        status: 'error',
      });
    }
  };

  const setBirthday = (): string => {
    const year = Number(selectedYear!.value);
    const month = Number(selectedMonth!.value) - 1;
    const day = Number(selectedDay!.value);
    const date = new Date(year, month, day);
    return date.toISOString();
  }

  const isFormValid =
    email &&
    password &&
    confirmedPassword &&
    name &&
    selectedDay !== null &&
    selectedMonth !== null &&
    selectedYear !== null &&
    documentNumber &&
    jobTitle &&
    selectedEducation !== null;

  return (
    <div className='signup'>
      <div className='signup-container'>
        <div className='login-header'>
          <FontAwesomeIcon className='login-header-icon' icon={faChartLine} />
          Visanto
        </div>
        {alert && (<Alert status={alert.status} message={alert.message} hasClose/>)}
        <Input
          type='email'
          label='Email'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          type='password'
          label='Senha'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Input
          type='password'
          label='Comfirmar senha'
          value={confirmedPassword}
          onChange={event => setConfirmedPassword(event.target.value)}
          status={passwordError ? 'error' : undefined}
          inlineMessage={passwordError ? 'As senhas não coincidem. Tente novamente.' : undefined}
        />
        <hr />
        <Input
          type='text'
          label='Nome'
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <ReactInputMask
          mask='999.999.999-99'
          value={documentNumber}
          onChange={e => setDocumentNumber(e.target.value)}
          id='cpf'
        >
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <Input {...inputProps} label='CPF' />
          )}
        </ReactInputMask>
        <div className='signup-birthday-group'>
          <label>Data de nascimento</label>
          <div>
            <span>
              <Select
                options={setDayOptions()}
                value={selectedDay}
                onChange={handleSelectedDay}
                isSearchable={false}
                placeholder='Dia'
              />
            </span>
            <span>
              <Select
                options={setMonthOptions()}
                value={selectedMonth}
                onChange={handleSelectedMonth}
                isSearchable={false}
                placeholder='Mês'
              />
            </span>
            <span>
              <Select
                options={setYearOptions()}
                value={selectedYear}
                onChange={handleSelectedYear}
                isSearchable={false}
                placeholder='Ano'
              />
            </span>
          </div>
        </div>
        <Input
          type='text'
          label='Profissão'
          value={jobTitle}
          onChange={event => setJobTitle(event.target.value)}
        />
        <div className='signup-education'>
          <Select
            options={setEducationOptions()}
            value={selectedEducation}
            placeholder='Escolaridade'
            onChange={handleEducationChange}
          />
        </div>
        <div className='signup-footer'>
          <Button
            label='Cadastrar'
            disabled={!isFormValid}
            onClick={handleSubmit}
          />
          <Link className='signup-link' to='/login'>Já tem uma conta?</Link>
        </div>
      </div>
    </div>
  );

};

export default Signup;
