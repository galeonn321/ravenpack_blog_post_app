import { LOG } from '../../config/logger';
import { Post } from '../../domain/entities/post';
import { PostWithUser, User } from '../../domain/entities/postWithUser';
import { AvatarUserById } from '../../lib/AvatarUserById';

export class PostMapper {
  static postApiToEntity(post: Post, users: User[]): PostWithUser {
    const user = users.find((user) => user.id === post.userId);

    return {
      postId: post.id,
      title: post.title,
      body: post.body,
      user: {
        id: user?.id || 0,
        name: user?.name || '',
        username: user?.username || '',
        avatar: AvatarUserById[user?.id || 0],
      },
    };
  }
}
