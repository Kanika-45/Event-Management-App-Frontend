import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import{ RegistrationPayload } from './post-registrations.payload';
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-post-registrations',
  templateUrl: './post-registrations.component.html',
  styleUrls: ['./post-registrations.component.css']
})
export class PostRegistrationsComponent implements OnInit {

  postId: number;
  registrations: Array<RegistrationPayload> = [];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
  private router: Router, private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    if(this.localStorage.retrieve('role') != 'Admin')
      this.router.navigateByUrl('/error/403');
    this.postId = this.activateRoute.snapshot.params.id;
    //this.registrations = {username: '', email: ''};
    this.postService.getRegistrations(this.postId).subscribe(data => {
        this.registrations = data;
        //console.log(data);
      }, error => {
        this.router.navigateByUrl('**');
        throwError(error);
      });
  }

}
