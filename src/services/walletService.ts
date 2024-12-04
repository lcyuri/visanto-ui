import axios from 'axios';
import { HOSTNAME, WALLET_BY_ID, WALLET_BY_CLIENT_ID } from '../constants/routes';
import { getWalletByIdAdapter, getWalletByUserIDAdapter } from '../adapter/walletAdapter';
import { WalletFormData } from '../models/wallet';

export const getWalletByUserID = async (userID: number): Promise<any> => {
  try {
    let url = HOSTNAME + WALLET_BY_CLIENT_ID ;
    url = url.replace(':users_id', userID.toString());
    const response = await axios.get(url);
    return getWalletByUserIDAdapter(response.data.data);
  } catch (error) {
    console.error('getWalletByUserID - ', error);
    throw error;
  }
}

export const getWalletById = async (walletID: number): Promise<any> => {
  try {
    let url = HOSTNAME + WALLET_BY_ID;
    url = url.replace(':portfolio_id', walletID.toString());
    const response = await axios.get(url);
    return getWalletByIdAdapter(response.data.data);
  } catch (error) {
    console.error('getWalletById - ', error);
    throw error;
  }
}

export const addWallet = async (wallet: WalletFormData): Promise<any> => {
  try {
    let url = HOSTNAME + WALLET_BY_ID;
    const response = await axios.get(url);
    return getWalletByIdAdapter(response.data.data);
  } catch (error) {
    console.error('addWallet - ', error);
    throw error;
  }
}