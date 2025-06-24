// src/app/feed/feed.component.ts
import { Component, OnInit } from '@angular/core';
import { TweetService }       from '../services/tweet.service';
import { Tweet }              from '../models/tweets/Tweet';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets: Tweet[] = [];
  loading = false;

  constructor(private tweetService: TweetService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.tweetService.page().subscribe({
      next: res => {
        this.tweets = res.content;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onReact(tweetId: number) {
    this.tweetService.addReaction(tweetId, 1)
      .subscribe(() => this.load());
  }
}



/*import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../models/tweets/Tweet';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets: Tweet[] = [];

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.tweetService.page().subscribe(res => this.tweets = res.content);
  }

  onReact(id: number) {
    // aquí ya llamas al método correcto
    this.tweetService.addReaction(id, 1)
      .subscribe(() => this.load());
  }

  onRepost(id: number) {
    this.tweetService.repost(id)
      .subscribe(() => this.load());
  }

  onComment(id: number) {
    // simplemente recargas el feed con comentarios abiertos
    this.load();
  }
}*/
