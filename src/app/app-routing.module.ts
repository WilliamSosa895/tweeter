// File: src/app/app-routing.module.ts
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent    } from './landing-page/landing-page.component';
import { LoginComponent          } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent  } from './reset-password/reset-password.component';
import { NewUserComponent        } from './new-user/new-user.component';
import { HomeComponent           } from './home/home.component';
import { PostDetailComponent     } from './post-detail/post-detail.component';
import { ProfileComponent        } from './profile/profile.component';
import { AuthGuard               } from './guards/auth.guard';

const routes: Routes = [
  { path: '',               component: LandingPageComponent },
  { path: 'login',          component: LoginComponent },
  { path: 'new-user',       component: NewUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:email/:token', component: ResetPasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
