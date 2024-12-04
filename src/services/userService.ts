import axios from 'axios';
import { HOSTNAME, USER_AUTH, USER_BY_ID } from '../constants/routes';
import { getUserAdapter } from '../adapter/userAdatper';
import { User } from '../models/user';

export const getUserAuth = async (username: string, password: string): Promise<string> => {
  try {
    let url = HOSTNAME + USER_AUTH;
    const body = { 'users_email': username, 'users_password': password };
    const response = await axios.post(url, body);
    return response.data.id;
  } catch (error) {
    console.error('getUserAuth - ', error);
    throw error;
  }
}

export const getUserByID = async (userID: string): Promise<User> => {
  try {
    let url = HOSTNAME + USER_BY_ID;
    url = url.replace(':user_id', userID)
    const response = await axios.get(url);
    return getUserAdapter(response.data.data[0]);
  } catch (error) {
    console.error('getUserByID - ', error);
    throw error;
  }
}