import { AxiosError } from 'axios';
import { postsApi } from '../src/api/postsApi';
import { LOG } from '../src/config/logger';
import { Post } from '../src/domain/entities/post';

export const getPosts = async (): Promise<Post[]> => {
  try {
    LOG.info();
    const url = `/posts`;
    const { data } = await postsApi.get<Post[]>(url);
    return data;
  } catch (error) {
    LOG.error(error);
    throw new Error('Error getting posts');
  }
};
