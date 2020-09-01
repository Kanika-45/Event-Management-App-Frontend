import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { PostRegistrationsComponent } from './post/post-registrations/post-registrations.component';
import { AuthGuard } from './auth/auth.guard';
import{ ForbiddenComponent } from './error/forbidden/forbidden.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile/:username', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'view-post/:id', component: ViewPostComponent, canActivate: [AuthGuard] },
  { path: 'update-post/:id', component: UpdatePostComponent, canActivate: [AuthGuard] },
  { path: 'registrations/:id', component: PostRegistrationsComponent, canActivate: [AuthGuard] },
  { path: 'error/403', component: ForbiddenComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
