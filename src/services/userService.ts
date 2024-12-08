import axios from 'axios';
import { HOSTNAME, USER, USER_AUTH, USER_BY_ID } from '../constants/routes';
import { getUserAdapter, postUserAdapter } from '../adapter/userAdatper';
import { User, UserFormData } from '../models/user';

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

export const postUser = async (user: UserFormData): Promise<User> => {
  try {
    let url = HOSTNAME + USER;
    const body = postUserAdapter(user);
    const response = await axios.post(url, body);
    return getUserAdapter(response.data.data[0]);
  } catch (error) {
    console.error('getUserByID - ', error);
    throw error;
  }
}