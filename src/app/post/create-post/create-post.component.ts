import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { CreatePostPayload } from './create-post.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  editMode: boolean;

  constructor(private localStorage: LocalStorageService, private postService: PostService, private router: Router) {
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
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      registerCount: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.location = this.createPostForm.get('location').value;
    this.postPayload.category = this.createPostForm.get('category').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.registerCount = this.createPostForm.get('registerCount').value;
    this.postPayload.startDate = this.createPostForm.get('startDate').value;
    this.postPayload.endDate = this.createPostForm.get('endDate').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  /*createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.registerCount = this.createPostForm.get('registerCount').value;
    this.postPayload.startDate = this.createPostForm.get('startDate').value;
    this.postPayload.endDate = this.createPostForm.get('endDate').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }*/

  discardPost() {
    this.router.navigateByUrl('/'); 
  }

}
