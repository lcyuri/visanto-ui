import React, { useEffect, useState } from 'react';
import './OperationForm.css';
import { OperationByUserID, OperationFormData } from '../../models/operations';
import Button from '../Button/Button';
import { SelectOption } from '../../models/component';
import { setFormDataFromOperation } from '../../utils/operationUtils';
import { ActionMeta } from 'react-select';
import Select from '../Select/Select';
import { getStockList } from '../../services/operationsService';
import { handleDataForSelect } from '../../utils/componentUtils';
import Input from '../Input/Input';

export interface OperationFormProps {
  operation?: OperationByUserID;
  onwerSelectOptions: SelectOption[];
  walletSelectOptions: SelectOption[];
  onSubmit: (operation: OperationFormData) => void;
};

const OperationForm: React.FC<OperationFormProps> = ({ operation, onwerSelectOptions, walletSelectOptions, onSubmit }) => {
  const [formData, setFormData] = useState<OperationFormData>(setFormDataFromOperation(operation));
  const [stockSelectOptions, setStockSelectOptions] = useState<SelectOption[]>([]);
  const [selectedStock, setSelectedStock] = useState<SelectOption | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<SelectOption | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<SelectOption | null>(null);
  const [selectedType, setSelectedType] = useState<SelectOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStockList();
        setStockSelectOptions(handleDataForSelect(response, 'stock', 'stock'))
      } catch (error) {
        console.error('fetchData -', error);
      }
    };

    fetchData();
  }, []);

  const onStockSelectChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SelectOption;
    onChangeFormData('stockSymbol', option.value);
    setSelectedStock(option);
  };

  const onChangeOwner = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SelectOption;
    onChangeFormData('userFK', option.value);
    setSelectedStock(option);
  };

  const onWalletChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SelectOption;
    onChangeFormData('walletId', option.value);
    setSelectedWallet(option);
  };

  const onTypeChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SelectOption;
    onChangeFormData('side', option.value);
    setSelectedType(option);
  };

  const onChangeFormData = (key: keyof OperationFormData, value: string | number): void => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className='operation-form'>
      <div className='operation-form-select'>
        <Select
          options={stockSelectOptions}
          value={selectedStock}
          onChange={onStockSelectChange}
          placeholder='Ativo'
        />
      </div>
      <div className='operation-form-input'>
        <Input
          value={formData.amount}
          type='number'
          onChange={event => onChangeFormData('amount', event.target.value)}
          label='Quantide'
        />
      </div>
      <div className='operation-form-select'>
        <Select
          options={onwerSelectOptions}
          value={selectedOwner}
          onChange={onChangeOwner}
          isSearchable={false}
          placeholder='Propietário'
        />
      </div>
      <div className='operation-form-select'>
        <Select
          options={walletSelectOptions}
          value={selectedWallet}
          onChange={onWalletChange}
          isSearchable={false}
          placeholder='Carteira'
        />
      </div>
      <div className='operation-form-input'>
        <Input
          value={formData.price}
          type='number'
          onChange={event => onChangeFormData('amount', event.target.value)}
          label='Preço'
        />
      </div>
      <div className='operation-form-select'>
        <Select
          options={[
            { label: 'Compra', value: 'buy' },
            { label: 'Venda', value: 'sell' }
          ]}
          value={selectedType}
          onChange={onTypeChange}
          isSearchable={false}
          placeholder='Tipo'
        />
      </div>
      <div className='form-button'>
        <Button label='Salvar' onClick={() => onSubmit(formData)} />
      </div>
    </div>
  );
};

export default OperationForm;
