// File: src/app/app.module.ts
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule }         from '@angular/router';

import { AppComponent }         from './app.component';
import { NavbarComponent }      from './shared/navbar/navbar.component';
import { LoginComponent }       from './login/login.component';
import { NewUserComponent }     from './new-user/new-user.component';
import { ForgotPasswordComponent }  from './forgot-password/forgot-password.component';
import { ResetPasswordComponent }   from './reset-password/reset-password.component';
import { HomeComponent }        from './home/home.component';
import { FeedComponent }        from './feed/feed.component';
import { TweetCardComponent }   from './feed/tweet-card.component';
import { ReactionPickerComponent } from './shared/reaction-picker/reaction-picker.component';
import { PostDetailComponent }  from './post-detail/post-detail.component';
import { ProfileComponent }     from './profile/profile.component';

import { AppRoutingModule }     from './app-routing.module';
import { AuthInterceptor }      from './interceptors/auth.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NewUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    FeedComponent,
    TweetCardComponent,
    ReactionPickerComponent,
    PostDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
