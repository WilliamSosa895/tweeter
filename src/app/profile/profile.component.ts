import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { TweetService }       from '../services/tweet.service';
import { Tweet }              from '../models/tweets/Tweet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  tweets: Tweet[] = [];

  constructor(
    private rt: ActivatedRoute,
    private svc: TweetService
  ) {}

  ngOnInit() {
    this.username = this.rt.snapshot.params['username'];
    this.svc.profileTweets(this.username)
      .subscribe(r => this.tweets = r.content);
  }
}
