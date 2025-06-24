// src/app/models/tweets/Tweet.ts
export interface Tweet {
  id: number;
  content: string;
  imageUrl?: string;  
  commentCount: number;
  repostCount: number;
  reactionCount: number;
  createdAt: string;
  // Ahora es sólo el username
  postedBy: string;
}
