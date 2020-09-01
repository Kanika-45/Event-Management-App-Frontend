import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { UpdatePostPayload } from '../post/update-post/update-post.payload';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any>{
    return this.http.post('http://localhost:8080/api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  updatePost(id: number, postPayload: UpdatePostPayload): Observable<any>{
    return this.http.put('http://localhost:8080/api/posts/update/' + id, postPayload);
  }

  register(id: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', id);
  }

  deletePost(id: number): any{
    console.log("In delete");
    return this.http.delete('http://localhost:8080/api/posts/delete/' + id);
  }

  getRegistrations(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/register/by-post/' + id);
  }

  getAllRegistrationForUser(username: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/register/by-username/' + username);
  }

  isRegistered(username: string, id: number): any {
    return this.http.get('http://localhost:8080/api/register/' + username + '/' + id);
  }

}
