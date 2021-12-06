import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Package, Review, User} from "./model";
import {shareReplay, tap} from "rxjs/operators";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;
  readonly ROOT_URL_2;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://movesy-admin.herokuapp.com/api";
    this.ROOT_URL_2 = "https://movesy.herokuapp.com";
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

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, details: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, details);
  }

  put(uri: string, details: Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, details);
  }

  deleteOrder(order: Package){
    return this.http.delete(`${this.ROOT_URL}/package/delete/?id=${order.id}`);
  }

  getPackagesByUser(id: string) {
    return this.get(`package/user/?id=${id}`);
  }

  getReviewsByTransporter(id: string) {
    return this.get(`review/transporter/?id=${id}`);
  }

  deleteReview(r: Review) {
    return this.http.delete(`${this.ROOT_URL}/package/delete/?id=${r.id}`);
  }

  savePackage(p: Package){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    let pck = JSON.stringify(p)
    return this.http.put(`${this.ROOT_URL}/package/edit/?id=${p.id}`, pck,httpOptions)
  }

  saveUser(u: User){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    let user = JSON.stringify(u)
    return this.http.put(`${this.ROOT_URL}/user/edit/?id=${u.id}`, user, httpOptions)
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
