import axios from 'axios';
import { HOSTNAME, WALLET_BY_ID, WALLET_BY_CLIENT_ID, WALLET } from '../constants/routes';
import { getWalletByIdAdapter, getUserWalletsAdapter, postWalletAdapter } from '../utils/walletUtils';
import { Wallet, WalletFormData, UserWallet } from '../models/wallet';

export const getUserWallets = async (userID: number): Promise<UserWallet[]> => {
  try {
    let url = HOSTNAME + WALLET_BY_CLIENT_ID ;
    url = url.replace(':users_id', userID.toString());
    const response = await axios.get(url);
    return getUserWalletsAdapter(response.data.data);
  } catch (error) {
    console.error('getUserWallets - ', error);
    throw error;
  }
}

export const getWalletById = async (walletID: number): Promise<Wallet[]> => {
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

export const addWallet = async (newWallet: WalletFormData): Promise<any> => {
  try {
    let url = HOSTNAME + WALLET;
    const body = postWalletAdapter(newWallet);
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error('addWallet - ', error);
    throw error;
  }
}