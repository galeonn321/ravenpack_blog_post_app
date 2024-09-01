import { AxiosError } from 'axios';
import { postsApi } from '../api/postsApi';
import { Post } from '../domain/entities/post';
import { PostWithUser } from '../domain/entities/postWithUser';
import { getUserById } from './get-Users';
import { LOG } from '../config/logger';
import { PostMapper } from '../infrastructure/mappers/post.mapper';
import { UserWithComments } from '../domain/entities/UserWithComments';
import { CommentMapper } from '../infrastructure/mappers/Comment.mapper';

export const getCommentsByUser = async (userId: number): Promise<UserWithComments[]> => {
  try {
    const url = `posts/${userId}/comments`;
    const { data } = await postsApi.get<UserWithComments[]>(url);

    LOG.debug(data, 'data');
    const postsWithComment = data.map((comment) => CommentMapper.commentApiToEntity(comment));

    return postsWithComment;
  } catch (error) {
    if (error instanceof AxiosError) {
      LOG.error('Axios error while fetching posts:', error.message);
    } else {
      LOG.error('Unknown error while fetching posts:', error);
    }
    throw new Error('Error getting posts');
  }
};
