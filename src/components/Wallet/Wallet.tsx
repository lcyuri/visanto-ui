import React, { ReactNode, useEffect, useState } from 'react';
import './Wallet.css';
import Table from '../Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { addWallet, getWalletById, getWalletByUserID } from '../../services/walletService';
import Alert from '../Alert/Alert';
import Search from '../Search/Search';
import { AlerProps, SelectOption, WalletProps, WalletTableRow } from '../../models/component';
import { WALLET_HEADERS } from '../../constants/component-constants';
import { ActionMeta, SingleValue } from 'react-select';
import Modal from '../Modal/Modal';
import WalletForm from '../WalletForm/WalletForm';
import { WalletFormData } from '../../models/wallet';
import Select from '../Select/Select';


const Wallet: React.FC<WalletProps> = ({ userID }) => {
  const [wallet, setWallet] = useState<any>([]);
  const [selectData, setSelectData] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [tableData, setTableData] = useState<any>([]);
  const [alert, setAlert] = useState<AlerProps | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: '39px',
      width: '150px',
      border: state.isFocused ? '1px solid #3245d1' : '1px solid #ECECEC',
      borderRadius: '6px',
      '&:hover': {
        border: state.isFocused ? '1px solid #3245d1' : '1px solid #ECECEC',
      },
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const list = await getWalletByUserID(userID);
        const handledList = handleWalletListForSelect(list);
        setSelectData(handledList);
        setSelectedOption(handledList[0]);
        const data = await getWalletById(handledList[0].value);
        setWallet(data);
        setTableData(data);
      } catch (error) {
        console.error('fetchData -', error);
        setAlert({ message: 'Erro ao carregar dados.', status: 'error' });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userID]);

  const handleWalletListForSelect = (wallets: any): any => {
    return wallets.map((wallet: any) => ({
      label: wallet.name,
      value: wallet.id
    }));
  };

  const renderRow = (row: WalletTableRow): ReactNode => {
    return (
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
  }

  const handleSearch = (term: string): void => {
    if (term.trim() === '') {
      setTableData(wallet);
      setAlert(null);
    } else {
      const result = wallet.filter((item: any) =>
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(term.toLowerCase())
        )
      );
      if (result.length === 0) {
        setAlert({ message: 'Nenhum dado disponível.', status: 'warning' });
      } else {
        setAlert(null);
      }
      setTableData(result);
    }
  }

  const handleSelect = async (newValue: unknown, _actionMeta: ActionMeta<unknown>): Promise<void> => {
    try {
      const option = newValue as SingleValue<SelectOption>;
      if (option?.value) {
        setSelectedOption(option);
        setIsLoading(true);
        const data = await getWalletById(Number(option.value));
        setWallet(data);
        setTableData(data);
        setAlert(null);
      }
    } catch (error) {
      console.error('fetchData -', error);
      setWallet([]);
      setTableData([]);
      setAlert({ message: 'Erro ao carregar dados.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  }

  const handleSubmit = async (newWallet: WalletFormData): Promise<void> => {
    try {
      setIsLoading(true);
      await addWallet(newWallet);
    } catch (error) {
      console.error('handleSubmit - ', error);
      setAlert({ message: 'Erro ao adicionar carteira.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='wallet'>
      <div className='wallet-box'>
        <div className='wallet-actions'>
          <Search search={handleSearch} />
          <Select
            options={selectData}
            value={selectedOption}
            onChange={handleSelect}
            styles={customStyles}
            components={{ IndicatorSeparator: null }}
            noOptionsMessage={() => (
              <a className='new-wallet-link' onClick={handleOpenModal}>
                Adicionar nova carteira
              </a>
            )}
          />
          {isModalOpen && (
            <Modal title='Nova Carteira' onClose={handleCloseModal}>
              <WalletForm submit={handleSubmit}/>
            </Modal>
          )}
          {isLoading && <FontAwesomeIcon icon={faSpinner} className='loading-spinner' spin />}
        </div>
        {alert && (<Alert status={alert.status} message={alert.message} />)}
        <div className='wallet-table'>
          <Table
            data={tableData}
            headers={WALLET_HEADERS}
            renderRow={renderRow}
            height={alert ? '576px' : '630px'}
          />
        </div>
      </div>
    </div>
  );
};

export default Wallet;