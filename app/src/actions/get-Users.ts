import { postsApi } from '../api/postsApi';
import { LOG } from '../config/logger';
import { User } from '../domain/entities/postWithUser';

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
