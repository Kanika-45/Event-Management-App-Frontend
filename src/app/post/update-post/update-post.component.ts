import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { UpdatePostPayload } from './update-post.payload';
import { PostModel } from 'src/app/shared/post-model';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
//import * as _ from "angular";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  postId: number;
  post: PostModel;
  updatePostForm: FormGroup;
  postPayload: UpdatePostPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
  private router: Router, private localStorage: LocalStorageService) {

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

    this.postPayload = {
      postName: '',
      location: '',
      category: '',
      description: '',
      registerCount: 0,
      startDate: new Date(),
      endDate: new Date()
    }
    
  }

  ngOnInit(): void {
    if(this.localStorage.retrieve('role') != 'Admin')
      this.router.navigateByUrl('/error/403');
    this.updatePostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      registerCount: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });

    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(data => {
        this.post = data;

        console.log(data);
        //console.log(this.post.postName);
      }, error => {
        this.router.navigateByUrl('**');
        throwError(error);
      });

      this.updatePostForm.setValue(
        {
          postName: this.post.postName,
          location: this.post.location,
          category: this.post.category,
          description: this.post.description,
          registerCount: this.post.registerCount,
          startDate: this.post.startDate,
          endDate: this.post.endDate,
        }
      )

    /*this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.registerCount = this.createPostForm.get('registerCount').value;
    this.postPayload.startDate = this.createPostForm.get('startDate').value;
    this.postPayload.endDate = this.createPostForm.get('endDate').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })*/
  }

  updatePost() {
    this.postPayload.postName = this.updatePostForm.get('postName').value;
    this.postPayload.location = this.updatePostForm.get('location').value;
    this.postPayload.category = this.updatePostForm.get('category').value;
    this.postPayload.description = this.updatePostForm.get('description').value;
    this.postPayload.registerCount = this.updatePostForm.get('registerCount').value;
    this.postPayload.startDate = this.updatePostForm.get('startDate').value;
    this.postPayload.endDate = this.updatePostForm.get('endDate').value;

    this.postService.updatePost(this.postId, this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/view-post/' + this.postId);
    }, error => {
      throwError(error);
    })

  }

  discardPost() {
    this.router.navigateByUrl('/view-post/' + this.postId);
  }

}
