import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  username: string;
  userRole: string;
  faRegistered = faRegistered;
  faCalendar = faCalendar;
  isRegistered: boolean;
  isError: boolean;
  //commentForm: FormGroup;
  //commentPayload: CommentPayload;
  //comments: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
  private router: Router, private authService: AuthService, private localStorage: LocalStorageService) {
      //console.log("here");
      this.post = {
      postId: 0,
      postName: '',
      description: '',
      registerCount: 0,
      user: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      category: ''
      };
      this.userRole = '';
      this.postId = this.activateRoute.snapshot.params.id;
      //console.log(this.post.postName);
      this.postService.getPost(this.postId).subscribe(data => {
        this.post = data;
        this.isError = false;
        //console.log(data);
      }, error => {
        this.isError = true;
        this.router.navigateByUrl('**');
        throwError(error);
      });
      this.userRole = this.authService.getRole();
      //.subscribe((data) => {this.userRole = data});
      console.log(this.userRole);
      this.username = this.localStorage.retrieve('username');
      this.postService.isRegistered(this.username, this.postId).subscribe(data =>
        {this.isRegistered = data});
      console.log("status "+ this.isRegistered);
    }

  ngOnInit(): void {
    //this.getPostById();
    //this.getRole();
    
  }

  /*getRole(): Observable<string>{
    this.authService.role.subscribe((data) => {this.userRole = data});
  }*/

  updatePost(id: number): void {
    this.router.navigateByUrl('/update-post/' + id);
  }

  deletePost(id: number): any {
    this.postService.deletePost(this.postId).subscribe(() => console.log("Deletedd"));
    this.router.navigateByUrl('');
  }

  register(id: number): void {
    this.postId = id;
    this.postService.register(this.postId).subscribe(() => {
      this.registerDetails();
    }, error => {
      throwError(error);
    });
    this.postService.isRegistered(this.username, this.postId).subscribe(data =>
      {this.isRegistered = data});
    console.log("status "+ this.isRegistered);
  }

  private registerDetails() {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  getRegistrations(id: number): void {
    this.router.navigateByUrl('/registrations/' + id);
  }

}
