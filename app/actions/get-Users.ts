import { AxiosError } from 'axios';
import { postsApi } from '../src/api/postsApi';
import { LOG } from '../src/config/logger';
import { User } from '../src/domain/entities/user';

export const getUserById = async (): Promise<User[]> => {
  try {
    const url = `/users`;
    const { data } = await postsApi.get<User[]>(url);
    return data;
  } catch (error) {
    LOG.error(error);
    throw new Error('Error getting posts');
  }
};
