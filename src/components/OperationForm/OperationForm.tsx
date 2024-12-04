import React, { useState } from 'react';
import './OperationForm.css';
import { OperationFormData } from '../../models/operations';
import Button from '../Button/Button';
import { OperationFormProps, SelectOption } from '../../models/component';
import { setInitialFormData } from '../../utils/operationUtils';
import { ActionMeta, SelectOptionActionMeta, SingleValue } from 'react-select';
import Select from '../Select/Select';

const OperationForm: React.FC<OperationFormProps> = ({ formData, stockOptions, walletOptions, submit }) => {
  const [formState, setFormState] = useState<OperationFormData>(formData || setInitialFormData());
  const [selectedStock, setSelectedStock] = useState<SelectOption | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<SelectOption | null>(null);

  const handleStockChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SingleValue<SelectOption>;
    updateFormData('stock', option?.value);
    setSelectedStock(option);
  };

  const handleWalletChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SingleValue<SelectOption>
    updateFormData('walletId', option?.value);
    setSelectedWallet(option);
  };

  const updateFormData = (key: keyof OperationFormData, value: any): void => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    submit(formState);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='operation-forn-input-group'>
        <label>Ativo</label>
        <Select
          options={stockOptions}
          value={selectedStock}
          onChange={handleStockChange}
          placeholder='Selecione um ativo'
        />
      </div>
      <div className='operation-forn-input-group'>
        <label>Quantidade</label>
        <input
          id='amount'
          name='amount'
          type='number'
          value={formState.amount}
          required
          onChange={(event) => updateFormData('amount', event.target.value)}
        />
      </div>
      <div className='operation-forn-input-group'>
        <label>Carteira</label>
        <Select
          options={walletOptions}
          value={selectedWallet}
          onChange={handleWalletChange}
          isSearchable={false}
          placeholder='Selecione uma carteira'
        />
      </div>
      <div className='operation-forn-input-group'>
        <label>Preço</label>
        <input
          id='price'
          name='price'
          type='number'
          value={formState.price}
          required
          onChange={(event) => updateFormData('price', event.target.value)}
        />
      </div>
      <div className='radio-group'>
        <label>Tipo</label>
        <div>
          <label>
            <input
              type='radio'
              name='type'
              value='buy'
              checked={formState.side === 'buy'}
              onChange={(event) => updateFormData('side', event.target.value)}
            />
            Compra
          </label>
          <label>
            <input
              type='radio'
              name='type'
              value='sell'
              checked={formState.side === 'sell'}
              onChange={(event) => updateFormData('side', event.target.value)}
            />
            Venda
          </label>
        </div>
      </div>
      <div className='form-button'>
        <Button type='submit' label='Salvar' width={170} height={41} />
      </div>
    </form>
  );
};

export default OperationForm;
