import { LOG } from '../../config/logger';
import { UserWithComments } from '../../domain/entities/UserWithComments';

export class CommentMapper {
  static commentApiToEntity(comment: UserWithComments): UserWithComments {
    const cleanedBody = comment.body.replace(/\n/g, ' ');

    return {
      postId: comment.id,
      id: comment.id,
      body: cleanedBody,
      name: comment.name,
      email: comment.email,
    };
  }
}
