import { AxiosError } from 'axios';
import { postsApi } from '../src/api/postsApi';
import { LOG } from '../src/config/logger';
import { Post } from '../src/domain/entities/post';
import { getUserById } from './get-Users';
import { AvatarUserById } from '../src/lib/AvatarUserById';
import { PostWithUser } from '../src/domain/entities/postWithUser';

export const getPosts = async (): Promise<PostWithUser[]> => {
  try {
    const url = `/posts`;
    const users = await getUserById();
    const { data } = await postsApi.get<Post[]>(url);

    const postWithUser: PostWithUser[] = data.map((post) => {
      const user = users.find((user) => user.id === post.userId);

      return {
        postId: post.id,
        title: post.title,
        body: post.body,
        user: user
          ? {
              id: user.id,
              name: user.name,
              username: user.username,
              avatar: AvatarUserById[user.id]?.avatar || 'default-avatar-url',
            }
          : null,
      } as PostWithUser;
    });

    // LOG.info(
    //   postWithUser.map((post) => post.user.avatar),
    //   'postWithUser'
    // );

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
