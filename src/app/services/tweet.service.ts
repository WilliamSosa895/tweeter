import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../models/tweets/Tweet';

@Injectable({ providedIn: 'root' })
export class TweetService {
  // tu base URL hard-codeada
  private base = 'https://red-social-spring-latest.onrender.com/api/posts';

  constructor(private http: HttpClient) {}

  /** Paginado sencillo sin filtros adicionales */
  page(page = 0, size = 10): Observable<{ content: Tweet[] }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ content: Tweet[] }>(this.base, { params });
  }

  /** Crea un nuevo post, opcionalmente con imagen */
  create(content: string, file?: File): Observable<Tweet> {
    if (file) {
      const meta = { content };
      const fd = new FormData();
      // el back espera un campo "tweet" con JSON
      fd.append(
        'tweet',
        new Blob([JSON.stringify(meta)], { type: 'application/json' })
      );
      fd.append('image', file);
      return this.http.post<Tweet>(this.base, fd);
    } else {
      // sin imagen basta enviar { tweet: { content } }
      return this.http.post<Tweet>(this.base, { tweet: { content } });
    }
  }

  getById(id: number): Observable<Tweet> {
    return this.http.get<Tweet>(`${this.base}/${id}`);
  }

  getComments(id: number): Observable<{ content: any[] }> {
    return this.http.get<{ content: any[] }>(
      `${this.base}/${id}/comments`
    );
  }

  addComment(id: number, text: string): Observable<any> {
    return this.http.post<any>(
      `${this.base}/${id}/comments`,
      { text }
    );
  }

  addReaction(
    postId: number,
    reactionId: number
  ): Observable<{ [type: string]: number }> {
    return this.http.post<{ [type: string]: number }>(
      `${this.base}/${postId}/reactions`,
      { reactionId }
    );
  }

  getReactionCounts(
    postId: number
  ): Observable<{ [type: string]: number }> {
    return this.http.get<{ [type: string]: number }>(
      `${this.base}/${postId}/reactions/counts`
    );
  }

  repost(id: number): Observable<any> {
    return this.http.post(`${this.base}/${id}/reposts`, {});
  }

  profileTweets(
    username: string,
    page = 0,
    size = 10
  ): Observable<{ content: Tweet[] }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ content: Tweet[] }>(
      `https://red-social-spring-latest.onrender.com/api/users/${username}/tweets`,
      { params }
    );
  }
}
