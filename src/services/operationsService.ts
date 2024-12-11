import axios from 'axios';
import { HOSTNAME, OPERATION, OPERATION_BY_USER_ID, OPERATION_BY_WALLET_ID, STOCK_LIST } from '../constants/routes';
import { getOperationsAdapter, getOperationsByUserIDAdapter, getStockListAdapter, postOperationAdapter, putOperationAdapter } from '../utils/operationUtils';
import { Operation, OperationByUserID, OperationFormData } from '../models/operations';

export const getOperationByWalletID = async (walletID: string): Promise<Operation[] | []> => {
  try {
    let url = HOSTNAME + OPERATION_BY_WALLET_ID;
    url = url.replace(':portfolio_id', walletID);
    const response = await axios.get(url);
    return response.data.data ? getOperationsAdapter(response.data.data) : [];
  } catch (error) { 
    console.error('getOperations - ', error);
    throw error;
  }
};

export const postOperation = async (operation: any): Promise<void> => {
  try {
    const url = HOSTNAME + OPERATION;
    const body = postOperationAdapter(operation);
    await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('postOperation - ', error);
    throw error;
  }
};

export const putOperation = async (operation: OperationFormData): Promise<void> => {
  try {
    const url = HOSTNAME + OPERATION;
    const body = putOperationAdapter(operation);
    const response = await axios.put(url, body);
    if (response.data.id.toString() !== operation.id?.toString()) {
      throw Error('Error updating order');
    }
  } catch (error) {
    console.error('putOperation - ', error);
    throw error;
  }
};

export const deleteOperation = async (operationId: number): Promise<string> => {
  try {
    const url = HOSTNAME + OPERATION + '/' + operationId.toString();
    const response = await axios.delete(url);
    return response.data.id
  } catch (error) {
    console.error('deleteOperation - ', error);
    throw error;
  }
};

export const getStockList = async (): Promise<string[]> => {
  try {
    let url = HOSTNAME + STOCK_LIST ;
    const response = await axios.get(url);
    return getStockListAdapter(response.data.data);
  } catch (error) {
    console.error('getWalletById - ', error);
    throw error;
  }
}

export const getOperationsByUserID = async (userID: string): Promise<OperationByUserID[]> => {
  try {
    let url = HOSTNAME + OPERATION_BY_USER_ID ;
    url = url.replace(':user_id', userID);
    const response = await axios.get(url);
    return getOperationsByUserIDAdapter(response.data.data);
  } catch (error) {
    console.error('getWalletById - ', error);
    throw error;
  }
};
