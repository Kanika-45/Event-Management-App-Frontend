/*import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: Array<PostModel> = [];
  faRegistered = faRegistered;
  userRole: string;

  constructor(private authService: AuthService) {

    this.userRole = this.authService.getRole();
    
  }

  ngOnInit(): void {
  }

}*/

import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import {AuthService} from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: Array<PostModel> = [];
  userRole: string;

  constructor(private postService: PostService, private authService: AuthService) {
    this.userRole = this.authService.getRole();
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

}
