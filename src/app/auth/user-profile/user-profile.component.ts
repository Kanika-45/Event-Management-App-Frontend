import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostTileComponent } from 'src/app/shared/post-tile/post-tile.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: Array<PostModel> = [];
  postLength: number;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private router: Router, private localStorage: LocalStorageService) {
    this.name = this.activatedRoute.snapshot.params.username;
    console.log(this.name);
    if(this.name != this.localStorage.retrieve('username'))
      this.router.navigateByUrl('/error/403');
    this.postService.getAllRegistrationForUser(this.name).subscribe(data => {
      this.posts = data;
      console.log(data);
      this.postLength = data.length;
    }, error => {
      this.router.navigateByUrl('**');
    });
  }

  ngOnInit(): void {
  }

}
