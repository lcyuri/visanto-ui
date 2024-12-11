import React, { useEffect, useState, ReactNode } from 'react';
import './Operations.css';
import Table from '../Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { deleteOperation, getOperationsByUserID, postOperation, putOperation } from '../../services/operationsService';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import Alert from '../Alert/Alert';
import { getUserWallets } from '../../services/walletService';
import Button from '../Button/Button';
import { Operation, OperationByUserID, OperationFormData, OperationsProps } from '../../models/operations';
import { OPERATION_HEADERS } from '../../constants/component-constants';
import { getSide } from '../../utils/operationUtils';
import OperationForm from '../OperationForm/OperationForm';
import { UserWallet } from '../../models/wallet';
import { AlerProps, SelectOption } from '../../models/component';
import { handleDataForSelect } from '../../utils/componentUtils';
import Input from '../Input/Input';
import { filterByTerm, isEmptyArray, isEmptyString, removeArrayItem } from '../../utils/genericUtils';
import { API_LOADING_ERROR, EMPTY_DATA_WARNING, ERROR_ADDING_NEW_OPERATION, OPERATION_DELETED_SUCCESSFULLY, OPERATION_DELITION_ERROR, OPERATION_SELECT_WARNING, OPERATION_UPDATE_ERROR } from '../../constants/messageConstants';
import Select from '../Select/Select';
import { ActionMeta } from 'react-select';

const Operations: React.FC<OperationsProps> = ({ userID }) => {
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [operations, setOperations] = useState<OperationByUserID[]>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<AlerProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerSelectOptions, setOwnerSelectOptions] = useState<SelectOption[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<SelectOption | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<OperationByUserID | undefined>(undefined);

  useEffect(() => {
    getOperations();
  }, []);

  const getOperations = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getUserWallets(userID);
      setUserWallets(response);
      setOwnerSelectOptions(handleDataForSelect(response, 'clientName', 'userFK', true));
      setAlert({ message: OPERATION_SELECT_WARNING, status: 'warning' });
    } catch (error) {
      console.error('fetchData -', error);
      setAlert({ message: API_LOADING_ERROR, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRow = (row: any): ReactNode => (
    <>
      <td>{row.stockSymbol}</td>
      <td>R$ {row.price}</td>
      <td>{row.amount}</td>
      <td>R$ - </td>
      <td>{getSide(row.side)}</td>
      <td>{row.defaultRisk}%</td>
      <td>{row.walletName}</td>
      <td>{row.date}</td>
      <td className='action-icons'>
        <FontAwesomeIcon icon={faPenToSquare} className='edit-icon' onClick={() => onEdit(row)} />
        <FontAwesomeIcon icon={faTrash} className='delete-icon' onClick={async () => await onDelete(row)} />
      </td>
    </>
  );

  const onOpenModal = (): void => {
    setSelectedOperation(undefined);
    setIsModalOpen(true);
  };

  const onCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const onEdit = (operation: OperationByUserID): void => {
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };

  const onDelete = async (operation: Operation): Promise<void> => {
    try {
      setIsLoading(true);
      const deletedOperationId = await deleteOperation(operation.id);
      const newOperations = removeArrayItem(operations, 'id', deletedOperationId);
      setOperations(newOperations);
      setTableData(newOperations);
      setAlert({
        message: OPERATION_DELETED_SUCCESSFULLY,
        status: 'success',
        hasClose: true
      });
    } catch (error) {
      console.error('handleDelete - ', error);
      setAlert({ message: OPERATION_DELITION_ERROR, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOperationForm = async (operation: OperationFormData): Promise<void> => {
    if (operation.id) {
      await editOperation(operation);
    } else {
      await addOperation(operation);
    }
  };

  const editOperation = async (operation: OperationFormData): Promise<void> => {
    try {
      await putOperation(operation);
      await getOperations();
    } catch (error) {
      console.error('editOperation - ', error);
      setAlert({ message: OPERATION_UPDATE_ERROR, status: 'error' });
    } finally {
      onCloseModal();
    }
  };

  const addOperation = async (operation: OperationFormData): Promise<void> => {
    try {
      await postOperation(operation);
      onCloseModal();
      await getOperations();
    } catch (error) {
      console.error('addOperation - ');
      setAlert({ message: ERROR_ADDING_NEW_OPERATION, status: 'error' });
    }
  };

  const onSearchOperations = (term: string): void => {
    setSearchTerm(term);
    if (isEmptyString(term)) {
      setTableData(operations);
      setAlert(null);
    } else {
      const result = filterByTerm(operations, term);
      if (isEmptyArray(result)) {
        setAlert({ message: EMPTY_DATA_WARNING, status: 'warning' });
      } else {
        setAlert(null);
      }
      setTableData(result);
    }
  };

  const onOwnerSelectChange = async (newValue: unknown, _actionMeta: ActionMeta<unknown>): Promise<void> => {
    try {
      setIsLoading(true);
      const option = newValue as SelectOption;
      setSelectedOwner(option);
      const response = await getOperationsByUserID(option.value.toString());
      setOperations(response);
      setTableData(response);
      setAlert(null);
    } catch (error) {
      console.error('onOwnerSelectChange - ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='operations'>
      <div className='operations-box'>
        <div className='operations-actions'>
          <span className='operations-search'>
            <Input
              type='text'
              label='Pesquisar'
              onChange={event => onSearchOperations(event.target.value)}
              value={searchTerm}
              icon={faSearch}
            />
          </span>
          <span className='operations-select'>
            <Select
              placeholder='Proprietário'
              options={ownerSelectOptions}
              value={selectedOwner}
              onChange={onOwnerSelectChange}
              isSearchable={false}
            />
          </span>
          <span className='operations-button'>
            <Button label='Adicionar' onClick={onOpenModal} />
          </span>
          {isModalOpen &&
            <Modal title='Nova Ordem' onClose={onCloseModal}>
              <OperationForm
                operation={selectedOperation}
                onwerSelectOptions={ownerSelectOptions}
                walletSelectOptions={handleDataForSelect(userWallets, 'name', 'id')}
                onSubmit={onSubmitOperationForm}
              />
            </Modal>
          }
          {isLoading && <FontAwesomeIcon icon={faSpinner} className='loading-spinner' spin />}
        </div>
        {alert && (
          <div className='operations-alert'>
            <Alert
              status={alert.status}
              message={alert.message}
              hasClose={alert?.hasClose}
              close={() => setAlert(null)}
            />
          </div>
        )}
        <div className='operations-table'>
          <Table
            data={tableData}
            headers={OPERATION_HEADERS}
            renderRow={renderRow}
            height={alert ? '536px' : '590px'}
          />
        </div>
      </div>
    </div>
  );
};

export default Operations;