export interface PostWithUser {
  postId: number;
  title: string;
  body: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar?: string;
}
