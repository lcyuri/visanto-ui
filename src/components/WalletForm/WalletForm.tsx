import React, { useState } from 'react';
import './WalletForm.css';
import Button from '../Button/Button';
import { WalletFormProps } from '../../models/component';

const WalletForm: React.FC<WalletFormProps> = ({ submit }) => {
  const [formState, setFormState] = useState<any>(null);

  const updateFormData = (key: keyof any, value: any): void => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    submit(formState);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div>
        <label>Nome da carteira</label>
        <input
          id='walletName'
          name='walletName'
          type='string'
          value={formState.walletName}
          required
          onChange={(event) => updateFormData('walletName', event.target.value)}
        />
      </div>
      <div>
        <Button type='submit' label='Salvar' width={170} height={41} />
      </div>
    </form>
  );
};

export default WalletForm;
