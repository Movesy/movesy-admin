import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {User} from "./model";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:4200/api";
  }

  login(username: string, password: string){
    return this.http.post<User>(`${this.ROOT_URL}/authenticate`, {username, password})
      .pipe( tap(res => this.setSession(res)), shareReplay());
  }

  setSession(authResult) {
    localStorage.setItem('id_token', 'Bearer ' + authResult.jwtToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  getUsersList(){
    return this.get('user/list');
  }

  getOrdersList(){
    return this.get('package/list');
  }

  getReviewsList(){
    return this.get('review/list');
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, details: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, details);
  }

  put(uri: string, details: Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, details);
  }

  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}

export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('id_token')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('id_token')
        }
      })
    }
    return next.handle(req);
  }
}
