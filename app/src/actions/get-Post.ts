import { AxiosError } from 'axios';
import { postsApi } from '../api/postsApi';
import { Post } from '../domain/entities/post';
import { PostWithUser } from '../domain/entities/postWithUser';
import { AvatarUserById } from '../lib/AvatarUserById';
import { getUserById } from './get-Users';
import { LOG } from '../config/logger';
import { PostMapper } from '../infrastructure/mappers/post.mapper';

export const getPosts = async (): Promise<PostWithUser[]> => {
  try {
    const url = `/posts`;
    const users = await getUserById();
    const { data } = await postsApi.get<Post[]>(url);

    const postWithUser = data.map((post) => PostMapper.postApiToEntity(post, users));

    // LOG.info(postWithUser[0].user);

    return postWithUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      LOG.error('Axios error while fetching posts:', error.message);
    } else {
      LOG.error('Unknown error while fetching posts:', error);
    }
    throw new Error('Error getting posts');
  }
};
