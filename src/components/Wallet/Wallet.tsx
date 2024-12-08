import React, { ReactNode, useEffect, useState } from 'react';
import './Wallet.css';
import Table from '../Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { addWallet, getWalletById, getUserWallets } from '../../services/walletService';
import Alert from '../Alert/Alert';
import { AlerProps, SelectOption, WalletProps, WalletTableRow } from '../../models/component';
import { WALLET_HEADERS } from '../../constants/component-constants';
import { ActionMeta } from 'react-select';
import Select from '../Select/Select';
import Input from '../Input/Input';
import { handleDataForSelect } from '../../utils/componentUtils';
import { filterByField, filterByTerm, isEmptyArray, isEmptyString } from '../../utils/genericUtils';
import { Wallet, UserWallet } from '../../models/wallet';
import { WALLET_ADD_ERROR, WALLET_ADD_SUCCESS, API_LOADING_ERROR, EMPTY_DATA_WARNING, WALLET_SELECT_WARNING } from '../../constants/messageConstants';

const WalletComponent: React.FC<WalletProps> = ({ userID }) => {
  const [wallet, setWallet] = useState<Wallet[]>([]);
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [ownerSelectOptions, setOwnerSelectOptions] = useState<SelectOption[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<SelectOption | null>(null);
  const [walletSelectOptions, setWalletSelectOptions] = useState<SelectOption[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<SelectOption | null>(null);
  const [tableData, setTableData] = useState<any>([]);
  const [alert, setAlert] = useState<AlerProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchWalletName, setSearchWalletName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserWallets(userID);
        setUserWallets(response);
        setOwnerSelectOptions(handleDataForSelect(response, 'clientName', 'userFK', true));
        setAlert({ message: WALLET_SELECT_WARNING, status: 'warning' });
      } catch (error) {
        console.error('fetchData -', error);
        setAlert({ message: API_LOADING_ERROR, status: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const renderRow = (row: WalletTableRow): ReactNode => (
    <>
      <td>{row.stock}</td>
      <td>{row.risk}%</td>
      <td>R$ {row.averagePrice}</td>
      <td>R$ {row.currentPrice}</td>
      <td>{row.amount}</td>
      <td>R$ {row.cost}</td>
      <td>R$ {row.value}</td>
      <td>R$ {row.profitLoss}</td>
      <td>{row.percentProfitLoss}%</td>
      <td className='progress-bar'>
        <progress
          value={row.stockValuePercentage}
          max={100}
          title={`${row.stockValuePercentage}%`}
        />
      </td>
    </>
  );

  const searchWallets = (term: string): void => {
    setSearchTerm(term);
    if (isEmptyString(term)) {
      setTableData(wallet);
      if (!selectedOwner || !selectedWallet) {
        setAlert({ message: WALLET_SELECT_WARNING, status: 'warning' });
      } else {
        setAlert(null);
      }
    } else {
      const result = filterByTerm(wallet, term);
      if (isEmptyArray(result)) {
        setAlert({ message: EMPTY_DATA_WARNING, status: 'warning' });
      } else {
        setAlert(null);
      }
      setTableData(result);
    }
  };

  const onOwnerSelectChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>): void => {
    const option = newValue as SelectOption;
    setSelectedOwner(option);
    const result = filterByField(userWallets, 'userFK', option.value);
    setWalletSelectOptions(handleDataForSelect(result, 'name', 'id'));
  };

  const onWalletSelectChange = async (newValue: unknown, _actionMeta: ActionMeta<unknown>): Promise<void> => {
    try {
      setIsLoading(true);
      const option = newValue as SelectOption;
      setSelectedWallet(option);
      const response = await getWalletById(Number(option.value));
      setWallet(response);
      setTableData(response);
      setAlert(null);
    } catch (error) {
      console.error('onWalletSelectChange -', error);
      setWallet([]);
      setTableData([]);
      setAlert({ message: API_LOADING_ERROR, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const onAddNewWallet = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const newWallet = {
        walletName: searchWalletName,
        userFK: selectedOwner?.value,
        advisorFK: (userID === selectedOwner?.value) ? undefined : userID,
      };
      const response = await addWallet(newWallet);
      setSelectedWallet({ label: searchWalletName, value: response.id });
      setAlert({
        message: WALLET_ADD_SUCCESS,
        status: 'success',
        hasClose: true,
        close: () => setAlert(null)
      });
    } catch (error) {
      console.error('handleAddNewWallet - ', error);
      setAlert({ message: WALLET_ADD_ERROR, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='wallet'>
      <div className='wallet-box'>
        <div className='wallet-actions'>
          <span className='wallet-search'>
            <Input
              type='text'
              label='Pesquisar'
              onChange={event => searchWallets(event.target.value)}
              value={searchTerm}
              icon={faSearch}
            />
          </span>
          <span className='wallet-select'>
            <Select
              placeholder='Proprietário'
              options={ownerSelectOptions}
              value={selectedOwner}
              onChange={onOwnerSelectChange}
              isSearchable={false}
            />
          </span>
          <span className='wallet-select'>
            <Select
              placeholder='Carteira'
              options={walletSelectOptions}
              value={selectedWallet}
              onChange={onWalletSelectChange}
              isSearchable
              onInputChange={event => setSearchWalletName(event)}
              noOptionsMessage={() => (
                <a className='new-wallet-link' onClick={onAddNewWallet}>
                  Adicionar nova carteira
                </a>
              )}
            />
          </span>
          {isLoading && (<FontAwesomeIcon icon={faSpinner} className='loading-spinner' spin />)}
        </div>
        {alert && (
          <Alert
            status={alert.status}
            message={alert.message}
            hasClose={alert?.hasClose}
            close={alert?.close}
          />
        )}
        <div className='wallet-table'>
          <Table
            data={tableData}
            headers={WALLET_HEADERS}
            renderRow={renderRow}
            height={alert ? '536px' : '590px'}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;