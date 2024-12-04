import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import ReactSelect, { ActionMeta, SingleValue } from 'react-select';
import { SelectOption } from '../../models/component';
import Select from '../Select/Select';
import ReactInputMask from 'react-input-mask';

const Signup: React.FC = ({ }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDay, setSelectedDay] = useState<SelectOption | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<SelectOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(null);

  const [document, setDocument] = useState<string>('');  // Set document as string
  const [job, setJob] = useState('');
  const [selectedEducation, setSelectedEducation] = useState<SelectOption | null>(null);

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

  const handleSubmit = () => {
    console.log('---> handleSubmit: ', handleSubmit);
  };

  return (
    <div className='signup'>
      <div className='signup-container'>
        <div>
          <Input
            type='text'
            label='Nome'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <Input
            type='email'
            label='Email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <Input
            type='password'
            label='Senha'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <hr />
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
        <div>
          <ReactInputMask
            mask="999.999.999-99"
            value={document}
            onChange={e => setDocument(e.target.value)}
            id="cpf"
          >
            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
              <Input {...inputProps} label='CPF' />
            )}
          </ReactInputMask>
        </div>
        <hr />
        <div>
          <div>
            <Input
              type='text'  // Corrected type
              label='Profissão'
              value={job}
              onChange={event => setJob(event.target.value)}
            />
          </div>
          <div>
            <Select
              options={setEducationOptions()}
              value={selectedEducation}
              placeholder='Escolaridade'
              onChange={handleEducationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
