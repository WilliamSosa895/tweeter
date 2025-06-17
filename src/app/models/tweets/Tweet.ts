// src/app/models/tweets/Tweet.ts
export interface Tweet {
  id: number;
  content: string;
  imageUrl?: string;  // viene algo como "aab307fc6e7b18...preview.png"
  commentCount: number;
  repostCount: number;
  reactionCount: number;
  createdAt: string;
  postedBy: { username: string; avatarUrl?: string };
  player?: { id: number; name: string };
}
