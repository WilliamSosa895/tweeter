import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../models/tweets/Tweet';

@Injectable({ providedIn: 'root' })
export class TweetService {
  private base = 'https://red-social-spring-latest.onrender.com/api/posts';

  constructor(private http: HttpClient) {}

  page(page = 0, size = 10, legendId?: number): Observable<{ content: Tweet[] }> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (legendId != null) params = params.set('playerId', legendId.toString());
    return this.http.get<{ content: Tweet[] }>(this.base, { params });
  }

  create(content: string, playerId?: number, file?: File): Observable<Tweet> {
    if (file) {
      const meta = { content, playerId };
      const fd = new FormData();
      const tweetBlob = new Blob([JSON.stringify(meta)], { type: 'application/json' });
      fd.append('tweet', tweetBlob);
      fd.append('image', file);
      return this.http.post<Tweet>(this.base, fd);
    } else {
      const body: any = { tweet: { content } };
      if (playerId != null) { body.tweet.playerId = playerId; }
      return this.http.post<Tweet>(this.base, body);
    }
  }

  getById(id: number): Observable<Tweet> {
    return this.http.get<Tweet>(`${this.base}/${id}`);
  }

  // ────────────── COMENTARIOS ──────────────
  getComments(id: number): Observable<{ content: any[] }> {
    return this.http.get<{ content: any[] }>(`${this.base}/${id}/comments`);
  }

  addComment(id: number, text: string): Observable<any> {
    return this.http.post<any>(`${this.base}/${id}/comments`, { text });
  }

  // ────────────── REACCIONES ──────────────
  /** Publica una reacción y devuelve el mapa de conteos actualizado */
  addReaction(postId: number, reactionId: number): Observable<{ [type: string]: number }> {
    return this.http.post<{ [type: string]: number }>(
      `${this.base}/${postId}/reactions`,
      { reactionId }
    );
  }

  /** Obtiene el mapa de conteos de reacciones para un post */
  getReactionCounts(postId: number): Observable<{ [type: string]: number }> {
    return this.http.get<{ [type: string]: number }>(
      `${this.base}/${postId}/reactions/counts`
    );
  }

  repost(id: number): Observable<any> {
    return this.http.post(`${this.base}/${id}/reposts`, {});
  }

  profileTweets(username: string, page = 0, size = 10): Observable<{ content: Tweet[] }> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<{ content: Tweet[] }>(
      `https://red-social-spring-latest.onrender.com/api/users/${username}/tweets`,
      { params }
    );
  }
}
