import { LOG } from '../../config/logger';
import { UserWithComments } from '../../domain/entities/UserWithComments';
import { AvatarUserById } from '../../lib/AvatarUserById';

export class CommentMapper {
  static CommentApiToEntity(comment: UserWithComments, avatar: string): PostWithUser {
    const user = users.find((user) => user.id === post.userId);

    const cleanedBody = post.body.replace(/\n/g, ' ');

    return {
      postId: post.id,
      title: post.title,
      body: cleanedBody,
      user: {
        id: user?.id || 0,
        name: user?.name || '',
        username: user?.username || '',
        avatar: AvatarUserById[user?.id || 0],
      },
    };
  }
}
