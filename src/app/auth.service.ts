import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./model";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://movesy.herokuapp.com";
  }

  login(username: string, password: string){
    return this.http.post<User>(`${this.ROOT_URL}/authenticate`, {username, password})
      .pipe( tap(res => this.setSession(res)), shareReplay());
  }

  setSession(authResult) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    console.log(authResult.idToken);
    localStorage.setItem('id_token', authResult.idToken);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    //localStorage.removeItem("expires_at");
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
    console.log(details);
    console.log(this.http.post(`${this.ROOT_URL}/${uri}`, details));
    return this.http.post(`${this.ROOT_URL}/${uri}`, details);
  }

  put(uri: string, details: Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, details);
  }

  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
