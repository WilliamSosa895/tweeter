import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Tweet } from '../models/tweets/Tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiBase = 'https://red-social-spring-latest.onrender.com';
  tweets: Tweet[] = [];
  newContent = '';
  selectedFile?: File;

  // ────────────── ESTADO DE REACCIONES ──────────────
  reactionCounts: { [postId: number]: { [type: string]: number } } = {};
  reactionTotal: { [postId: number]: number } = {};
  myReaction: { [postId: number]: number } = {};

  // ────────────── ESTADO DE COMENTARIOS ──────────────
  showPicker: { [key: number]: boolean } = {};
  showComments: { [key: number]: boolean } = {};
  comments: { [key: number]: any[] } = {};
  commentCount: { [key: number]: number } = {};
  newComment: { [key: number]: string } = {};

  constructor(private svc: TweetService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.page().subscribe(r => {
      this.tweets = r.content;
      this.tweets.forEach(tw => {
        this.loadReactions(tw.id);
        this.loadComments(tw.id);
      });
    });
  }

  onFile(ev: Event) {
    const el = ev.target as HTMLInputElement;
    if (el.files && el.files.length) {
      this.selectedFile = el.files[0];
    }
  }

  publish() {
    this.svc.create(this.newContent, undefined, this.selectedFile)
      .subscribe(() => {
        this.newContent = '';
        this.selectedFile = undefined;
        this.load();
      });
  }

  // ────────────── REACCIONES ──────────────

  togglePicker(id: number) {
    this.showPicker[id] = !this.showPicker[id];
  }

  loadReactions(postId: number) {
    this.svc.getReactionCounts(postId)
      .subscribe(counts => {
        this.reactionCounts[postId] = counts;
        // calcular total
        this.reactionTotal[postId] = Object.keys(counts)
          .reduce((sum, key) => sum + (counts[key] || 0), 0);
      });
  }

  onReact(postId: number, reactionId: number) {
    this.svc.addReaction(postId, reactionId)
      .subscribe(counts => {
        this.reactionCounts[postId] = counts;
        this.myReaction[postId] = reactionId;
        // recalcular total
        this.reactionTotal[postId] = Object.keys(counts)
          .reduce((sum, key) => sum + (counts[key] || 0), 0);
      });
  }

  // ────────────── COMENTARIOS ──────────────

  toggleComments(id: number) {
    this.showComments[id] = !this.showComments[id];
    if (this.showComments[id]) {
      this.loadComments(id);
    }
  }

  loadComments(postId: number) {
    this.svc.getComments(postId)
      .subscribe(r => {
        this.comments[postId] = r.content;
        this.commentCount[postId] = r.content.length;
      });
  }

  addComment(postId: number) {
    const text = this.newComment[postId];
    if (!text) return;
    this.svc.addComment(postId, text)
      .subscribe(() => {
        this.newComment[postId] = '';
        this.loadComments(postId);
      });
  }
}




/*
import { Component, OnInit } from '@angular/core';
import { TweetService }      from '../services/tweet.service';
import { Tweet }             from '../models/tweets/Tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = [];
  newContent = '';
  file?: File;

  constructor(private tweetSvc: TweetService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.tweetSvc.page().subscribe(r => this.tweets = r.content);
  }

  onFile(evt: any) {
    this.file = evt.target.files[0];
  }

  publish() {
    this.tweetSvc.create(this.newContent, undefined, this.file)
      .subscribe({
        next: () => {
          this.newContent = '';
          this.file = undefined;
          this.load();
        },
        error: err => {
          console.error('Error publicando:', err);
        }
      });
  }

  react(id: number) {
    this.tweetSvc.react(id, 1).subscribe(() => this.load());
  }

  repost(id: number) {
    this.tweetSvc.repost(id).subscribe(() => this.load());
  }
}*/