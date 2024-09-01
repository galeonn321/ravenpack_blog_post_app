import { LOG } from '../../config/logger';
import { UserWithComments } from '../../domain/entities/UserWithComments';
import { AvatarUserById } from '../../lib/AvatarUserById';

export class CommentMapper {
  static commentApiToEntity(comment: UserWithComments): UserWithComments {
    const cleanedBody = comment.body.replace(/\n/g, ' ');

    LOG.info(comment, 'comment');

    return {
      postId: comment.id,
      id: comment.id,
      body: cleanedBody,
      name: comment.name,
      email: comment.email,
    };
  }
}
