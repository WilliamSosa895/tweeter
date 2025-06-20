// File: src/app/feed/tweet-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tweet } from '../models/tweets/Tweet';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.css']
})
export class TweetCardComponent {
  @Input() tweet!: Tweet;
  @Output() react   = new EventEmitter<number>();
  @Output() repost  = new EventEmitter<number>();
  @Output() comment = new EventEmitter<number>();

  onLike()   { this.react.emit(this.tweet.id); }
  onRepost() { this.repost.emit(this.tweet.id); }
  onComment(){ this.comment.emit(this.tweet.id); }
}
