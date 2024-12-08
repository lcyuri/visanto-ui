import React, { useEffect, useState } from 'react';
import './Operations.css';
import Table from '../Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { deleteOperation, getOperationByWalletID, getStockList, postOperation, putOperation } from '../../services/operationsService';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import Search from '../Search/Search';
import Alert from '../Alert/Alert';
import { getUserWallets } from '../../services/walletService';
import Button from '../Button/Button';
import { Operation, OperationFormData } from '../../models/operations';
import { OPERATION_HEADERS } from '../../constants/component-constants';
import { handleOperationForFormData, handleStocksForSelect } from '../../utils/operationUtils';
import OperationForm from '../OperationForm/OperationForm';
import { UserWallet } from '../../models/wallet';
import { AlerProps, OperationsProps } from '../../models/component';
import { handleDataForSelect } from '../../utils/componentUtils';

const Operations: React.FC<OperationsProps> = ({ userID }) => {
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<AlerProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OperationFormData | null>(null);
  const [stocks, setStocks] = useState<any>([]);

  useEffect(() => {
    getOperations();
  }, []);

  const getOperations = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const list = await getUserWallets(userID);
      setUserWallets(list);
      const flattenedOperations = (
        await Promise.all(
          list.map((wallet: any) => getOperationByWalletID(wallet.id))
        )
      ).flat().filter(Boolean);
      setOperations(flattenedOperations);
      setTableData(flattenedOperations);
      const stockList = await getStockList();
      setStocks(stockList);
    } catch (error) {
      console.error('fetchData -', error);
      setAlert({ message: 'Erro ao carregar dados.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  const renderRow = (row: any): React.ReactNode => (
    <>
      <td>{row.stock}</td>
      <td>R$ {row.price}</td>
      <td>{row.amount}</td>
      <td>R$ {row.totalPrice}</td>
      <td>{row.side}</td>
      <td>{row.risk}%</td>
      <td>{row.walletName}</td>
      <td>{row.date}</td>
      <td className='action-icons'>
        <FontAwesomeIcon icon={faPenToSquare} className='edit-icon' onClick={() => handleEdit(row)} />
        <FontAwesomeIcon icon={faTrash} className='delete-icon' onClick={async () => await handleDelete(row)} />
      </td>
    </>
  );

  const handleOpenModal = (): void => {
    setFormData(null);
    setIsModalOpen(true);
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  }

  const handleEdit = (operation: Operation): void => {
    setFormData(handleOperationForFormData(operation));
    setIsModalOpen(true);
  }

  const handleDelete = async (operation: Operation): Promise<void> => {
    try {
      setIsLoading(true);
      const deletedOperationId = await deleteOperation(operation.id);
      const newOperations = operations.filter((operation: any) => operation.id.toString() !== deletedOperationId);
      setOperations(newOperations);
      setTableData(newOperations);
      setAlert({
        message: 'Operação deletada com sucesso.',
        status: 'success',
        hasClose: true
      });
    } catch (error) {
      console.error('handleDelete - ', error);
      setAlert({  message: 'Erro ao deletar operação.', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (operation: OperationFormData): Promise<void> => {
    if (operation.id) {
      editOperation(operation);
    } else {
      addOperation(operation);
    }
  }

  const editOperation = async (operation: OperationFormData): Promise<void> => {
    try {
      await putOperation(operation);
      await getOperations();
    } catch (error) {
      console.error('editOperation - ', error);
      setAlert({ message: 'Erro ao atualizar ordem.', status: 'error' });
    } finally {
      handleCloseModal();
    }
  }

  const addOperation = async (operation: OperationFormData): Promise<void> => {
    try {
      await postOperation(operation);
      handleCloseModal();
      await getOperations();
    } catch (error) {
      console.error('addOperation - ');
      setAlert({ message: 'Erro ao adicionar nova ordem.', status: 'error' });
    }
  }

  const handleSearch = (term: string): void => {
    if (term.trim() === '') {
      setTableData(operations);
      setAlert(null);
    } else {
      const result = operations.filter((item: any) =>
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

  return (
    <div className='operations'>
      <div className='operations-box'>
        <div className='operations-actions'>
          <Search search={handleSearch} />
          <span>
            <Button
              label='Adicionar'
              width={110}
              height={39}
              click={handleOpenModal}
            />
            {isModalOpen &&
              <Modal title='Nova Ordem' onClose={handleCloseModal}>
                <OperationForm
                  formData={formData}
                  submit={async (operation: OperationFormData) => await handleSubmit(operation)}
                  stockOptions={handleStocksForSelect(stocks)}
                  walletOptions={handleDataForSelect(userWallets, 'name', 'id')}
                />
              </Modal>
            }
          </span>
          {isLoading && <FontAwesomeIcon icon={faSpinner} className='loading-spinner' spin />}
        </div>
        {alert && (
          <Alert
            status={alert.status}
            message={alert.message}
            hasClose={alert?.hasClose}
            close={() => setAlert(null)}
          />
        )}
        <div className='operations-table'>
          <Table
            data={tableData}
            headers={OPERATION_HEADERS}
            renderRow={renderRow}
            height={alert ? '576px' : '630px'}
          />
        </div>
      </div>
    </div>
  );
};

export default Operations;