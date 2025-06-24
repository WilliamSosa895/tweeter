// Archivo: src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { TweetService }      from '../services/tweet.service';
import { Tweet }             from '../models/tweets/Tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = [];
  newContent = '';
  selectedFile?: File;

  // Estado de reacciones y comentarios
  reactionCounts: { [postId: number]: { [type: string]: number } } = {};
  reactionTotal:  { [postId: number]: number } = {};
  myReaction:     { [postId: number]: number } = {};
  showReactions:  { [postId: number]: boolean } = {};
  showPicker:     { [postId: number]: boolean } = {};
  showComments:   { [postId: number]: boolean } = {};
  comments:       { [postId: number]: any[] } = {};
  commentCount:   { [postId: number]: number } = {};
  newComment:     { [postId: number]: string } = {};

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
    if (!this.newContent.trim()) return;
    this.svc.create(this.newContent, this.selectedFile)
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
        this.reactionTotal[postId] = Object.values(counts)
          .reduce((sum, c) => sum + c, 0);
      });
  }

  onReact(postId: number, reactionId: number) {
    this.svc.addReaction(postId, reactionId)
      .subscribe(counts => {
        this.reactionCounts[postId] = counts;
        this.myReaction[postId] = reactionId;
        this.reactionTotal[postId] = Object.values(counts)
          .reduce((sum, c) => sum + c, 0);
      });
  }

  // ────────────── DETALLE DE REACCIONES ──────────────

  toggleReactionsDetail(id: number) {
    this.showReactions[id] = !this.showReactions[id];
  }

  getReactionTypes(postId: number): string[] {
    return Object.keys(this.reactionCounts[postId] || {});
  }

  labelFor(type: string): string {
    switch (type) {
      case '1': return 'Me gusta';
      case '2': return 'Me encanta';
      case '3': return 'Me entristece';
      case '4': return 'Me enfurece';
      case '5': return 'Lo odio';
      default:  return type;
    }
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
    const txt = this.newComment[postId]?.trim();
    if (!txt) return;
    this.svc.addComment(postId, txt)
      .subscribe(() => {
        this.newComment[postId] = '';
        this.loadComments(postId);
      });
  }
}





/*import { Component, OnInit } from '@angular/core';
import { TweetService }      from '../services/tweet.service';
import { Tweet }             from '../models/tweets/Tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = [];
  newContent = '';
  selectedFile?: File;

  // Estado de reacciones y comentarios
  reactionCounts: { [postId: number]: { [type: string]: number } } = {};
  reactionTotal:  { [postId: number]: number } = {};
  myReaction:    { [postId: number]: number } = {};
  showPicker:    { [postId: number]: boolean } = {};
  showComments:  { [postId: number]: boolean } = {};
  comments:      { [postId: number]: any[] } = {};
  commentCount:  { [postId: number]: number } = {};
  newComment:    { [postId: number]: string } = {};

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
    if (!this.newContent.trim()) return;
    this.svc.create(this.newContent, this.selectedFile)
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
        this.reactionTotal[postId] = Object.values(counts)
          .reduce((sum, c) => sum + c, 0);
      });
  }

  onReact(postId: number, reactionId: number) {
    this.svc.addReaction(postId, reactionId)
      .subscribe(counts => {
        this.reactionCounts[postId] = counts;
        this.myReaction[postId] = reactionId;
        this.reactionTotal[postId] = Object.values(counts)
          .reduce((sum, c) => sum + c, 0);
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
    const txt = this.newComment[postId];
    if (!txt?.trim()) return;
    this.svc.addComment(postId, txt)
      .subscribe(() => {
        this.newComment[postId] = '';
        this.loadComments(postId);
      });
  }
}
*/




