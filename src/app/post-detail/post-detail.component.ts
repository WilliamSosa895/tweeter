// src/app/post-detail/post-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { TweetService }       from '../services/tweet.service';
import { Tweet }              from '../models/tweets/Tweet';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id!: number;
  tweet!: Tweet;
  comments: any[] = [];
  newComment = '';

  constructor(
    private svc: TweetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadTweet();
    this.loadComments();
  }

  loadTweet() {
    this.svc.getById(this.id)
      .subscribe(t => this.tweet = t);
  }

  loadComments() {
    this.svc.getComments(this.id)
      .subscribe(r => this.comments = r.content);
  }

  addComment() {
    if (!this.newComment.trim()) return;
    this.svc.addComment(this.id, this.newComment)
      .subscribe(() => {
        this.newComment = '';
        this.loadComments();
      });
  }

  react() {
    this.svc.addReaction(this.id, 1)
      .subscribe(() => this.loadTweet());
  }

  repost() {
    this.svc.repost(this.id)
      .subscribe(() => this.loadTweet());
  }
}



/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { TweetService }       from '../services/tweet.service';
import { Tweet }              from '../models/tweets/Tweet';
import { Comment }            from '../models/tweets/Comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  tweet!: Tweet;
  comments: Comment[] = [];
  newComment = '';
  private id!: number;

  constructor(
    private rt: ActivatedRoute,
    private svc: TweetService
  ) {}

  ngOnInit() {
    this.id = +this.rt.snapshot.params['id'];
    this.loadTweet();
    this.loadComments();
  }

  loadTweet() {
    this.svc.getById(this.id).subscribe(t => this.tweet = t);
  }

  loadComments() {
    this.svc.getComments(this.id).subscribe(r => this.comments = r.content);
  }

  reactTweet(id: number) {
    this.svc.react(id, 1).subscribe(() => this.loadTweet());
  }

  repostTweet(id: number) {
    this.svc.repost(id).subscribe(() => this.loadTweet());
  }

  addComment() {
    if (!this.newComment.trim()) return;
    this.svc.addComment(this.id, this.newComment)
      .subscribe(c => {
        this.comments.push(c);
        this.newComment = '';
        this.loadTweet();
      });
  }
}
*/