// File: src/app/models/tweets/Comment.ts

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  // Antes probablemente era: user: string;
  user: { username: string };
  // Si necesitas id del tweet:
  tweetId?: number;
}
